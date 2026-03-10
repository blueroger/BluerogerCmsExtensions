import template from './sw-cms-block-blr-three-col-flex.html.twig';
import './sw-cms-block-blr-three-col-flex.scss';

const { defineComponent } = Shopware.Vue;

Shopware.Component.register('sw-cms-block-blr-three-col-flex', defineComponent({
    template,
}));
