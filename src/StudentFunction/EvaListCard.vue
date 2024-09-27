<template>
    <div class="evaListCard">
        <img :src="this.coursePic">
        <span class="courseName">{{ courseName }}</span>
        <el-divider class="hrF" direction="vertical" />
        <div class="theF">
            <span class="score">我的成绩：{{ score }}</span>
            <span class="time">{{ time }}</span>
        </div>
        <el-divider class="hrS" direction="vertical" />
        <div class="theS">
            <span class="overall">总体评价：{{ overall }}</span>
        </div>
        <button class="check" @click="checkEva()">查看</button>
    </div>
</template>

<script>
import store from '@/store';
import axios from 'axios';

export default {
    name: 'EvaListCard',
    props: {
        evaId: String,
        evaId: String,
        courseName: String,
        score: Number,
        overall: String,
        time: String
    },
    data() {
        return {
            coursePic: store.state.course.coursePic
        }
    },
    methods: {
        checkEva() {
            axios
                .get('http://43.138.136.200:8090/student/getAssessmentInformation?assessmentId=' + this.evaId)
                .then(
                    (res) => {
                        if(res.data.requestCode == '33_01') {
                            let evaluation = res.data.list[0].evaluation
                            let overall = res.data.list[0].overall
                            let score = res.data.list[0].score
                            let evaList = res.data.list.slice(1)
                            this.$store.commit('evaluation/setEvaluation', evaluation)
                            this.$store.commit('evaluation/setOverall', overall)
                            this.$store.commit('evaluation/setScore', score)
                            this.$store.commit('evaluation/setEvaList', evaList)
                            this.$router.push(
                                {
                                    name: 'evaluation',
                                    query: {
                                        userId: store.state.user.userId,
                                    }
                                }
                            )
                        }else if(res.data.requestCode == '33_00') {
                            alert(res.data.prompt)
                        }
                    },
                    (error) => {
                        alert('请求错误')
                    }
                )
        }
    }
}
</script>

<style scoped>
    .evaListCard {
        /* background-color: #d0cdcd9e; */
        border: 1px solid #ccc;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 90%;
        height: 100px;
    }
    .evaListCard img {
        border-radius: 10px 0 0 10px;
        height: 100%;
        width: 15%;
    }
    .evaListCard .courseName {
        position: relative;
        font-size: 25px;
        left: 5%;
        bottom: 43%;
    }
    .evaListCard .hrF {
        height: 100%;
        position: relative;
        bottom: 46%;
        left: 10%;
    }
    .evaListCard .theF {
        display: grid;
        place-items: center; /* 居中元素 */
        overflow: auto;
        /* background-color: red; */
        height: 100px;
        width: 30%;
        position: relative;
        left: 25.8%;
        bottom: 146%;
    }
    .evaListCard .score {
        font-size: 25px;
    }
    .evaListCard .hrS {
        height: 100%;
        position: relative;
        left: 55%;
        bottom: 246%;
    }
    .evaListCard .theS {
        display: grid;
        place-items: center; /* 居中元素 */
        overflow: auto;
        /* background-color: red; */
        height: 100px;
        width: 30%;
        position: relative;
        left: 55.8%;
        bottom: 346%;
        font-size: 25px;
    }
    .evaListCard .check {
        height: 100px;
        width: 10%;
        border: 0;
        border-radius: 0 10px 10px 0;
        /* position: absolute;
        right: 0;
        transform: translate(-100%, 0); */
        position: relative;
        bottom: 446%;
        left: 100%;
        transform: translate(-100%, 0);
        font-size: 25px;
        background-color: #5B86E5;
        color: white;
    }
    .evaListCard .check:hover {
        background-color: #8faff4;
        cursor: pointer;
    }
</style>