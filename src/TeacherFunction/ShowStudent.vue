<template>
    <div class="showStudent" v-loading="isLoading" element-loading-text="加载中...">
        <h2>所有学生</h2>
        <hr>
        <el-input
            class="search"
            placeholder="搜索学生"
            v-model="studentKey"
        />
        <el-button type="primary" class="searchButton" @click="getStuList()">搜索</el-button>
        <div class="showStu">
            <StudentCard class="studentCard" v-for="student in stuList" :studentId="student.studentId" :avatar="student.avatar" :overall="student.overall" :studentName="student.studentName"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import StudentCard from './StudentCard.vue';
import store from '@/store';

export default {
    name: 'ShowStudent',
    components: {
        StudentCard
    },
    mounted() {
        this.getStuList()
    },
    data() {
        return {
            stuList: [],
            studentKey: '',
            courseId: store.state.course.courseId,
            isLoading: true
        }
    },
    methods: {
        getStuList() {
            this.isLoading = true
            let searchData = {
                courseId: this.courseId,
                studentKey: this.studentKey
            }
            axios.defaults.headers.post['Content-Type'] = 'application/json'
            axios
                .post('http://43.138.136.200:8090/teacher/getAllStudent', JSON.stringify(searchData))
                .then(
                    (res) => {
                        this.isLoading = false
                        if(res.data.requestCode == '41_01') {
                            this.stuList = res.data.list
                            console.log(res.data.list)
                        }else if(res.data.requestCode == '41_00') {
                            alert(res.data.prompt)
                        }
                    },
                    (error) => {
                        this.isLoading = false
                        alert('请求错误')
                    }
                )
        }
    }
}
</script>

<style scoped>
    .showStudent {
        margin-top: 1.4%;
        background-color: white;
        width: 80%;
        height: 80%;
        border: 1px solid #ccc;
        border-radius: 8px;
    }
    .showStudent h2 {
        margin: 5px;
        font-weight: 200;
    }
    .showStudent hr {
        border: 0; 
        border-top: 1px solid #ccc;
        margin: 10px 0; 
    }
    .showStudent .search {
        width: 15%;
        position: relative;
        left: 1%;
        /* background-color: #ccc; */
    }
    .showStudent .searchButton {
        position: relative;
        left: 1.5%;
    }
    .showStudent .showStu {
        margin-top: 3%;
        width: 90%;
        height: 75%;
        position: relative;
        left: 50%;
        transform: translate(-45%, 0);
        overflow: auto;
        /* background-color: rebeccapurple; */
    }
    .showStudent .studentCard {
        margin-bottom: 2%;
        margin-top: 2%;
    }
    ::-webkit-scrollbar {
        display: none;
    }
</style>