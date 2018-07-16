<template>
    <div class="info-wrapper">
        <div class="making-container item-container">
            <div class="item-title">作っているもの</div>
            <div class="item-content item-name" v-text="name"></div>
        </div>
        <div class="button-area button-line">
            <button class="button" @click.prevent="reset">はじめから</button>
            <button class="button" @click.prevent="openItemSelect">作るものを選ぶ</button>
        </div>
        <div class="temperature-area item-container">
            <div class="item-title">地金の温度</div>
            <div class="temperature item-content">
                <div class="temp-text" v-text='dispTemperature'></div>
                <div class="temp-buttons button-area">
                    <button class="down" @click.prevent="down">▼</button>
                    <button class="up" @click.prevent="up">▲</button>
                </div>
            </div>
        </div>
        <div class="variation-area item-container">
            <div class="item-title">地金の変化</div>
            <div class="item-content radio-container">
                <label><input type="radio" name="variation" v-model.number='baihanMode' value="0" class="radio"><span class="radio-icon"></span>ふつう</label>
                <label><input type="radio" name="variation" v-model.number='baihanMode' value="1" class="radio"><span class="radio-icon"></span>ダメージ２倍</label>
                <label><input type="radio" name="variation" v-model.number='baihanMode' value="2" class="radio"><span class="radio-icon"></span>ダメージ半減</label>
            </div>
        </div>
        <div class="damage-info-area item-container">
            <div class="item-title">ダメージ早見表</div>
            <div class="now-temperature item-sub-title">1000℃のとき</div>
            <div class="item-content">
                <ul>
                    <li class="tekagen">
                        <div class="name">てかげん</div>
                        <div class="values" v-text="halfValues"></div>
                    </li>
                    <li class="hutuu">
                        <div class="name">ふつう</div>
                        <div class="values" v-text="normalValues"></div>    
                    </li>
                    <li class="ittenni">
                        <div class="name">1.2倍</div>
                        <div class="values" v-text="strongValues"></div>    
                    </li>
                    <li class="nibai">
                        <div class="name">2倍</div>
                        <div class="values" v-text="twoValues"></div>    
                    </li>
                    <li class="neppu">
                        <div class="name">熱風おろし</div>
                        <div class="values" v-text="neppuValues"></div>    
                    </li>
                    <li class="sanbai">
                        <div class="name">3倍</div>
                        <div class="values" v-text="threeValues"></div>    
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    methods: {
        ...mapActions({
            'up': 'upTemperature',
            'down': 'downTemperature',
            'updateBaihanMode': 'updateBaihanMode',
            'openModal': 'openItemSelectModal',
            'resetTemperature': 'resetTemperature',
            'updateCreateCount': 'updateCreateCount'
        }),
        openItemSelect () {
            this.openModal();
        },
        reset () {
            this.resetTemperature();
            this.updateCreateCount();
        }
    },
    computed: {
        ...mapGetters({
            'temperature': 'temperature',
            'baihan': 'baihanMode',
            'halfValues': 'halfValues',
            'normalValues': 'normalValues',
            'strongValues': 'strongValues',
            'twoValues': 'twoValues',
            'threeValues': 'threeValues',
            'neppuValues': 'neppuValues',
            'item': 'selectedItem'
        }),
        baihanMode: {
            get () {
                return this.baihan;
            },
            set (value) {
                this.updateBaihanMode(value);
            }
        },
        dispTemperature () {
            return this.temperature + '℃';
        },
        name () {
            return this.item.name;
        }

    }
};
</script>
