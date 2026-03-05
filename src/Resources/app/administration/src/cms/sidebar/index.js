const { Component } = Shopware;
import template from './blr-cms-sidebar-extension.html.twig';

if (!window.__blrSidebarOverrideRegistered) {
    window.__blrSidebarOverrideRegistered = true;
    Component.override('sw-cms-sidebar', {
        template,

        methods: {
            onBlockUpdate(block) {
                this.$emit('block-update', block);
            },
        },
    });
}
