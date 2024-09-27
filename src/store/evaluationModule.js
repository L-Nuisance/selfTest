// modules/evaluationModule.js
export default {
    namespaced: true,
    state() {
        return {
            evaluationId: '',
            evaluation: '',
            overall: '',
            score: '',
            evaList: []
        }
    },
    mutations: {
        setEvaluationId (state, evaluationId) {
            state.evaluationId = evaluationId
        },
        setEvaluation (state, evaluation) {
            state.evaluation = evaluation
        },
        setOverall (state, overall) {
            state.overall = overall
        },
        setScore (state, score) {
            state.score = score
        },
        setEvaList (state, evaList) {
            state.evaList = evaList
        },
    }
}