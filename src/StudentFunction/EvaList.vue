<template>
    <div class="evaList" v-loading="isLoading" element-loading-text="我的测评加载中...">
        <h2>我的测评</h2>
        <hr>
        <span class="select">排序方式：</span>
        <el-select v-model="sortOrder" class="select" >
            <el-option label="按时间" value="按时间"/>
            <el-option label="按分数" value="按分数"/>
        </el-select>
        <div class="showEva">
            <EvaListCard class="card" v-for="eva in evaListData" :evaId="eva.assessmentId" :courseName="eva.courseName" :overall="eva.overall" :time="eva.createdTime" :score="eva.score"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import EvaListCard from './EvaListCard.vue';
import store from '@/store';

export default {
    name: 'EvaList',
    components: {
        EvaListCard
    },
    mounted() {
        this.getEvaList()
    },
    computed: {
        evaListData() {
            if(this.sortOrder == '按时间') {
                return this.timeList
            }else if(this.sortOrder == '按分数') {
                return this.scoreList
            }
        }
    },
    data() {
        return {
            sortOrder: '按时间',
            timeList: [],
            scoreList: [],
            isLoading: true
        }
    },
    methods: {
        getEvaList() {
            this.isLoading = true
            let theData = {
                studentId: store.state.user.userId,
                courseId: store.state.course.courseId
            }
            axios.defaults.headers.post["Content-Type"] = "application/json";
            axios
                .post('http://43.138.136.200:8090/student/getAllAssessment', JSON.stringify(theData))
                .then(
                    (res) => {
                        this.isLoading = false
                        console.log(res.data)
                        if(res.data.requestCode == '32_01') {
                            this.timeList = res.data.timeList
                            this.scoreList = res.data.scoreList
                        }else if(res.data.requestCode == '32_00') {
                            alert(res.data.prompt)
                        }
                    },
                    (error) => {
                        alert('请求失败')
                    }
                )
        }
    }
}
</script>

<style scoped>
    .evaList {
        background-color: white;
        width: 80%;
        height: 80%;
        border: 1px solid #ccc;
        border-radius: 8px;
    }
    .evaList h2 {
        margin: 5px;
        font-weight: 200;
    }
    .evaList hr {
        border: 0; 
        border-top: 1px solid #ccc;
        margin: 10px 0; 
    }
    .evaList .select {
        position: relative;
        left: 2%;
        margin-top: 2%;
        margin-bottom: 2%;
    }
    .evaList .showEva {
        /* margin-top: 5%; */
        /* background-color: red; */
        width: 90%;
        height: 75%;
        position: relative;
        left: 47.5%;
        transform: translate(-45%, 0);
        overflow: auto;
    }
    .evaList .card {
        margin-bottom: 2%;
    }
    ::-webkit-scrollbar {
        display: none;
    }
</style>