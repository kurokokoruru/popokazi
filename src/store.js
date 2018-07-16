import Vue from 'vue';
import Vuex from 'vuex';
import damageCalc from './assets/js/damage-calcurator';
const items = require('./assets/js/item.json');

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        temperature: 1000,
        baihanMode: 0,
        item: {},
        modal: {
            itemSelect: false
        },
        createCount: 0
    },
    mutations: {
        upTemperature (state) {
            state.temperature += 50;
        },
        downTemperature (state) {
            state.temperature -= 50;
        },
        resetTemperature (state) {
            state.temperature = 1000;
        },
        updateBaihanMode (state, val) {
            state.baihanMode = val;
        },
        updateItemSelectModal (state, val) {
            state.modal.itemSelect = val;
        },
        updateItem (state, val) {
            state.item = val;
        },
        updateCreateCount (state) {
            state.createCount++;
        }
    },
    actions: {
        upTemperature ({ commit }) {
            commit('upTemperature');
        },
        downTemperature ({ commit }) {
            commit('downTemperature');
        },
        resetTemperature ({ commit }) {
            commit('resetTemperature');
        },
        updateBaihanMode ({ commit }, baihanMode) {
            commit('updateBaihanMode', baihanMode);
        },
        openItemSelectModal ({ commit }) {
            commit('updateItemSelectModal', true);
        },
        closeItemSelectModal ({ commit }) {
            commit('updateItemSelectModal', false);
        },
        clearItem ({ commit }) {
            commit('updateItem', {});
        },
        setItem ({ commit }, item) {
            commit('updateItem', item);
        },
        updateCreateCount ({ commit }) {
            commit('updateCreateCount');
        }
    },
    getters: {
        temperature: state => {
            return state.temperature;
        },
        baihanMode: state => {
            return state.baihanMode;
        },
        halfValues: state => {
            const damages = damageCalc.getDamages(state.temperature, 'half', state.baihanMode);
            return damages.join(', ');
        },
        halfRange: state => {
            const damages = damageCalc.getDamages(state.temperature, 'half', state.baihanMode);
            if (!damages || !damages.length) {
                return {min: 0, max: 0};
            }
            return {min: damages[0], max: damages[damages.length - 1]};
        },
        normalValues: state => {
            const damages = damageCalc.getDamages(state.temperature, 'normal', state.baihanMode);
            return damages.join(', ');
        },
        normalRange: state => {
            const damages = damageCalc.getDamages(state.temperature, 'normal', state.baihanMode);
            if (!damages || !damages.length) {
                return {min: 0, max: 0};
            }
            return {min: damages[0], max: damages[damages.length - 1]};
        },
        strongValues: state => {
            const damages = damageCalc.getDamages(state.temperature, 'strong', state.baihanMode);
            return damages.join(', ');
        },
        strongRange: state => {
            const damages = damageCalc.getDamages(state.temperature, 'strong', state.baihanMode);
            if (!damages || !damages.length) {
                return {min: 0, max: 0};
            }
            return {min: damages[0], max: damages[damages.length - 1]};
        },
        twoValues: state => {
            const damages = damageCalc.getDamages(state.temperature, 'two', state.baihanMode);
            return damages.join(', ');
        },
        twoRange: state => {
            const damages = damageCalc.getDamages(state.temperature, 'two', state.baihanMode);
            if (!damages || !damages.length) {
                return {min: 0, max: 0};
            }
            return {min: damages[0], max: damages[damages.length - 1]};
        },
        neppuValues: state => {
            const damages = damageCalc.getDamages(state.temperature, 'neppu', state.baihanMode);
            return damages.join(', ');
        },
        neppuRange: state => {
            const damages = damageCalc.getDamages(state.temperature, 'neppu', state.baihanMode);
            if (!damages || !damages.length) {
                return {min: 0, max: 0};
            }
            return {min: damages[0], max: damages[damages.length - 1]};
        },
        threeValues: state => {
            const damages = damageCalc.getDamages(state.temperature, 'three', state.baihanMode);
            return damages.join(', ');
        },
        threeRange: state => {
            const damages = damageCalc.getDamages(state.temperature, 'three', state.baihanMode);
            if (!damages || !damages.length) {
                return {min: 0, max: 0};
            }
            return {min: damages[0], max: damages[damages.length - 1]};
        },
        isItemSelectModalOpen: state => {
            return state.modal.itemSelect;
        },
        items: () => {
            return items;
        },
        selectedItem: (state) => {
            return state.item;
        },
        createCount: (state) => {
            return state.createCount;
        }
    }
});
