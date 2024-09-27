<template>
    <div class="showQuestions" v-loading="isLoading" element-loading-text="题库加载中...">
        <div class="operateArea">
            <span>题目关键词：</span>
            <el-input v-model="questionKey" style="width: 250px;" placeholder="题目关键词"></el-input>
            <br>
            <br>
            <el-button type="primary" @click="search()">查询</el-button>
            <el-button type="primary" @click="toAdd()">添加题目</el-button>
        </div>
        <br>
        <div class="questionsArea">
            <el-table
                :data="tableData"
                border
                style="width: 1300px;height: 450px;"
                >
                <el-table-column
                    prop="question"
                    label="题目"
                    width="250">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="类型"
                    width="250">
                </el-table-column>
                <el-table-column
                    prop="chapter"
                    label="章节"
                    width="250">
                </el-table-column>
                <el-table-column
                    prop="knowledge"
                    label="知识点"
                    width="250">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="180">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="toChange(scope.row)">修改</el-button>
                        <el-button link type="primary" size="small" @click="toDelete(scope.row)">删除</el-button>
                    </template>
                 </el-table-column>
            </el-table>
        </div>
        <DeleteQuestion id="delete" :question="nowQuestion" :knowledge="nowKnowledge" :questionID="this.nowID" :teacherId="this.teacherID"/>
        <ChangeQuestion id="change" ref="changeChild" :questionID="this.nowID" :teacherId="this.teacherID" :courseId="this.courseID"/>
        <AddQuestion id="add" :courseID="this.courseID" :teacherID="this.teacherID"/>
    </div>
</template>

<script>
import DeleteQuestion from './DeleteQuestion.vue';
import ChangeQuestion from './ChangeQuestion.vue';
import AddQuestion from './AddQuestion.vue';
import axios from 'axios';
import store from '@/store';

const debounce = (fn, delay) => {

let timer = null;

return function () {

  let context = this;

  let args = arguments;

  clearTimeout(timer);

  timer = setTimeout(function () {

    fn.apply(context, args);

  }, delay);

}

}

const _ResizeObserver = window.ResizeObserver;

window.ResizeObserver = class ResizeObserver extends _ResizeObserver {

constructor(callback) {

  callback = debounce(callback, 16);

  super(callback);

}
}

export default {
    name: 'ShowQuestions',
    components: {
        DeleteQuestion,
        ChangeQuestion,
        AddQuestion
    },
    // props: {
    //     teacherID: String,
    //     courseID:String
    // },
    data() {
      return {
        teacherID: store.state.user.userId,
        courseID: store.state.course.courseId,
        isLoading: true,
        tableData: [],
        questionKey: '',
        scope: '',
        nowQuestion: '',
        nowKnowledge: '',
        nowID: '',
        nowAnswer: ''
      }
    },
    mounted() {
        this.makeTable();
    },
    methods: {
        resetData() {
            this.nowQuestion = '';
            this.nowKnowledge = '';
            this.nowID = '';
            this.nowAnswer = '';
        },
        //打开删除弹窗
        toDelete(row) {
            this.nowID = row.questionID;
            this.nowQuestion = row.question;
            this.nowKnowledge = row.knowledge;
            this.nowAnswer = row.answer;
            let deleteID = document.getElementById('delete');
            deleteID.style.display = 'block'
        },
        //关闭删除弹窗
        closeDelete() {
            let deleteID = document.getElementById('delete');
            deleteID.style.display = 'none';
            this.resetData();
        },//打开修改弹窗
        toChange(row) {
            this.nowID = row.questionID;
            this.nowQuestion = row.question;
            this.nowKnowledge = row.knowledge;
            this.nowAnswer = row.answer;
            console.log(row);
            this.$refs.changeChild.setData(row.questionID);
            let changeID = document.getElementById('change');
            changeID.style.display = 'block';
        },
        //关闭修改弹窗
        closeChange() {
            let changeID = document.getElementById('change');
            changeID.style.display = 'none'
        },
        //打开添加弹窗
        toAdd() {
            let addID = document.getElementById('add');
            addID.style.display = 'block';
        },
        //关闭添加弹窗
        closeAdd() {
            let addID = document.getElementById('add');
            addID.style.display = 'none';
        },
        search(){
            this.makeTable();
        },
        //加载/搜索题库表格
        makeTable() {
            // alert('重置表格')
            this.isLoading = true
            var theData = {
                courseID: this.courseID,
                questionKey: this.questionKey
            }
            axios.defaults.headers.post["Content-type"] = "application/json";
            axios
                .post("http://43.138.136.200:8090/teacher/selectQuestionList",JSON.stringify(theData))
                .then(
                    (res) => {
                        this.isLoading = false
                        if(this.questionKey != '') {
                            alert(res.data.prompt)
                        }
                        if(res.data.requestCode == '22_01'){
                            console.log('题库加载成功');
                            this.tableData = res.data.list,
                            this.questionKey = ''
                        }else if(res.data.requestCode == '22_00'){
                            console.log(res.data.prompt)
                            console.log('题库加载失败');
                        }
                    },
                    (error) => {
                        console.log('请求错误')
                    }
                )
        }
    }
}
</script>

<style>
    .showQuestions {
        margin-top: 1.4%;
        background-color: white;
        width: 80%;
        height: 80%;
        border: 1px solid #ccc;
        border-radius: 8px;  
    }
    .showQuestions .operateArea {
        position: relative;
        padding: 10px;
        left: 10px;
    }
    .showQuestions .questionsArea {
        position: relative;
        padding: 10px;
        left: 10px;
    }
    .showQuestions #delete {
        z-index:999;
        position: relative;
        bottom: 590px;
        display: none;
    }
    .showQuestions #change {
        z-index:999;
        position: relative;
        bottom: 590px;
        display: none;
    }
    .showQuestions #add {
        z-index:999;
        position: relative;
        bottom: 590px;
        /* transform: translate(0,-50%); */
        display: none;
    }
</style>