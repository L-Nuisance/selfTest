<template>
    <div class="joinedKnowledge">
        <h2>知识点展示</h2>
        <hr>
        <div class="showKno">
            <el-tree :data="knoData" :props="defaultProps" @node-click="handleNodeClick" class="knoTree"></el-tree>
        </div>
    </div>
</template>

<script>
import store from '@/store';

export default {
    name: 'ShowKnowledge',
    data() {
        return {
            // knoData: store.state.course.knoData,
            defaultProps: {
                children: 'knowledgeList',
                label: 'label',
            }
        }
    },
    computed: {
        knoData() {
            return store.state.course.knoData
        }
    }
}
</script>

<style scoped>
    .joinedKnowledge {
        background-color: white;
        width: 80%;
        height: 80%;
        border: 1px solid #ccc;
        border-radius: 8px;
    }
    .joinedKnowledge h2 {
        margin: 5px;
        font-weight: 200;
    }
    .joinedKnowledge hr {
        border: 0; 
        border-top: 1px solid #ccc;
        margin: 10px 0; 
    }
    .showKno {
        height: 90%;
        width: 100%;
        overflow-x: auto;
    }
    .knoTree {
        font-size: 20px;
        margin: 2%;
    }
</style>