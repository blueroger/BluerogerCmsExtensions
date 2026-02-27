import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'blr-two-col-flex',
    category: 'blueroger',
    label: 'blr.cms.blocks.twoColFlex.label',
    component: 'sw-cms-block-blr-two-col-flex',
    previewComponent: 'cms-block-blr-two-col-flex-preview',
    defaultConfig: {},
    slots: {
        left: 'text',
        right: 'text',
    },
});