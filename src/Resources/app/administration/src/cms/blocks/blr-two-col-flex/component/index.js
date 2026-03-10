import template from './sw-cms-block-blr-two-col-flex.html.twig';
import './sw-cms-block-blr-two-col-flex.scss';

const { defineComponent } = Shopware.Vue;

Shopware.Component.register('sw-cms-block-blr-two-col-flex', defineComponent({
    template,
}));
