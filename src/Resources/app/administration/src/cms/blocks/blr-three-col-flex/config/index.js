import template from './blr-three-col-flex-config.html.twig';

const { defineComponent, computed, watch, onMounted, getCurrentInstance } = Shopware.Vue;

Shopware.Component.register('cms-block-blr-three-col-flex-config', defineComponent({
    template,

    props: {
        block: {
            type: Object,
            required: true,
        },
    },

    emits: ['block-update'],

    setup(props, { emit }) {
        const instance = getCurrentInstance();
        const $t = instance?.proxy?.$t ?? (k => k);

        const columnRatioOptions = computed(() => [
            { value: '33-33-33', label: $t('blr.cms.blocks.threeColFlex.config.columnRatio.options.333333') },
            { value: '25-50-25', label: $t('blr.cms.blocks.threeColFlex.config.columnRatio.options.255025') },
            { value: '50-25-25', label: $t('blr.cms.blocks.threeColFlex.config.columnRatio.options.502525') },
            { value: '25-25-50', label: $t('blr.cms.blocks.threeColFlex.config.columnRatio.options.252550') },
        ]);

        const breakpointOptions = computed(() => [
            { value: 'md', label: $t('blr.cms.blocks.threeColFlex.config.responsiveBreakpoint.options.md') },
            { value: 'lg', label: $t('blr.cms.blocks.threeColFlex.config.responsiveBreakpoint.options.lg') },
            { value: 'xl', label: $t('blr.cms.blocks.threeColFlex.config.responsiveBreakpoint.options.xl') },
        ]);

        watch(() => props.block?.customFields?.columnRatio, () => {
            emit('block-update', props.block);
        });
        watch(() => props.block?.customFields?.responsiveBreakpoint, () => {
            emit('block-update', props.block);
        });
        watch(() => props.block?.customFields?.cssClassLeft, () => {
            emit('block-update', props.block);
        });
        watch(() => props.block?.customFields?.cssClassCenter, () => {
            emit('block-update', props.block);
        });
        watch(() => props.block?.customFields?.cssClassRight, () => {
            emit('block-update', props.block);
        });

        onMounted(() => {
            if (!props.block.customFields) {
                props.block.customFields = {};
            }
            if (props.block.customFields.columnRatio === undefined) {
                props.block.customFields.columnRatio = '33-33-33';
            }
            if (props.block.customFields.cssClassLeft === undefined) {
                props.block.customFields.cssClassLeft = '';
            }
            if (props.block.customFields.cssClassCenter === undefined) {
                props.block.customFields.cssClassCenter = '';
            }
            if (props.block.customFields.cssClassRight === undefined) {
                props.block.customFields.cssClassRight = '';
            }
            const validBreakpoints = ['md', 'lg', 'xl'];
            if (props.block.customFields.responsiveBreakpoint === undefined) {
                props.block.customFields.responsiveBreakpoint = 'md';
            } else if (!validBreakpoints.includes(props.block.customFields.responsiveBreakpoint)) {
                props.block.customFields.responsiveBreakpoint = 'md';
            }
            // Kein $emit hier — stört Element-Wechsel-Flow
        });

        return { columnRatioOptions, breakpointOptions };
    },
}));
