import data from './data.js';
import _ from 'lodash';

export default {
    /**
     * @param {*} heat 温度
     * @param {*} hitType 打ち方
     * @param {*} baihanMode 通常、２倍、半減
     */
    getDamages (heat, hitType, baihanMode = 0) {
        if (heat > 2000) {
            heat = 2000;
        }
        switch (baihanMode) {
        case 0:// 通常
            return data[heat.toString()][hitType];
        case 1: {
            // ダメージ２倍
            const damages = data[heat.toString()][hitType];
            return damages.map((d) => d * 2);
        }
        case 2: {
            // 半減（切り上）
            const damages = data[heat.toString()][hitType];
            return damages.map(d => Math.ceil(d * 0.5));
        }
        }
    },

    getRange (heat, hitType, baihanMode = 1) {
        let array = this.getDamages(heat, hitType, baihanMode);
        if (array) {
            return {
                'low': _.first(array),
                'high': _.last(array)
            };
        }
        return {};
    }
};
