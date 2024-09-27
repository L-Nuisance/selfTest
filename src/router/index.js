//创建整个应用的路由器
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

//创建并且暴露一个路由器

const routes = [
    {
        path: '/Welcome',
        name: 'welcome',
        components: {
            mainView: () => import('@/SystemView/WelcomeView')
        }
    },
    {
        path: '/AdminView',
        name: 'adminView',
        components:{
            mainView: ()=>import('@/SystemView/AdministratorView')
        },
        children:[
            {
                path:'PermissionManagement',
                name:'permissionManagement',
                components:{
                    adminView:() =>import('@/NavigationBar/AdminNavigationBar'),
                    messageView:()=>import('@/AdminFunction/PermissionManagement')
                }
            },
            {
                path:'LogManagement',
                name:'logManagement',
                components:{
                    adminView:() =>import('@/NavigationBar/AdminNavigationBar'),
                    messageView:()=>import('@/AdminFunction/LogManagement')
                }
            }
        ]
    },

    {
        path: '/TeacherView',
        name: 'teacherView',
        components: {
            mainView: () => import('@/SystemView/TeacherView'),
        },
        children: [
            {
                path: 'TotalCourse',
                name: 'totalCourse',
                components: {
                    teacherView: () => import('@/NavigationBar/TeacherNav'),
                    //教师查看课程组件
                    messageView: () => import('@/TeacherFunction/TotalCourse')
                }
            },
            {
                path: 'CreateCourse',
                name: 'createCourse',
                components: {
                    teacherView: () => import('@/NavigationBar/TeacherNav'),
                    //教师创建课程组件
                    messageView: () => import('@/TeacherFunction/CreateCourse')
                }
            },
            {
                path: 'UserMessage',
                name: 'userMessage',
                components: {
                    teacherView: () => import('@/none/AccountManagement')
                    //messageView为空
                }
            },
            {
                path: 'TeacherCourse',
                name: 'teacherCourse',
                components: {
                    teacherView: () => import('@/NavigationBar/CourseNav'),
                    // messageView为空
                }
            },
            {
                path: 'TeacherCourse/CourseInformation',
                name: 'courseInformation',
                components: {
                    teacherView: () => import('@/NavigationBar/CourseNav'),
                    //课程信息组件
                    messageView: () => import('@/TeacherFunction/CourseInform')
                }
            },
            {
                path: 'TeacherCourse/ShowQuestions',
                name: 'showQuestions',
                components: {
                    teacherView: () => import('@/NavigationBar/CourseNav'),
                    messageView: () => import('@/ControlQuestions/ShowQuestions')
                }
            },
            {
                path: 'TeacherCourse/AllStudents',
                name: 'allStudents',
                components: {
                    teacherView: () => import('@/NavigationBar/CourseNav'),
                    //查看课程内所有学生组件
                    messageView: () => import('@/TeacherFunction/ShowStudent')
                }
            },
            {
                path: 'TeacherCourse/StuEvaList',
                name: 'stuEvaList',
                components: {
                    teacherView: () => import('@/NavigationBar/CourseNav'),
                    //查看课程内所有学生组件
                    messageView: () => import('@/TeacherFunction/StuEvaList')
                }
            },
            {
                path: 'TeacherCourse/ManageKnowledge',
                name: 'manageKnowledge',
                components: {
                    teacherView: () => import('@/NavigationBar/CourseNav'),
                    //管理课程知识点组件
                    messageView: () => import('@/TeacherFunction/AddChapters')
                }
            }
        ]
    },
    {
        path: '/StudentView',
        name: 'studentView',
        components: {
            mainView: () => import('@/SystemView/StudentView')
        },
        children: [
            {
                path: 'StudentMessage',
                name:'studentMessage',
                components: {
                    studentView: () => import('@/none/StudentAccount')
                }
            },
            {
                path: 'MyCourses',
                name: 'myCourses',
                components: {
                    studentView: () => import('@/NavigationBar/StudentNav'),
                    //学生查看已加入课程组件
                    messageView: () => import('@/StudentFunction/ShowCourse')
                }
            },
            {
                path: 'JoinCourse',
                name: 'joinCourse',
                components: {
                    studentView: () => import('@/NavigationBar/StudentNav'),
                    //学生查看未加入课程组件
                    messageView: () => import('@/StudentFunction/AllCourse')
                }
            },
            {
                path: 'JoinedCourse',
                name: 'joinedCourse',
                components: {
                    studentView: () => import('@/NavigationBar/JoinedNav'),
                }
            },
            {
                path: 'JoinedCourse/CourseInformation',
                name: 'joinedCourseInformation',
                components: {
                    studentView: () => import('@/NavigationBar/JoinedNav'),
                    //学生查看已加入课程信息的组件
                    messageView: () => import('@/StudentFunction/JoinedInf')
                }
            },
            {
                path: 'JoinedCourse/CourseKnowledge',
                name: 'joinedCourseKnowledge',
                components: {
                    studentView: () => import('@/NavigationBar/JoinedNav'),
                    //学生查看已加入课程知识点的组件
                    messageView: () => import('@/StudentFunction/ShowKnowledge')
                }
            },
            {
                path: 'JoinedCourse/MyEvaluation',
                name: 'joinedMyEvaluation',
                components: {
                    studentView: () => import('@/NavigationBar/JoinedNav'),
                    //学生查看已加入课程测评的组件
                    messageView: () => import('@/StudentFunction/EvaList')
                }
            },
            {
                path: 'JoinedCourse/MakePaper',
                name: 'makePaper',
                components: {
                    studentView: () => import('@/NavigationBar/JoinedNav'),
                    messageView: () => import('@/StudentFunction/MakePaper')
                }
            },
            {
                path: 'JoinedCourse/Exam',
                name: 'exam',
                components: {
                    studentView: () => import('@/StudentFunction/Exam')
                }
            },
            {
                path: 'JoinedCourse/Evaluation',
                name: 'evaluation',
                components: {
                    studentView: () => import('@/StudentFunction/Evaluation')
                }
            },
            {
                path: 'AllCourse',
                name: 'allCourse',
                components: {
                    studentView: () => import('@/NavigationBar/NotJoinedNav')
                }
            },
            {
                path: 'AllCourse/NormalInf',
                name: 'normalInf',
                components: {
                    studentView: () => import('@/NavigationBar/NotJoinedNav'),
                    messageView: () => import('@/StudentFunction/NormalInf')
                }
            },
            {
                path: 'AllCourse/ShowKnowledge',
                name: 'notJoinedCourseKnowledge',
                components: {
                    studentView: () => import('@/NavigationBar/NotJoinedNav'),
                    messageView: () => import('@/StudentFunction/ShowKnowledge')
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router