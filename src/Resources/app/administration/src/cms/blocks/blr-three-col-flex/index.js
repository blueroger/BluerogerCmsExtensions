import './component';
import './preview';
import './config';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'blr-three-col-flex',
    category: 'blueroger',
    label: 'blr.cms.blocks.threeColFlex.label',
    component: 'sw-cms-block-blr-three-col-flex',
    previewComponent: 'cms-block-blr-three-col-flex-preview',
    defaultConfig: {},
    slots: {
        left: 'text',
        center: 'text',
        right: 'text',
    },
});
