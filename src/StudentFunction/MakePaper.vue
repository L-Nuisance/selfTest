<template>
    <div class="makePaper" v-loading="isLoading" element-loading-text="生成试卷时间可能较长，请耐心等待..." v-loading.fullscreen.lock='isLoading'>
        <h2>选择知识点</h2>
        <hr>
        <span class="describe">难度选择：</span>
        <el-select v-model="difficulty" class="select" >
            <el-option label="简单" value="简单"/>
            <el-option label="一般" value="一般"/>
            <el-option label="困难" value="困难"/>
        </el-select>
        <span class="describe">选择题数量：</span>
        <el-select v-model="selectNumber" class="select" >
            <el-option label="10" value="10"/>
            <el-option label="15" value="15"/>
            <el-option label="25" value="25"/>
        </el-select>
        <span class="describe">填空题数量：</span>
        <el-select v-model="inputNumber" class="select" >
            <el-option label="10" value="10"/>
            <el-option label="15" value="15"/>
            <el-option label="25" value="25"/>
        </el-select>
        <div class="showKno">
            <KnoCard :key="resetTime" v-for="knowledge in knoData" :allDisabled="this.allDisabled" :maxProportion="this.maxProportion" :chapter="knowledge.label" :knowledgeData="knowledge.knowledgeList" class="knoCard"/>
        </div>
        <button class="button" @click="createPaper()">生成试卷</button>
        <button class="button" @click="resetData">重置</button>
        <!-- <el-loading  text="loadingText" :fullscreen="true"></el-loading> -->
    </div>
</template>

<script>
import KnoCard from './KnoCard.vue';
import store from '@/store';
import axios from 'axios';

export default {
    name: 'MakePaper',
    components: {
        KnoCard
    },
    created() {
        this.$store.commit('createPaper/resetProportion', 1.0)
        console.log(this.knoData)
    },
    computed: {
        knoData() {
            return store.state.course.knoData;
        },
        courseId() {
            return store.state.course.courseId;
        },
        studentId() {
            return store.state.user.userId;
        }
    },
    data() {
        return {
            defaultProps: {
                children: 'knowledgeList',
                label: 'label',
            },
            difficulty: '简单',
            selectNumber: 10,
            inputNumber: 10,
            maxProportion: 1,
            knowledgeList: [],
            resetTime: 0,
            isLoading: false,
            allDisabled: false,
            loadingText: '加载时间可能较长，请耐心等待...'
        }
    },
    methods: {
        addData(kno) {
            let now = this.maxProportion - kno.inputValue
            console.log(now)
            if(kno.inputValue != 0 &&  now >= 0) {
                this.$store.commit('createPaper/setNowProportion', kno.inputValue);
                let temporaryList = [kno.label, kno.inputValue];
                this.knowledgeList.push(temporaryList);
                this.maxProportion = store.state.createPaper.nowProportion;
                kno.isDisabled = true;
                if(this.maxProportion == 0) {
                    alert('已完成占比设置')
                    this.allDisabled = true
                }
            }else if(kno.inputValue == 0){
                alert('占比不可为零！')
            }else if(now < 0) {
                alert('总占比不可超过1')
            }
        },
        resetData() {
            if(this.resetTime == 0) {
                this.resetTime = 1
            }else {
                this.resetTime = 0
            }
            this.$store.commit('createPaper/resetProportion', 1.0)
            this.maxProportion = 1
        },
        createPaper() {
            if(this.maxProportion == 0) {
                var createData = {
                    studentId: this.studentId,
                    courseId: this.courseId,
                    difficulty: this.difficulty,
                    selectNumber: this.selectNumber,
                    inputNumber: this.inputNumber,
                    knowledgeList: this.knowledgeList
                }
                this.isLoading = true
                axios.defaults.headers.post["Content-type"] = "application/json";
                axios
                    .post('http://43.138.136.200:8090/student/generatePaper', JSON.stringify(createData))
                    .then(
                        (res) => {
                            this.isLoading = false
                            if(res.data.requestCode == '30_01') {
                                this.$store.commit('paper/setSelectQuestions', res.data.selectQuestionList)
                                this.$store.commit('paper/setInputQuestions', res.data.inputQuestionList)
                                this.$store.commit('paper/setAssessmentId', res.data.assessmentId)
                                this.isLoading = false;
                                this.$router.push(
                                    {
                                        name: 'exam'
                                    }
                                )
                            }else if(res.data.requestCode == '30_00') {
                                this.isLoading = false;
                                alert(res.data.prompt)
                            }
                        },
                        (error) => {
                            this.isLoading = false;
                            console.log('请求失败')
                        }
                    )
                // this.isLoading = false;
            }else if(this.maxProportion != 0) {
                alert('知识点占比不足，无法生成试卷')
                this.resetData()
            }
        }
    }
}
</script>

<style scoped>
    .makePaper {
        background-color: white;
        width: 80%;
        height: 80%;
        border: 1px solid #ccc;
        border-radius: 8px;
        /* overflow: auto; */
    }
    .makePaper h2 {
        margin: 5px;
        font-weight: 200;
    }
    .makePaper hr {
        border: 0; 
        border-top: 1px solid #ccc;
        margin: 10px 0; 
    }
    .showKno {
        margin: 0;
        padding: 0;
        overflow: auto;
        /* background-color: aqua; */
        height: 60%;
    }
    .knoCard {
        margin: 2%;
    }
    .select {
        margin: 2% 0;
    }
    .describe {
        margin-left: 2%;
    }
    .button {
        color: white;
        border: 0;
        border-radius: 5px;
        background-color: #7b9ce3;
        margin-left: 6%;
        width: 8%;
        height: 6%;
        position: relative;
        top: 5%;
        left: 40%;
        transform: translate(-50%,0);
        cursor: pointer;
    }
    .button:hover {
        background-color: #5B86E5;
    }
</style>