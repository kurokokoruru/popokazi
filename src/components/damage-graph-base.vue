<template>
    <svg width="100%" height="60px">
        <!-- base -->
        <rect ref="base" 
            :x="base.x"
            :y="base.y"
            :width="base.width"
            :height="base.height"
            style="fill:rgb(0,0,0);stroke-width:10; stroke:rgb(100,100,100)"/>

        <!-- success range -->
        <rect :x="successRange.x"
            :y="successRange.y"
            :width="successRange.width"
            :height="successRange.height"
            style="fill:rgba(50,200,50, 0.8)"/>

        <!-- now -->
        <rect :x="now.x"
            :y="now.y"
            :width="now.width"
            :height="now.height"
            style="fill:rgba(255, 80, 0, 0.8)"/>

        <!-- 手加減 -->
        <rect :x="half.x"
            :y="half.y"
            :width="half.width"
            :height="half.height"
            style="fill:rgb(255, 0, 255)"/>

        <!-- 通常 -->
        <rect :x="normal.x"
            :y="normal.y"
            :width="normal.width"
            :height="normal.height"
            style="fill:rgb(255, 0, 0)"/>

        <!-- 1.2倍 -->
        <rect :x="strong.x"
            :y="strong.y"
            :width="strong.width"
            :height="strong.height"
            style="fill:rgb(255, 255, 0)"/>

        <!-- 2倍 -->
        <rect :x="two.x"
            :y="two.y"
            :width="two.width"
            :height="two.height"
            style="fill:rgb(153, 153, 51)"/>

        <!-- 熱風 -->
        <rect :x="neppu.x"
            :y="neppu.y"
            :width="neppu.width"
            :height="neppu.height"
            style="fill:rgb(100, 100, 255)"/>

        <!-- 3倍 -->
        <rect :x="three.x"
            :y="three.y"
            :width="three.width"
            :height="three.height"
            style="fill:rgb(180, 60, 255)"/>

    </svg>
</template>
<script>
import { mapGetters } from 'vuex';

const PADDING = 5;
export default {
    props: {
        in: Number,
        out: Number,
        damage: {
            type: [Number, String],
            default: 0
        },
        graphWidth: Number,
        graphHeight: Number
    },
    computed: {
        ...mapGetters({
            'halfRange': 'halfRange',
            'normalRange': 'normalRange',
            'strongRange': 'strongRange',
            'twoRange': 'twoRange',
            'neppuRange': 'neppuRange',
            'threeRange': 'threeRange',
        }),
        base () {
            return {x: 0, y: 0, height: this.graphHeight, width: this.graphWidth};
        },
        successRange () {
            let padding = 5;
            if (this.perPixel === 0 || this.in === 0) {
                //
            } else {
                padding = PADDING + this.perPixel * this.in;
            }

            let w = PADDING;
            if (this.perPixel === 0 || this.out === 0) {
                //
            } else {
                w = (w + this.perPixel * this.out) - padding;
            }

            const h = this.graphHeight === 0 ? 0 : this.graphHeight - 10;

            return {x: padding, y: PADDING, height: h, width: w};
        },
        now () {
            return {x: PADDING, y: PADDING, height: 50, width: this.nowPadding};
        },
        nowPadding () {
            const result = this.perPixel * this.damage;
            return isNaN(result) ? 0 : result;
        },
        half () {
            return this.calcArea(this.halfRange, 8, 6);
        },
        normal () {
            return this.calcArea(this.normalRange, 16, 6);
        },
        strong () {
            return this.calcArea(this.strongRange, 24, 6);
        },
        two () {
            return this.calcArea(this.twoRange, 32, 6);
        },
        neppu () {
            return this.calcArea(this.neppuRange, 40, 6);
        },
        three () {
            return this.calcArea(this.threeRange, 48, 6);
        },
        perPixel () {
            return this.graphWidth / this.max;
        },
        max () {
            return (this.in + this.out) / 2  * 1.25;
        }
    },
    methods: {
        calcArea (range, y, height){
            const xVal = this.calcX(range.min);
            const xWidth = this.calcWidth(range.max, xVal);
            return {'x': xVal, 'y': y, 'height': height, 'width': xWidth};
        },
        calcX (low) {
            if (this.perPixel > 0) {
                return this.nowPadding + this.perPixel * low;
            } else {
                return PADDING;
            }
        },
        calcWidth (high, x) {
            if (this.perPixel > 0) {
                return this.nowPadding - x + this.perPixel * high;
            } else {
                return x;
            }
        }
    }
};
</script>
