<template>
    <div class="changeQuestion">
        <span class="title">{{ now }}</span>
        <button type="button" id="back-button" @click="close(false)">返回</button>
        <div class="operatingSpace">
            <div class="questionStem">
                <span>题干：</span>
                <br>
                <textarea id="question-stem" cols="30" rows="50" v-model="question"></textarea>
            </div>
            <div class="answer">
                <span>答案：</span>
                <br>
                <textarea id="question-answer" cols="30" rows="10" v-model="answer"></textarea>
            </div>
            <button type="button" id="done-button" @click="sendChange()">完成</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:'ChangeQuestion',
    props: {
        teacherId: String,
        questionID: String,
        courseId: String
    },
    mounted() {
        this.setData();
    },
    data() {
        return {
            now: '修改题目',
            question: '',
            answer: '',
            knowledge: '',
            chapterValue: '章节三',
        }
    },
    methods: {
        setData(theQuestionID) {
            axios.get('http://43.138.136.200:8090/teacher/selectQuestion?questionId=' + theQuestionID).then(
                (success) => {
                    console.log(this.questionID)
                    console.log(success.data)
                    if(success.data.requestCode == '23_01'){
                        this.chapterValue = success.data.chapter;
                        this.question = success.data.question;
                        this.answer = success.data.answer;
                        this.knowledge = success.data.knowledge;
                        // this.chapterData = success.data.chapterData;
                    }else if(success.data.requestCode == '23_00'){
                        console.log('信息错误')
                    }
                },
                (error) => {
                    console.log(this.questionID)
                    console.log('请求错误')
                }
            )
        },
        sendChange() {
            // this.setData();
            var changeData = {
                teacherId: this.teacherId,
                courseId: this.courseId,
                questionID: this.questionID,
                chapter: this.chapterValue,
                question: this.question,
                answer: this.answer,
                knowledge: this.knowledge
            }
            axios.defaults.headers.post["Content-type"] = "application/json";
            axios
                .post('http://43.138.136.200:8090/teacher/updateQuestion',JSON.stringify(changeData))
                .then(
                    (res) => {
                        if(res.data.requestCode == '14_01'){
                            alert('修改成功')
                            setTimeout(() => {
                                this.close(true);
                            }, 0); 
                        }else if(res.data.requestCode == '14_00'){
                            alert('修改失败')
                            this.close(false);
                        }
                    },
                    (error) => {
                        alert('请求失败')
                        this.close(false);
                    }
                )
        },
        close(isDone) {
            this.$parent.closeChange();
            if(isDone) {
                this.$parent.makeTable()
            }
        }
    }
}
</script>

<style scoped>
    .changeQuestion {
        margin: 0;
        padding: 0;
        width: 1150px;
        height: 600px;
        background-color: white;
        box-shadow: 0 0 0 1px #cccccc ;
    }
    .changeQuestion .title {
        margin: 0;
        padding: 0;
        position: relative;
        left: 10px;
        font-size: 25px;
    }
    .changeQuestion #back-button {
        margin: 0;
        padding: 0;
        background-color: #5B86E5;
        color: #fff;
        cursor: pointer;
        border: none;
        border-radius: 15px;
        width: 125px;
        height: 50px;
        font-size: 17.5px;
        position: relative;
        left: 90%;
        top: 5%;
        transform: translate(-100%,-50%);
    }
    .changeQuestion #back-button:hover {
        background-color: #4C6EB8;
        cursor: pointer;
    }
    .changeQuestion .operatingSpace {
        margin: 0;
        padding: 0;
        position: relative;
        left: 70px;
        top: 0px;
    }
    .changeQuestion .operatingSpace span {
        margin: 0;
        padding: 0;
    }
    .changeQuestion .operatingSpace textarea {
        margin: 0;
        padding: 0;
        height: 150px;
        width: 1000px;
        resize: none;
        background-color: #ececec;
    }
    .changeQuestion #done-button {
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
        left: 500px;
        top: 20px;
        transform: translate(-80%,0%);
    }
    .changeQuestion #done-button:hover {
        background-color: #4C6EB8;
    }
</style>