<?php

declare(strict_types=1);

namespace Blueroger\CmsExtensions;

use Shopware\Core\Content\Cms\Aggregate\CmsBlock\CmsBlockCollection;
use Shopware\Core\Content\Cms\Aggregate\CmsBlock\CmsBlockEntity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsAnyFilter;
use Shopware\Core\Framework\Plugin;
use Shopware\Core\Framework\Plugin\Context\InstallContext;
use Shopware\Core\Framework\Plugin\Context\UninstallContext;
use Symfony\Component\DependencyInjection\ContainerInterface;

class BluerogerCmsExtensions extends Plugin
{
    private const MARKER_FIELD = '_blr_original_type';

    private const UNINSTALL_MAP = [
        'blr-two-col-flex' => 'image-text',
        'blr-three-col-flex' => 'text-three-column',
    ];

    private const ORIGINAL_TYPES = [
        'blr-two-col-flex',
        'blr-three-col-flex',
    ];

    /**
     * @internal Set by PluginLifecycleService before install/uninstall
     */
    protected ?ContainerInterface $container = null;

    public function setContainer(ContainerInterface|null $container = null): void
    {
        $this->container = $container;
    }

    public function install(InstallContext $installContext): void
    {
        parent::install($installContext);

        if ($this->container === null) {
            return;
        }

        /** @var EntityRepository<CmsBlockCollection> $repo */
        $repo = $this->container->get('cms_block.repository');
        $context = $installContext->getContext();

        $criteria = new Criteria();
        $criteria->addFilter(
            new EqualsAnyFilter('customFields.' . self::MARKER_FIELD, self::ORIGINAL_TYPES)
        );

        $blocks = $repo->search($criteria, $context)->getEntities();

        if ($blocks->count() === 0) {
            return;
        }

        $updates = [];
        /** @var CmsBlockEntity $block */
        foreach ($blocks as $block) {
            $customFields = $block->getCustomFields() ?? [];
            $originalType = $customFields[self::MARKER_FIELD] ?? null;
            if ($originalType !== 'blr-two-col-flex' && $originalType !== 'blr-three-col-flex') {
                continue;
            }
            $versionId = $block->getVersionId();
            if ($versionId === null) {
                continue;
            }
            $newCustomFields = $customFields;
            $newCustomFields[self::MARKER_FIELD] = null;

            $updates[] = [
                'id' => $block->getId(),
                'versionId' => $versionId,
                'type' => $originalType,
                'customFields' => $newCustomFields,
            ];
        }

        if ($updates !== []) {
            $repo->update($updates, $context);
        }
    }

    public function uninstall(UninstallContext $uninstallContext): void
    {
        parent::uninstall($uninstallContext);

        if ($uninstallContext->keepUserData()) {
            return;
        }

        if ($this->container === null) {
            return;
        }

        /** @var EntityRepository<CmsBlockCollection> $repo */
        $repo = $this->container->get('cms_block.repository');
        $context = $uninstallContext->getContext();

        $criteria = new Criteria();
        $criteria->addFilter(new EqualsAnyFilter('type', array_keys(self::UNINSTALL_MAP)));

        $blocks = $repo->search($criteria, $context)->getEntities();

        if ($blocks->count() === 0) {
            return;
        }

        $updates = [];
        /** @var CmsBlockEntity $block */
        foreach ($blocks as $block) {
            $customFields = $block->getCustomFields() ?? [];
            $customFields[self::MARKER_FIELD] = $block->getType();

            $versionId = $block->getVersionId();
            if ($versionId === null) {
                continue;
            }

            $fallbackType = self::UNINSTALL_MAP[$block->getType()] ?? null;
            if ($fallbackType === null) {
                continue;
            }

            $updates[] = [
                'id' => $block->getId(),
                'versionId' => $versionId,
                'type' => $fallbackType,
                'customFields' => $customFields,
            ];
        }

        if ($updates !== []) {
            $repo->update($updates, $context);
        }
    }
}
