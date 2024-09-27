<template>
    <div class="addQuestion">
        <span class="title">{{ now }}</span>
        <button type="button" id="back-button" @click="close(false)">返回</button>
        <div class="selectType">
            <span class="type">选择题目类型：</span>
            <button type="button" class="type" id="create-select" @click="toSelectQuestion()">选择题</button>
            <button type="button" class="type" id="create-input" @click="toInputQuestion()">填空题</button>
            <span class="file">或选择：</span>
            <button type="button" class="file" id="get-file" @click="toGetFile()">上传文件</button>
        </div>
        <component ref="sendChild" :courseID="courseID" :teacherId="this.teacherID" :is="tabComponent" class="operatingSpace"/>
    </div>
</template>

<script>
import InputQuestion from './GetQuestion/InputQuestion.vue';
import SelectQuestion from './GetQuestion/SelectQuestion.vue';
import GetFile from './GetQuestion/GetFile.vue';

export default {
    name:'AddQuestion',
    props: {
        courseID: String,
        teacherID: String
    },
    components: {
        InputQuestion,
        SelectQuestion,
        GetFile
    },
    data() {
        return {
            tabComponent:'SelectQuestion',
            now: '添加题目'
        }
    },
    methods: {
        toSelectQuestion() {
            let selectID = document.getElementById('create-select');
            let fileID = document.getElementById('get-file');
            let inputID = document.getElementById('create-input');
            this.tabComponent = 'SelectQuestion';
            selectID.style.backgroundColor = '#CCCCCC';
            inputID.style.backgroundColor = '#FFFFFF';
            fileID.style.backgroundColor = '#FFFFFF';
        },
        toInputQuestion() {
            let selectID = document.getElementById('create-select');
            let fileID = document.getElementById('get-file');
            let inputID = document.getElementById('create-input');
            this.tabComponent = 'InputQuestion';
            selectID.style.backgroundColor = '#FFFFFF';
            inputID.style.backgroundColor = '#CCCCCC';
            fileID.style.backgroundColor = '#FFFFFF';
        },
        toGetFile() {
            let selectID = document.getElementById('create-select');
            let fileID = document.getElementById('get-file');
            let inputID = document.getElementById('create-input');
            this.tabComponent = 'GetFile';
            selectID.style.backgroundColor = '#FFFFFF';
            inputID.style.backgroundColor = '#FFFFFF';
            fileID.style.backgroundColor = '#CCCCCC';
        },
        close(isDone) {
            this.toSelectQuestion();
            this.$parent.closeAdd();
            if(isDone) {
                console.log('sad')
                this.$parent.makeTable()
            }
        }
    }
}
</script>

<style>
    .addQuestion {
        margin: 0;
        padding: 0;
        width: 1150px;
        height: 600px;
        background-color: white;
        /* border: solid;
        border-width: 1px; */
        box-shadow: 0 0 0 1px #cccccc ;
    }
    .addQuestion .title {
        margin: 0;
        padding: 0;
        position: relative;
        left: 10px;
        font-size: 25px;
    }
    .addQuestion #back-button {
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
        top: 7.5%;
        transform: translate(-100%,-50%);
    }
    .addQuestion #back-button:hover {
        background-color: #4C6EB8;
        cursor: pointer;
    }
    .addQuestion .selectType {
        margin: 0;
        padding: 0;
        position: relative;
        left: 5%;
    }
    .addQuestion .selectType button {
        margin: 10px;
        padding: 0;
        border: 0;
        box-shadow: 0px 0px 0 1px #cccccc;
        border-radius: 5px;
        width: 80px;
        height: 25px;
        background-color: #ffffff;
    }
    .addQuestion .selectType #create-select {
        background-color: #CCCCCC;
    }
    .addQuestion .selectType button:hover {
        cursor: pointer;
    }
    .addQuestion .selectType #select {
        background-color: #CCCCCC;
    }
    .addQuestion .selectType span {
        margin: 0;
        padding: 0;
        font-size: 15px;
    }
    .addQuestion .selectType .file {
        margin: 0;
        padding: 0;
        position: relative;
        left: 25%;
    }
    .addQuestion .operatingSpace {
        margin: 0;
        padding: 0;
        width: 900px;
        height: 385px;
        /* background-color: rebeccapurple; */
    }
</style>