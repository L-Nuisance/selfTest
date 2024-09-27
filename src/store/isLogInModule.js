// modules/isLogInModule.js
export default {
    namespaced: true,
    state() {
        return {
            isStuLogIn: false,
            isTeaLogIn: true
        };
    },
    mutations: {
        setIsStuLogIn(state, isStuLogIn) {
            state.isStuLogIn = isStuLogIn
        },
        setIsTeaLogIn(state, isTeaLogIn) {
            state.isTeaLogIn = isTeaLogIn
        }
    }
}