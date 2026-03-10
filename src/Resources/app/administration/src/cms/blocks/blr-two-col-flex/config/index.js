import template from './blr-two-col-flex-config.html.twig';

const { defineComponent, computed, watch, onMounted, getCurrentInstance } = Shopware.Vue;

Shopware.Component.register('cms-block-blr-two-col-flex-config', defineComponent({
    template,
    emits: ['block-update'],
    props: {
        block: {
            type: Object,
            required: true,
        },
    },
    setup(props, { emit }) {
        const instance = getCurrentInstance();
        const $t = instance?.proxy?.$t ?? (k => k);

        const columnRatioOptions = computed(() => [
            { value: '50-50', label: $t('blr.cms.blocks.twoColFlex.config.columnRatio.options.5050') },
            { value: '33-66', label: $t('blr.cms.blocks.twoColFlex.config.columnRatio.options.3366') },
            { value: '66-33', label: $t('blr.cms.blocks.twoColFlex.config.columnRatio.options.6633') },
            { value: '25-75', label: $t('blr.cms.blocks.twoColFlex.config.columnRatio.options.2575') },
            { value: '75-25', label: $t('blr.cms.blocks.twoColFlex.config.columnRatio.options.7525') },
        ]);

        const breakpointOptions = computed(() => [
            { value: 'md', label: $t('blr.cms.blocks.twoColFlex.config.responsiveBreakpoint.options.md') },
            { value: 'lg', label: $t('blr.cms.blocks.twoColFlex.config.responsiveBreakpoint.options.lg') },
            { value: 'xl', label: $t('blr.cms.blocks.twoColFlex.config.responsiveBreakpoint.options.xl') },
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
        watch(() => props.block?.customFields?.cssClassRight, () => {
            emit('block-update', props.block);
        });

        onMounted(() => {
            // Shopware CMS: block is a shared ref from parent; config sets defaults here, parent commits on block-update. No emit on mount.
            /* eslint-disable vue/no-mutating-props */
            if (!props.block.customFields) {
                props.block.customFields = {};
            }
            if (props.block.customFields.columnRatio === undefined) {
                props.block.customFields.columnRatio = '50-50';
            }
            if (props.block.customFields.cssClassLeft === undefined) {
                props.block.customFields.cssClassLeft = '';
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
            /* eslint-enable vue/no-mutating-props */
            // Kein $emit hier — stört Element-Wechsel-Flow
        });

        return { columnRatioOptions, breakpointOptions };
    },
}));
