<template>
    <div class="damage-graph">
        <damage-graph-base 
            ref="base"
            :in="rangeIn"
            :out="rangeOut"
            :graph-height="graphHeight"
            :graph-width="graphWidth"
            :damage="damage">
        </damage-graph-base>
        <div class="input-area">
            <input type="number" v-model.number="damage" pattern="\d*" @focus="$event.target.select()">
        </div>
        <div class="range-display">
            {{rangeIn}}〜{{rangeOut}}
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        workArea: String
    },
    data () {
        return {
            column: '',
            row: '',
            damage: 0,
            rangeIn: 0,
            rangeOut: 0,
            graphHeight: 0,
            graphWidth: 0
        };
    },
    mounted () {
        this.column = this.workArea.slice(0, 1);
        this.row = this.workArea.slice(1, 2);
    },
    components: {
        damageGraphBase: () => import('./damage-graph-base')
    },
    computed: {
        ...mapGetters({
            'item': 'selectedItem',
            'createCount': 'createCount'
        })
    },
    watch: {
        item: {
            handler (val) {
                if (!val.data || !val.data[this.column]) {
                    return;
                }
                
                const range = val.data[this.column][this.row - 1];

                if (!range) {
                    return;
                }
                this.rangeIn = range.in;
                this.rangeOut = range.out;
                this.graphHeight = 60;
                this.graphWidth = this.$refs.base.$el.clientWidth;
                this.damage = 0;
            },
            deep: true
        },
        createCount () {
            this.damage = 0;
        }
    }
};
</script>

