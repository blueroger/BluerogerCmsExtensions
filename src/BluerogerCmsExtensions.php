<?php declare(strict_types=1);

namespace Blueroger\CmsExtensions;

use Shopware\Core\Framework\Plugin;
use Shopware\Core\Framework\Plugin\Context\InstallContext;
use Shopware\Core\Framework\Plugin\Context\UninstallContext;

class BluerogerCmsExtensions extends Plugin
{
    public function install(InstallContext $installContext): void
    {
        parent::install($installContext);
    }

    public function uninstall(UninstallContext $uninstallContext): void
    {
        parent::uninstall($uninstallContext);

        if ($uninstallContext->keepUserData()) {
            return;
        }

        // TODO: Fallback-Migration implementieren
        // blr-two-col-flex   → image-text        (Slots kompatibel)
        // blr-three-col-flex → three-column-text (Slots kompatibel)
        // blr-four-col       → text              (kein Core-Fallback, Option A)
    }
}
