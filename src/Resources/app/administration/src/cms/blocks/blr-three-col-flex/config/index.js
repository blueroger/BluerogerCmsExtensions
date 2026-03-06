import template from './blr-three-col-flex-config.html.twig';

Shopware.Component.register('cms-block-blr-three-col-flex-config', {
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
                { value: '33-33-33', label: this.$t('blr.cms.blocks.threeColFlex.config.columnRatio.options.333333') },
                { value: '25-50-25', label: this.$t('blr.cms.blocks.threeColFlex.config.columnRatio.options.255025') },
                { value: '50-25-25', label: this.$t('blr.cms.blocks.threeColFlex.config.columnRatio.options.502525') },
                { value: '25-25-50', label: this.$t('blr.cms.blocks.threeColFlex.config.columnRatio.options.252550') },
            ];
        },
        breakpointOptions() {
            return [
                { value: 'md', label: this.$t('blr.cms.blocks.threeColFlex.config.responsiveBreakpoint.options.md') },
                { value: 'lg', label: this.$t('blr.cms.blocks.threeColFlex.config.responsiveBreakpoint.options.lg') },
                { value: 'xl', label: this.$t('blr.cms.blocks.threeColFlex.config.responsiveBreakpoint.options.xl') },
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
        'block.customFields.cssClassCenter'() {
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
            this.block.customFields.columnRatio = '33-33-33';
        }
        if (this.block.customFields.cssClassLeft === undefined) {
            this.block.customFields.cssClassLeft = '';
        }
        if (this.block.customFields.cssClassCenter === undefined) {
            this.block.customFields.cssClassCenter = '';
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
