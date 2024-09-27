<template>
    <div class="studentCard">
        <img :src="'data:image/png;base64,' + this.avatar" alt="avatar">
        <el-divider class="hrF" direction="vertical" />
        <div class="showName">
            <span class="studentName">学生：{{ studentName }}</span>
        </div>
        <el-divider class="hrS" direction="vertical" />
        <div class="showOverall">
            <span class="overall">总体情况：{{ overall }}</span>
        </div>
        <button class="check" @click="toStuEvaList()">查看测试情况</button>
    </div>
</template>

<script>
import axios from 'axios';
import store from '@/store';

export default {
    name: 'StudentCard',
    props: {
        studentId: String,
        avatar: String,
        studentName: String,
        overall: String
    },
    methods: {
        toStuEvaList() {
            let theData = {
                studentId: this.studentId,
                courseId: this.$route.query.courseId
            }
            axios.defaults.headers.post['Content-Type'] = 'application/json'
            axios   
                .post('http://43.138.136.200:8090/teacher/getStudentAssessment', JSON.stringify(theData))
                .then(
                    (res) => {
                        if(res.data.requestCode == '42_01') {
                            this.$store.commit('stuEvaList/setEvaList', res.data.list)
                            this.$store.commit('stuEvaList/setStuOverall', this.overall)
                            this.$store.commit('stuEvaList/setStuAvatar', this.avatar)
                            this.$store.commit('stuEvaList/setStuName', this.studentName)
                            this.$router.push(
                                {
                                    name: 'stuEvaList',
                                    query: {
                                        courseId: this.$route.query.courseId,
                                        userId: this.$route.query.userId,
                                        teacherId: this.$route.query.teacherId,
                                        nowNav: 'all-students'
                                    }
                                }
                            )
                        }else if(res.data.requestCode == '42_00') {
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
    .studentCard {
        background-color: rgb(241, 238, 238);
        border: 1px solid #ccc;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 90%;
        height: 50px;
    }
    .studentCard img {
        border-radius: 100%;
        height: 70%;
        aspect-ratio: 1;
        position: relative;
        left: 3.5%;
        top: 17.5%;
    }
    .studentCard .el-divider {
        height: 100%;
        position: relative;
        bottom: 11%;
        background-color: #cccccc49;
    }
    .studentCard .hrF {
        position: relative;
        left: 7%;
    }
    .studentCard span {
        margin-left: auto;
        margin-right: auto;
        font-size: 20px;
        position: relative;
        bottom: 5%;
    }
    .studentCard .showName {
        margin: 0;
        padding: 0;
        /* background-color: #5B86E5; */
        height: 50px;
        width: 20%;
        position: relative;
        bottom: 112.5%;
        left: 18.5%;
        /* text-align: center; */
        display: grid;
        place-items: center; /* 居中元素 */
        overflow: auto;
    }
    .studentCard .hrS {
        position: relative;
        left: 45%;
        bottom: 212.5%;
    }
    .studentCard .showOverall {
        /* background-color: #5B86E5; */
        height: 50px;
        width: 20%;
        position: relative;
        bottom: 312.5%;
        left: 48.3%;
        display: grid;
        place-items: center; /* 居中元素 */
    }
    .studentCard .check {
        border: 0;
        border-radius: 0 8px 8px 0;
        background-color: #5B86E5;
        color: white;
        font-size: 20px;
        height: 100%;
        width: 30%;
        position: relative;
        bottom: 412.5%;
        left: 70%;
    }
    .studentCard .check:hover {
        cursor: pointer;
        background-color: #8faff4;
    }
</style>