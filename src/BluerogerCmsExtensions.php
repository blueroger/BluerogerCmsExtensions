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

        // TODO: Fallback-Migration implementieren
        // Ziel: cms_block.type zurücksetzen auf Standard-Blöcke
        // blr-two-col-flex   → image-text (Slots: left, right ✅)
        // blr-three-col-flex → three-column-text (Slots: left, center, right ✅)
        // blr-four-col       → kein Standard-Fallback ⚠️
        // Bewusst offen gelassen — siehe Architektur-Dokumentation
    }
}
