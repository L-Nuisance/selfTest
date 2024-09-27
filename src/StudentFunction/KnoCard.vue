<template>
    <div class="knoCard">
        <div class="chapter" @click="showKno">
            <h3>{{ chapter }}</h3>
        </div>
        <div v-if="isExpanded" class="knowledge">
            <hr/>
            <span v-for="kno in newKnoData" :key="kno.label">
                <input type="checkbox" :disabled="kno.isDisabled || allDisabled" v-model="kno.isChecked" class="check">
                {{ kno.label }}
                <!-- <span v-if="kno.isChecked" :disabled="kno.isDisabled">设置占比：</span> -->
                <el-input-number v-if="kno.isChecked" :disabled="kno.isDisabled" step="0.1" min="0" :max="maxProportion" placeholder="设置占比" type="text" v-model="kno.inputValue" class="getProportion"/>
                <el-button v-if="kno.isChecked" :disabled="kno.isDisabled" @click="add(kno)">确认</el-button>
            </span>
        </div>
    </div>
</template>

<script>
import store from '@/store';

export default { 
    name: 'KnoCard',
    props: {
        knowledgeData: [],
        maxProportion: Number,
        chapter: String,
        allDisabled: blur
    },
    data() {
        return {
            isExpanded: false,
            isChecked: false,
            newKnoData: []
        }
    },
    created() {
        this.newKnoData = this.knowledgeData.map(item => ({ ...item, isChecked: false }));
        this.newKnoData = this.newKnoData.map(item => ({ ...item, inputValue: 0 }));
        this.newKnoData = this.newKnoData.map(item => ({ ...item, isDisabled: false  }));
    },
    methods: {
        showKno() {
            this.isExpanded = ! this.isExpanded;
        },
        add(kno) {
            if(this.maxProportion == 0) {
                alert('已经达到最大占比')
            }else {
                this.$parent.addData(kno)
            }
        }
    }
}
</script>

<style scoped>
    .knoCard {
        height: auto;
        width: 60%;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        /* font-family: serif; */
        /* background-color: red; */

    }
    h3 {
        font-weight: 200;
        /* font-style: italic; */
        font-size: 30px;
        color: #373030;
        margin: 2%;
        position: relative;
    }
    hr {
        border: 0; 
        border-top: 1px solid #ccc;
        margin: 5px 0; 
    }
    span {
        display: block;
        font-weight: 100;
        font-size: 20px;
        margin-left: 5%;
        margin-bottom: 3%;
    }
    .getProportion {
        width: 40%;
    }
    .check {
        margin: 0;
        position: relative;
        top: 5px;
        width: 20px;
        height: 20px;
    }
    .knowledge {
        transition: max-height 0.5s ease;
    }
    .chapter:hover {
        cursor: pointer;
    }
</style>