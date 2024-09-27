// modules/createPaperModule.js
export default {
    namespaced: true,
    state() {
        return {
            createData: [],
            difficulty: '',
            nowProportion: 1.0,
        }
    },
    mutations: {
        resetProportion(state, data) {
            state.nowProportion = data;
        },
        setNowProportion(state, data) {
            state.nowProportion = (state.nowProportion - data).toFixed(1);
        }
    }
}