<template>
    <div class="stuEvaList">
        <img :src="'data:image/png;base64,' + this.stuAvatar">
        <div class="showName">
            <span class="name">{{ stuName }}</span>
            <span class="overall">总体测评情况：{{ overall }}</span>
        </div>
        <button class="back" @click="back()">返回</button>
        <el-divider class="hrF" direction="vertical" />
        <div class="showEva">
            <StuEvaCard class="stuEvaCard" v-for="eva in evaList" :knowledge="eva.knowledge" :overall="eva.overall" :score="eva.score"/>
        </div>
    </div>
</template>

<script>
import store from '@/store';
import StuEvaCard from './StuEvaCard.vue';

export default {
    name: 'StuEvaList',
    components: {
        StuEvaCard
    },
    data() {
        return {
            stuName: store.state.stuEvaList.stuName,
            stuAvatar: store.state.stuEvaList.stuAvatar,
            overall: store.state.stuEvaList.stuOverall,
            evaList: store.state.stuEvaList.evaList
        }
    },
    methods: {
        back() {
            this.$router.push(
                {
                    name: 'allStudents',
                    query: {
                        courseId: this.$route.query.courseId,
                        userId: this.$route.query.userId,
                        teacherId: this.$route.query.teacherId,
                        nowNav: 'all-students'
                    }
                }
            )
        }
    }
}
</script>

<style scoped>
    .stuEvaList {
        margin-top: 1.4%;
        background-color: white;
        width: 80%;
        height: 80%;
        border: 1px solid #ccc;
        border-radius: 8px;
    }
    .stuEvaList img {
        width: 8%;
        aspect-ratio: 1;
        border-radius: 8px;
        margin-left: 10%;
        margin-top: 3%;
    }
    .stuEvaList .showName {
        /* background-color: red; */
        width: 16%;
        margin-left: 6%;
        margin-top: 1%;
        display: grid;
        place-items: center; /* 居中元素 */
        overflow: auto;
        font-size: 20px;
    }
    .stuEvaList .overall {
        margin-top: 20%;
        font-weight: 600;
    }
    .stuEvaList .back {
        border: 0;
        border-radius: 5px;
        width: 8%;
        height: 7%;
        background-color: #5B86E5;
        margin-left: 10%;
        margin-top: 3%;
        color: white;
        font-size: 15px;
    }
    .stuEvaList .back:hover {
        background-color: #8faff4;
        cursor: pointer;
    }
    .stuEvaList .hrF {
        position: absolute;
        height: 100%;
        bottom: 0%;
        left: 28%;
    }
    .stuEvaList .showEva {
        /* background-color: red; */
        height: 100%;
        width: 71.4%;
        position: absolute;
        right: 0;
        top: 0;
        display: grid;
        place-items: center; /* 居中元素 */
        overflow: auto;
    }
    .stuEvaList .stuEvaCard {
        margin-top: 1%;
        margin-bottom: 1%;
    }
    .stuEvaList .stuEvaCard:hover {
        background-color: white;
        cursor: pointer;
    }
    ::-webkit-scrollbar {
        display: none;
    }
</style>