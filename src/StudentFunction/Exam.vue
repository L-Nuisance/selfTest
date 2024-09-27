<template>
    <div class="exam" v-loading="isLoading" element-loading-text="交卷成功，本次评测生成中...">
        <div class="nav">
            <div class="selectNav">
                <h3>选择题</h3>
                <hr>
                <button type="button" v-for="(question, index) in selectQuestions" :key="index" :id="`select-${index}`" @click="changQuestion(index, 'select')">
                    {{ index + 1 }}
                </button>
            </div>
            <div class="inputNav">  
                <h3>填空题</h3>
                <hr>
                <button type="button" v-for="(question, index) in inputQuestions" :key="index" :id="`input-${index}`" @click="changQuestion(index, 'input')">
                    {{ index + 1 }}
                </button>
            </div>
        </div>
        <div class="show">
            <div class="countdown">
                考试时间：<span>{{ formattedTime }}</span>
            </div>
            <div class="selectShow" v-if="currentQuestionType === 'select'">
                <h4>选择题</h4>
                <hr>
                <div class="question">
                    <p>{{ currentQuestion.description }}</p>
                    <div v-for="(option, optionIndex) in currentQuestion.options" :key="optionIndex" class="options">
                        <input type="radio" 
                                :value="theOptions[optionIndex]"
                                :id="`option-${optionIndex}`"
                                v-model="this.selectAnswer[currentQuestionIndex]"
                                >{{ option }}
                    </div>
                </div>
            </div>
            <div class="inputShow" v-if="currentQuestionType === 'input'">
                <h4>填空题</h4>
                <hr>
                <div class="question">
                    <p>{{ currentQuestion.description }}</p>
                    <textarea id="" cols="30" rows="10" v-model="inputAnswer[currentQuestionIndex]" placeholder="在此输入答案，多空请按逗号隔开"></textarea>
                </div>
            </div>
            <div v-if="currentQuestionIndex === 0 && currentQuestionType === 'select'">
                <button type="button" @click="nextQuestion()">下一题</button>
            </div>
            <div v-else-if="currentQuestionIndex != maxInputIndex || currentQuestionType != 'input'">
                <button type="button" class="two" @click="lastQuestion()">上一题</button>
                <button type="button" class="two" @click="nextQuestion()">下一题</button>
            </div>
            <div v-else-if="currentQuestionIndex === maxInputIndex && currentQuestionType === 'input'">
                <button type="button" class="two" @click="lastQuestion()">上一题</button>
                <button type="button" class="two" @click="handPaper()">交卷</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import store from '@/store';

export default {
    name: 'Exam',
    mounted() {
        let theId = document.getElementById(store.state.paper.currentQuestionType + '-' + store.state.paper.currentQuestionIndex)
        theId.style.backgroundColor = '#5B86E5'
        this.startCountdown()
    },
    computed: {
      currentQuestion() {
        return this.currentQuestionType === 'select'
          ? this.selectQuestions[this.currentQuestionIndex]
          : this.inputQuestions[this.currentQuestionIndex] || {};
      },
      formattedTime() {
        const minutes = Math.floor(this.countdown / 60);
        const seconds = this.countdown % 60;
        return `${this.pad(minutes)}:${this.pad(seconds)}`;
      },
    },
    data() {
        return {
            theOptions: ['A', 'B', 'C', 'D'],
            selectQuestions: store.state.paper.selectQuestions,
            inputQuestions: store.state.paper.inputQuestions,
            currentQuestionIndex: store.state.paper.currentQuestionIndex,
            currentQuestionType: store.state.paper.currentQuestionType,
            selectAnswer: store.state.paper.selectAnswer,
            inputAnswer: store.state.paper.inputAnswer,
            maxSelectIndex: store.state.paper.selectQuestions.length - 1,
            maxInputIndex: store.state.paper.inputQuestions.length - 1,
            countdown: store.state.paper.countdown,
            isLoading: false
        }
    },
    methods: {
            changQuestion(index, questionType) {
                if (index != this.currentQuestionIndex || questionType != this.currentQuestionType) {
                    let newId = document.getElementById(questionType + '-' + index);
                    let oldId = document.getElementById(this.currentQuestionType + '-' + this.currentQuestionIndex)
                    newId.style.backgroundColor = '#5B86E5';
                    oldId.style.backgroundColor = '#CCCCCC';
                    this.currentQuestionIndex = index;
                    this.currentQuestionType = questionType;
                    this.$store.commit('paper/setCurrentIndex', this.currentQuestionIndex);
                    this.$store.commit('paper/setCurrentType', this.currentQuestionType);
                }
            },
            nextQuestion() {
                if (this.currentQuestionIndex == this.maxSelectIndex && this.currentQuestionType == 'select') {
                    this.changQuestion(0, 'input')
                } else {
                    this.changQuestion(this.currentQuestionIndex + 1, this.currentQuestionType)
                }
            },
            lastQuestion() {
                if (this.currentQuestionIndex == 0 && this.currentQuestionType == 'input') {
                    this.changQuestion(this.maxSelectIndex, 'select')
                } else {
                    this.changQuestion(this.currentQuestionIndex - 1, this.currentQuestionType)
                }
            },
            pad(value) {
                return value < 10 ? '0' + value : value;
            },
            startCountdown() {
                this.timer = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown--;
                    this.$store.commit('paper/setCountdown', this.countdown)
                } else {
                    clearInterval(this.timer);
                    alert('考试时间到！');
                    handPaper()
                }
                }, 1000);
            },
            handPaper() {
                this.isLoading = true
                let theSelectAnswer = this.selectAnswer
                let theInputAnswer = this.inputAnswer
                let inputLen = theInputAnswer.length
                let selectLen = theSelectAnswer.length
                let i = 0
                for(i = inputLen; i < 25; i ++) {
                    theInputAnswer[i] = ''
                }
                for(i = selectLen; i < 25; i ++) {
                    theSelectAnswer[i] = ''
                }
                let answerData = {
                    assessmentId: store.state.paper.assessmentId,
                    selectAnswer: theSelectAnswer,
                    inputAnswer: theInputAnswer
                }
                axios.defaults.headers.post["Content-type"] = "application/json";
                axios
                    .post('http://43.138.136.200:8090/student/getAssessmentReport', JSON.stringify(answerData))
                    .then(
                        (res) => {
                            if(res.data.requestCode == '31_01') {
                                console.log(res.data)
                                console.log(res.data.list[0].evaluation)
                                let evaluation = res.data.list[0].evaluation
                                let overall = res.data.list[0].overall
                                let score = res.data.list[0].score
                                let evaList = res.data.list.slice(1)
                                this.$store.commit('paper/setSelectAnswer', ['','','','','','','','','','','','','','','','','','','','','','','','',''])
                                this.$store.commit('paper/setInputAnswer', ['','','','','','','','','','','','','','','','','','','','','','','','',''])
                                this.$store.commit('paper/setCurrentIndex', 0)
                                this.$store.commit('paper/setCurrentType', 'select')
                                this.$store.commit('paper/setCountdown', 3600)
                                this.$store.commit('evaluation/setOverall', overall)
                                this.$store.commit('evaluation/setScore', score)
                                this.$store.commit('evaluation/setEvaList', evaList)
                                this.isLoading = false
                                clearInterval(this.timer);
                                this.$router.push(
                                    {
                                        name: 'evaluation',
                                        query: {
                                            userId: store.state.user.userId,
                                        }
                                    }
                                )

                            }else if(res.data.requestCode == '31_00') {
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
    .exam {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 650px;
    }
    .nav {
        margin: 0;
        border-radius: 10px;
        background-color: white;
        width: 20%;
        height: 100%;
        box-shadow: 0px 0px 20px 0px #CCCCCC;
        margin-left: 2%;
        overflow: auto;
    }
    hr {
        border: 0; 
        border-top: 1px solid #ccc;
        margin: 10px 0; 
    }
    .nav h3 {
        font-weight: 500;
        margin-left: 5%;
    }
    .nav button {
        border: 2px solid #CCCCCC;
        cursor: pointer;
        margin: 3% 5%;
        border-radius: 5px;
        width: 10%;
        aspect-ratio: 1;
        background-color: #ccc;
        box-shadow: 0px 0px 20px 0px #CCCCCC;
    }
    .nav button:hover {
        border-color: #5B86E5;
    }
    .selected {
        background-color: #5B86E5;
    }
    .show {
        border-radius: 5px;
        width: 73%;
        height: 100%;
        position: relative;
        left: 25%;
        bottom: 100%;
        box-shadow: 0px 0px 20px 0px #CCCCCC;
    }
    .show h4 {
        margin: 0;
        padding: 1% 0;
        font-weight: 500;
        position: relative;
        left: 2%;
        bottom: 2%;
        font-size: 20px;
    }
    .show p {
        width: 94%;
        /* background-color: red; */
        position: relative;
        left: 3%;
        font-size: 18px;
    }
    .show .countdown {
        margin: 0;
        padding: 0;
        position: relative;
        left: 85%;
        top: 4%;
        font-size: 20px;
    }
    .show .countdown span {
        color: red;
    }
    .question {
        overflow: auto;
        /* background-color: red; */
        width: 100%;
        height: 530px;
    }
    .selectShow {
        height: 85%;
    }
    .selectShow .options {
        margin: 5%;
    }
    .inputShow {
        height: 85%;
    }
    .show button {
        position: relative;
        left: 50%;
        top: 20px;
        transform: translate(-50%, 0);
        border: 1px;
        border-radius: 5px;
        height: 40px;
        width: 10%;
        background-color: #CCCCCC;
    }
    .show button:hover {
        background-color: #5B86E5;
        cursor: pointer;
    }
    .show .two {
        margin: 0 5%;
        position: relative;
        left: 35%;
    }
    .show textarea {
        margin: 5% 5%;
        border: 2px solid #ccc;
        background: #ffffffd0;
        box-shadow: 0px 0px 20px 0px #CCCCCC;
        width: 88%;
        overflow: auto;
        resize: none;
    }
</style>