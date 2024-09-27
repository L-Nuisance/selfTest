<template>
    <div class="showCourse" v-loading="isLoading" element-loading-text="我的课程加载中...">
        <h2>我的课程</h2>
        <hr>
        <span class="search">课程关键词：</span>
        <el-input v-model="courseKey" style="width: 250px;" placeholder="课程关键词" class="search"></el-input>
        <el-button type="primary" @click="getTheData()">查询</el-button>
        <div class="courses">
            <SingleCourse
            id = 'singleCourse'
            :key="isReset"
            v-for="courseData in theData"
            :courseData="courseData"
            :courseData.courseCover = "courseData.courseCover"
            @click="toJoinedCourse(courseData)"/>
        </div>
    </div>
</template>

<script>
import SingleCourse from './SingleCourse.vue';
import axios from 'axios';
import store from '@/store';

export default {
    name: 'ShowCourse',
    components: {
        SingleCourse
    },
    data() {
        return {
            theData: [],
            courseKey: '',
            isReset: 0,
            isLoading: true
        }
    },
    computed: {
        userId() {
            return store.state.user.userId
        }
    },
    mounted() {
        this.getTheData()
    },
    methods: {
        getTheData() {
            this.isLoading = true
            var searchData = {
                     studentId: this.userId,
                     courseKey: this.courseKey
                }
                
            axios.defaults.headers.post["Content-type"] = "application/json";
            axios
                .post('http://43.138.136.200:8090/student/selectIsJoinedCourse', JSON.stringify(searchData))
                .then(
                    (res) => {
                        this.isLoading = false
                        if(res.data.requestCode == '27_01') {
                            this.theData = res.data.courseList
                            console.log(this.theData)
                            // console.log(this.theData)
                            if(this.isReset == 0) {
                                this.isReset = 1
                            }else if(this.isReset == 1) {
                                this.isReset = 0
                            }
                        }else if(res.data.requestCode == '27_00') {
                            if(searchData.courseKey == '') {
                                alert('未加入任何课程')
                            }else {
                                alert('搜索结果为空')
                            }
                        }
                    },
                    (error) => {
                        alert('请求失败')
                    }
                )
        },
        toJoinedCourse(theCourseData) {
            var entryData = {
                     studentId: this.userId,
                     courseId: theCourseData.courseId
                }
                console.log(entryData)
            axios.defaults.headers.post["Content-type"] = "application/json";
            axios
                .post('http://43.138.136.200:8090/student/entryJoinedCourse', JSON.stringify(entryData))
                .then(
                    (res) => {
                        if(res.data.requestCode == '28_01') {
                            console.log(res)
                            this.$store.commit('course/setCourseId', theCourseData.courseId);
                            this.$store.commit('course/setCourseName', theCourseData.courseName);
                            this.$store.commit('course/setCoursePic','data:image/png;base64,' + theCourseData.courseCover);
                            this.$store.commit('course/setTeacher', theCourseData.teacher);
                            this.$store.commit('course/setKnoData', res.data.list);
                            this.$store.commit('course/setCourseDescription', res.data.courseDescription);
                            console.log(store.state.course.description)
                            console.log(store.state.course.knoData)
                            this.$router.push(
                                {
                                    name: 'joinedCourseInformation', 
                                    query: {userId: this.userId, courseId: theCourseData.courseId, nowNav: 'course-message'}
                                }
                                )
                        }else if(res.data.requestCode == '28_00') {
                            alert('课程打开失败')
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
    .showCourse {
        background-color: white;
        width: 80%;
        height: 80%;
        border: 1px solid #ccc;
        border-radius: 8px;
    }
    .courses {
        display: flex;
        flex-wrap: wrap;
        overflow-x: auto;
        width: 100%;
        height: 80%;
        /* background-color: rebeccapurple; */
    }
    .showCourse h2 {
        font-size: 25px;
        margin: 5px;
        font-weight: 200;
    }
    .showCourse hr {
        border: 0; 
        border-top: 1px solid #ccc;
        margin: 10px 0; 
    }
    .showCourse .search {
        margin: 5px;
    }
    #singleCourse:hover {
        cursor: pointer;
    }
</style>