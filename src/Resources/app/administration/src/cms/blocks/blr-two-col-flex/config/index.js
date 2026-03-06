import template from './blr-two-col-flex-config.html.twig';

Shopware.Component.register('cms-block-blr-two-col-flex-config', {
    template,

    props: {
        block: {
            type: Object,
            required: true,
        },
    },

    computed: {
        columnRatioOptions() {
            return [
                { value: '50-50', label: this.$t('blr.cms.blocks.twoColFlex.config.columnRatio.options.5050') },
                { value: '33-66', label: this.$t('blr.cms.blocks.twoColFlex.config.columnRatio.options.3366') },
                { value: '66-33', label: this.$t('blr.cms.blocks.twoColFlex.config.columnRatio.options.6633') },
                { value: '25-75', label: this.$t('blr.cms.blocks.twoColFlex.config.columnRatio.options.2575') },
                { value: '75-25', label: this.$t('blr.cms.blocks.twoColFlex.config.columnRatio.options.7525') },
            ];
        },
        breakpointOptions() {
            return [
                { value: 'md', label: this.$t('blr.cms.blocks.twoColFlex.config.responsiveBreakpoint.options.md') },
                { value: 'lg', label: this.$t('blr.cms.blocks.twoColFlex.config.responsiveBreakpoint.options.lg') },
                { value: 'xl', label: this.$t('blr.cms.blocks.twoColFlex.config.responsiveBreakpoint.options.xl') },
            ];
        },
    },

    watch: {
        'block.customFields.columnRatio'() {
            this.$emit('block-update', this.block);
        },
        'block.customFields.responsiveBreakpoint'() {
            this.$emit('block-update', this.block);
        },
        'block.customFields.cssClassLeft'() {
            this.$emit('block-update', this.block);
        },
        'block.customFields.cssClassRight'() {
            this.$emit('block-update', this.block);
        },
    },

    mounted() {
        if (!this.block.customFields) {
            this.block.customFields = {};
        }
        if (this.block.customFields.columnRatio === undefined) {
            this.block.customFields.columnRatio = '50-50';
        }
        if (this.block.customFields.cssClassLeft === undefined) {
            this.block.customFields.cssClassLeft = '';
        }
        if (this.block.customFields.cssClassRight === undefined) {
            this.block.customFields.cssClassRight = '';
        }
        const validBreakpoints = ['md', 'lg', 'xl'];
        if (this.block.customFields.responsiveBreakpoint === undefined) {
            this.block.customFields.responsiveBreakpoint = 'md';
        } else if (!validBreakpoints.includes(this.block.customFields.responsiveBreakpoint)) {
            this.block.customFields.responsiveBreakpoint = 'md';
        }
        // Kein $emit hier — stört Element-Wechsel-Flow
    },
});
