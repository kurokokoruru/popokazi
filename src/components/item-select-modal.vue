<template>
    <Modal class="item-select-modal">
        <h3 slot="header">作るものを選んでください</h3>
        <div slot="body">
            <div class="body-container">
                <div class="job-box">
                    <div class="title">職人</div>
                    <select v-model="selectedJobId" :size="jobList.length + 1">
                        <option value="">すべて</option>
                        <option v-for="job of jobList" :key="job.jobId" :value="job.jobId" v-text="job.name"></option>
                    </select>
                </div>

                <div class="parts-box">
                    <div class="title">部位</div>
                    <select v-model="selectedPartsId" :size="partsList.length + 1">
                        <option value="">すべて</option>
                        <option v-for="parts of partsList" :key="parts.partsId" :value="parts.partsId" v-text="parts.name"></option>
                    </select>
                </div>

                <div class="item-box">
                    <div class="title">作るもの</div>
                    <select v-model="selectedItemId" :size="12">
                        <option value="" disabled>選択してください</option>
                        <option v-for="item of itemList" :key="item.id" :value="item.id" v-text="item.name"></option>
                    </select>
                </div>

            </div>

        </div>
        <div slot="footer">
            <div class="button-line">
                <button class="button" @click.prevent="closeModal()">やめる</button>
                <button class="button" :disabled="!isItemSelected" @click.prevent="select()">これを作る</button>
            </div>
        </div>
    </Modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import job from '../assets/js/job';
import parts from '../assets/js/parts';
import _ from 'lodash';

export default {
    data () {
        return {
            selectedJobId: '',
            selectedPartsId: '',
            selectedItemId: undefined
        };
    },
    watch: {
        selectedJobId (val) {
            if (val === '') {
                this.selectedPartsId = '';
            } else {
                this.selectedItemId = undefined;
            }
        },
        selectedPartsId (val) {
            if (val !== '') {
                this.selectedItemId = undefined;
            }
        }
    },
    components: {
        Modal: () => import('./modal.vue')
    },
    methods: {
        ...mapActions({
            'closeModal': 'closeItemSelectModal',
            'setItem': 'setItem',
            'resetTemperature': 'resetTemperature'
        }),
        select () {
            this.setItem(_.find(this.items, (item) => item.id === this.selectedItemId));
            this.resetTemperature();
            this.closeModal();
        }
    },
    computed: {
        ...mapGetters({
            'items': 'items'
        }),
        jobList () {
            return job;
        },
        partsList () {
            if (!this.selectedJobId === undefined) {
                return [];
            }
            return parts.filter(part => part.jobId === this.selectedJobId);
        },
        itemList () {
            if (this.selectedJobId === '') {
                // ALL
                return this.items;
            }
            return this.items.filter((item) => {
                if (this.selectedJobId !== '' && this.selectedPartsId !== '') {
                    return item.jobId === this.selectedJobId && item.partsId === this.selectedPartsId;
                } else {
                    return item.jobId === this.selectedJobId;
                }
            });
        },
        isItemSelected () {
            return this.selectedItemId !== undefined;
        }
    }
};
</script>
