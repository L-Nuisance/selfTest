<template>
    <div class="selectQuestion" v-loading="isLoading" element-loading-text="添加题目中...">
        <div class="chapter">
            <el-cascader placeholder="选择知识点" v-model="knowledgeValue" :options="chapterData" :props="defaultProps"/>
            <span class="dif">设置难度系数: </span>
            <el-input-number class="dif" v-model="difficultyFactor" placeholder="设置难度系数" :min="0.01" :max="1" :step="0.01"/>
        </div>
        <div class="questionStem">
            <span>题干：</span>
            <textarea id="question-stem" cols="30" rows="50" v-bind:placeholder = "s_reminder" v-model="question"></textarea>
        </div>
        <div class="answer">
            <span>答案：</span>
            <textarea id="question-answer" cols="30" rows="10" v-bind:placeholder = "a_reminder" v-model="answer"></textarea>
        </div>
        <button type="button" @click="sendAdd()">完成</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:'SelectQuestion',
    props: {
        courseID:String,
        teacherId: String
    },
    mounted() {
        this.getChapterList()
    },
    data() {
        return {
            s_reminder: '题目格式:\n题目内容: 这是题目的具体内容\nA.选项A的描述\nB.选项B的描述\nC.选项C的描述\nD.选项D的描述',
            a_reminder: '如:AC',
            k_reminder: '请按先主后次知识点顺序排序且知识点间请用 “,” 分隔',
            question: '',
            answer: '',
            chapterData: [],
            knowledgeValue: '',
            difficultyFactor: '0.01',
            defaultProps: {
                label: 'label',
                value: 'label',
                children: 'knowledgeList'
            },
            isLoading: false
        }
    },
    methods: {
        handleChange() {
            console.log(this.knowledgeValue)
        },
        isComplete() {
            return (this.chapterValue != '' && this.question != '' && this.answer != '' && this.knowledge !='' && this.knowledgeValue != '' && this.difficultyFactor != null)
        },
        getChapterList() {
            axios
                .get('http://43.138.136.200:8090/teacher/getChapterAndKnowledge?courseId=' + this.courseID)
                .then(
                    (res) => {
                        if(res.data.requestCode == '40_01') {
                            this.chapterData = res.data.list
                        }else if (res.data.requestCode == '40_00') {
                            console.log(res.data.prompt)
                            alert('课程中暂无知识点，请先添加章节知识点')
                        }
                    },
                    (error) => {
                        alert('请求失败')
                    }
                )
        },
        sendAdd() {
            if(this.isComplete()){
                this.isLoading = true
                var addData = {
                    teacherId: this.teacherId,
                    courseId: this.courseID,
                    type: '选择题',
                    chapter: this.knowledgeValue,
                    question: this.question,
                    answer: this.answer,
                    difficultyFactor: this.difficultyFactor
                };
                console.log(addData);
                axios.defaults.headers.post["Content-type"] = "application/json";
                axios
                    .post("http://43.138.136.200:8090/teacher/insertQuestion",JSON.stringify(addData))
                    .then(
                        (res) => {
                            this.isLoading = false
                            if(res.data.requestCode == '9_01'){
                                this.question = '',
                                this.answer = '',
                                this.knowledgeValue = '',
                                this.difficultyFactor = '0.01',
                                alert(res.data.prompt)
                                setTimeout(() => {
                                    this.$parent.close(true);
                                }, 0); 
                            }else if(res.data.requestCode == '9_00'){
                                alert(res.data.prompt)
                                setTimeout(() => {
                                    this.$parent.close(true);
                                }, 0); 
                            }
                        },
                        (error) => {
                            this.isLoading = false
                            alert('请求失败')
                            setTimeout(() => {
                                this.$parent.close(true);
                            }, 0); 
                        }
                    )
            }else if(!this.isComplete()){
                alert('信息不全，无法添加')
            }
        }
    }
}
</script>

<style>
    .selectQuestion {
        position: relative;
        left: 70px;
    }
    .selectQuestion textarea {
        resize: none;
        background-color: #D9D9D9;
    }
    .selectQuestion button {
        margin: 0;
        padding: 0;
        background-color: #5B86E5;
        color: #fff;
        cursor: pointer;
        border: none;
        width: 100px;
        height: 40px;
        border-radius: 5px;
        position: relative;
        left: 50%;
        top: 20px;
        transform: translate(-50%,0%);
    }
    .selectQuestion button:hover {
        background-color: #4C6EB8;
    }
    .selectQuestion .questionStem #question-stem {
        width: 1000px;
        height: 150px;
        border-radius: 5px;
        position: relative;
    }
    .selectQuestion .answer #question-answer {
        width: 1000px;
        border-radius: 3px;
    }
    .selectQuestion .knowledge #question-knowledge {
        width: 1000px;
        height: 125px;
        border-radius: 5px;
    }
    .selectQuestion .dif {
        position: relative;
        left: 2%;
    }
</style>