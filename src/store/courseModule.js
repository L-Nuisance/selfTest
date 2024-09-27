// modules/courseModule.js
export default {
    namespaced: true,
    state() {
        return {
            courseId: '',
            courseName: '',
            coursePic: '',
            teacher: '',
            description: '',
            nowNav: 'course-message',
            knoData: []
        }
    },
    mutations: {
        setKnoData(state, knoData) {
            state.knoData = knoData;
        },
        setCourseId(state, courseId) {
            state.courseId = courseId;
        },
        setCourseName(state, courseName) {
            state.courseName = courseName;
        },
        setCoursePic(state, coursePic) {
            state.coursePic = coursePic;
        },
        setTeacher(state, teacher) {
            state.teacher = teacher;
        },
        setKnoData(state, knoData) {
            state.knoData = knoData;
        },
        setCourseDescription(state, description) {
            state.description = description;
        },
        setNowNav(state, nowNav) {
            state.nowNav = nowNav;
        }
    }
}