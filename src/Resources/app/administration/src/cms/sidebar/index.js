const { Component } = Shopware;
const { defineComponent } = Shopware.Vue;
import template from './blr-cms-sidebar-extension.html.twig';

// TODO 6.7: Das Sidebar-Template nutzt selectedBlock; diese Eigenschaft stammt vom Basis-Component
// bzw. Mixin (sw-cms-state) und hängt von Vuex (6.6) bzw. Pinia (6.7) ab — offenes 6.7-Risiko.
if (!window.__blrSidebarOverrideRegistered) {
    window.__blrSidebarOverrideRegistered = true;
    Component.override('sw-cms-sidebar', defineComponent({
        template,
        emits: ['block-update'],
        setup(props, { emit }) {
            return {
                onBlockUpdate(block) {
                    emit('block-update', block);
                },
            };
        },
    }));
}
