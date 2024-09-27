// modules/stuEvaModule.js
export default {
    namespaced: true,
    state() {
        return {
            stuAvatar: '',
            stuOverall: '',
            evaList: [],
            stuName: ''
        }
    },
    mutations: {
        setStuAvatar(state, stuAvatar) {
            state.stuAvatar = stuAvatar
        },
        setStuOverall(state, stuOverall) {
            state.stuOverall = stuOverall
        },
        setEvaList(state, evaList) {
            state.evaList = evaList
        },
        setStuName(state, stuName) {
            state.stuName = stuName
        }
    }
}