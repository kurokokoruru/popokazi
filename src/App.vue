<template>
  <div id="app">
    <ItemSelectModal v-if="itemSelect"/>
    <Information/>
    <WorkSpace/>
  </div>
</template>

<script>
import Information from './components/information.vue';
import WorkSpace from './components/work-space.vue';
import { mapGetters } from 'vuex';


export default {
    name: 'app',
    components: {
        Information,
        WorkSpace,
        ItemSelectModal: () => import('./components/item-select-modal')
    },
    computed: {
        ...mapGetters({
            'itemSelect': 'isItemSelectModalOpen'
        }),
    }
};
</script>

<style lang="scss">
@import './assets/style/main.scss';
</style>
