<template>
    <div class="workspace-container" :class="typeClass">
        <div class="a1 work-area">
            <damage-graph work-area="a1"></damage-graph>
        </div>
        <div class="a2 work-area">
            <damage-graph work-area="a2"></damage-graph>
        </div>
        <div class="a3 work-area">
            <damage-graph work-area="a3"></damage-graph>
        </div>
        <div class="a4 work-area">
            <damage-graph work-area="a4"></damage-graph>
        </div>
        <div class="b1 work-area">
            <damage-graph work-area="b1"></damage-graph>
        </div>
        <div class="b2 work-area">
            <damage-graph work-area="b2"></damage-graph>
        </div>
        <div class="b3 work-area">
            <damage-graph work-area="b3"></damage-graph>
        </div>
        <div class="b4 work-area">
            <damage-graph work-area="b4"></damage-graph>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import typeCalc from '../assets/js/type-calcurator';

export default {
    components: {
        damageGraph: () => import('./damage-graph')
    },
    computed: {
        ...mapGetters({
            'selectedItem': 'selectedItem'
        }),
        typeClass () {
            return {[typeCalc.getType(this.selectedItem)]: true};
        }
    }
};
</script>
