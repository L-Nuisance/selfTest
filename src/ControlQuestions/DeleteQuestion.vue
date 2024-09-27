<template>
    <div class="deleteQuestion">
        <span class="title">{{ now }}</span>
        <button type="button" id="back-button" @click="close(false)">返回</button>
        <div class="questionStem">
            <span>题目内容：</span>
            <p>{{ question }}</p>
        </div>
        <span>有关知识点：</span>
        <div class="knowledge">
            <p>{{ knowledge }}</p>
        </div>
        <button type="button" id="delete-button" @click="showWarning()">删除</button>
        <div id="warning">
            <strong>确定删除该题目？</strong>
            <button type="button" id="ok" @click="sendDelete()">确定删除</button>
            <button type="button" id="cancel" @click="hideWarning()">取消</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'DeleteQuestion',
    props: {
        question: String,
        knowledge: String,
        questionID: String,
        teacherId: String
    },
    data() {
        return {
            now: '删除题目',
        }
    },
    methods: {
        showWarning() {
            let warningID = document.getElementById('warning')
            warningID.style.display = 'block'
        },
        hideWarning() {
            let warningID = document.getElementById('warning')
            warningID.style.display = 'none'
        },
        close(isDone) {
            this.$parent.closeDelete();
            if(isDone) {
                this.$parent.makeTable()
            }
        },
        sendDelete() {
            let deleteData = {
                teacherId: this.teacherId,
                questionId: this.questionID
            }
            axios.defaults.headers.post["Content-type"] = "application/json";
            axios
                .post("http://43.138.136.200:8090/teacher/deleteQuestion", JSON.stringify(deleteData))
                .then (
                    (success) => {
                        if(success.data.requestCode == '17_01'){
                            alert('题目删除完成')
                            setTimeout(() => {
                                this.close(true);
                            }, 0); 
                        }
                        else{
                            alert('题目删除失败')
                            this.close(true)
                        }
                    },
                    (error) => {
                        alert('请求失败')
                        this.close(true)
                    }
            )
            this.hideWarning();
        }
    }
}
</script>

<style>
    .deleteQuestion {
        margin: 0;
        padding: 0;
        width: 1150px;
        height: 600px;
        background-color: white;
        /* border: solid;  */
        /* border-width: 1px;  */
        box-shadow: 0 0 0 1px #cccccc ;
    }
    .deleteQuestion .title {
        margin: 0;
        padding: 0;
        position: relative;
        left: 10px;
        font-size: 25px;
    }
    .deleteQuestion button {
        margin: 0;
        padding: 0;
        background-color: #5B86E5;
        color: #fff;
        cursor: pointer;
        border: none;
        border-radius: 15px;
        position: relative;
        left: -75px;
        top: 75px;
    }
    .deleteQuestion button:hover {
        background-color: #4C6EB8;
    }
    .deleteQuestion #back-button {
        width: 125px;
        height: 50px;
        font-size: 17.5px;
        position: relative;
        left: 90%;
        top: 7.5%;
        transform: translate(-100%,-50%);
    }
    .deleteQuestion #delete-button {
        height: 40px;
        width: 100px;
        border-radius: 5px;
        position: relative;
        left: 50%;
        top: 20px;
        transform: translate(-50%,0%);
    }
    .deleteQuestion span {
        margin: 0;
        padding: 0;
        position: relative;
        left: 10px;
    }
    .deleteQuestion p {
        margin: 0;
        padding: 0;
        width: 850px;
        background-color: #cccccc;
        position: relative;
        left: 50%;
        transform: translate(-50%,0%);
    }
    .deleteQuestion .questionStem p {
        height: 200px;
    }
    .deleteQuestion .knowledge p {
        height: 100px;
    }
    .deleteQuestion #warning {
        box-shadow: 0 0 0 1px #cccccc ;
        height: 120px;
        width: 250px;
        border-radius: 5px;
        position: relative;
        left: 50%;
        top: -75%;
        transform: translate(-50%,75%);
        background-color: white;
        display: none;
    }
    .deleteQuestion #warning strong {
        margin: 0;
        padding: 0;
        position: relative;
        left: 60px;
        top: 25px;
        font-size: 20px;
        color: red;
    }
    .deleteQuestion #warning button {
        width: 80px;
        height: 35px;
        border-radius: 5px;
    }
    .deleteQuestion #warning #ok {
        position: relative;
        left: -120px;
    }
    .deleteQuestion #warning #cancel {
        position: relative;
        left: 140px;
        top: 40px;
    }
</style>