// modules/paperModule.js
export default {
    namespaced: true,
    state() {
        return {
            selectAnswer: ['','','','','','','','','','','','','','','','','','','','','','','','',''],
            inputAnswer: ['','','','','','','','','','','','','','','','','','','','','','','','',''],
            currentQuestionIndex: 0,
            currentQuestionType: 'select',
            countdown: 3600,
            assessmentId: ''
        }
    },
    mutations: {
        setSelectQuestions(state, selectQuestions) {
            state.selectQuestions = selectQuestions
        },
        setInputQuestions(state, inputQuestions) {
            state.inputQuestions = inputQuestions
        },
        setCurrentIndex(state, currentQuestionIndex) {
            state.currentQuestionIndex = currentQuestionIndex
        },
        setCurrentType(state, currentQuestionType) {
            state.currentQuestionType = currentQuestionType
        },
        setCountdown(state, countdown) {
            state.countdown = countdown
        },
        setAssessmentId(state, assessmentId) {
            state.assessmentId = assessmentId
        },
        setSelectAnswer(state, selectAnswer) {
            state.selectAnswer = selectAnswer
        },
        setInputAnswer(state, inputAnswer) {
            state.inputAnswer = inputAnswer
        }
    }
}