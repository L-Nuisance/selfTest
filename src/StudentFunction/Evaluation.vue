<template>
    <div class="evaluation">
        <h2>测评报告</h2>
        <hr>
        <div class="result">
            <img src="../../public/touxiang.jpg" alt="courseCover">
            <h3>{{ courseName }}</h3>
            <span class="score">分数：{{ score }} 分</span>
            <br>
            <span class="overall">整体评价: {{ overall }}</span>
            <button class="back" @click="goBack()">返回主页</button>
        </div>
        <hr>
        <div class="knoEvaShow">
            <div class="all">
                <span>整体评价</span>
                <p>{{ evaluation }}</p>
            </div>
            <SingleEvaCard v-for="evaluate in evaluateList" :knowledge="evaluate.knowledge" :accuracy="evaluate.accuracy" :evaluate="evaluate.evaluate"/>
        </div>
    </div>
</template>

<script>
import store from '@/store';
import SingleEvaCard from './SingleEvaCard.vue';

export default {
    name: 'Evaluation',
    components: {
        SingleEvaCard
    },
    data() {
        return {
            courseName: store.state.course.courseName,
            evaluation: store.state.evaluation.evaluation,
            score: store.state.evaluation.score,
            overall: store.state.evaluation.overall,
            evaluateList: store.state.evaluation.evaList
        }
    },
    methods: {
        goBack() {
            this.$router.push(
                {
                    name: 'joinedCourseInformation',
                    query: {
                        userId: store.state.user.userId, 
                        courseId: store.state.course.courseId, 
                        nowNav: 'course-message'
                    }
                }
            )
        }
    }
}
</script>

<style scoped>
    .evaluation {
        position: relative;
        top: -40px;
        left: 10%;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 80%;
        height: 650px;
    }
    .evaluation h2 {
        margin: 2% 2%;
        font-weight: 500;
    }
    .evaluation hr {
        border: 0; 
        border-top: 1px solid #ccc;
        margin: 10px 0; 
    }
    .evaluation .all {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        margin-left: 1.5%;
        margin-right: 1.5%;
    }
    .evaluation span {
        font-size: 25px;
        font-weight: 600;
    }
    .result {
        height: 27%;
    }
    .result img {
        width: 20%;
        height: 150px;
        margin: 1% 2%;
    }
    .result h3 {
        margin: 0;
        padding: 0;
        position: relative;
        left: 30%;
        bottom: 70%;
        font-size: 35px;
        font-weight: 400;
    }
    .result span {
        position: relative;
        left: 60%;
        font-size: 25px;
        font-weight: 400;  
    }
    .result .score {
        position: relative;
        bottom: 120%;
    }
    .result .overall {
        position: relative;
        bottom: 80%;
    }
    .result button {
        position: relative;
        left: 70%;
        border: 0;
        border-radius: 5px;
        height: 25%;
        width: 10%;
    }
    .result button:hover {
        background-color: #5B86E5;
        color: white;
        cursor: pointer;
    }
    .result .back {
        position: relative;
        bottom: 115%;
    }
    .knoEvaShow {
        height: 60%;
        overflow: auto;
    }
    .knoEvaShow ::-webkit-scrollbar-thumb {
        background-color: rebeccapurple; /* 设置滑块颜色 */
        border-radius: 10px; /* 设置滑块边角的半径 */
    }
</style>