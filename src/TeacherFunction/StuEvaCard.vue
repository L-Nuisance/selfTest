<template>
    <div class="stuEvaCard">    
        <div class="showKno">
            <span class="kno">{{ knowledge }}</span>
        </div>
        <el-divider class="hrF" direction="vertical" />
        <div class="showOverall">
            <span class="overall">评价：{{ overall }}</span>
        </div>
        <el-divider class="hrS" direction="vertical" />
        <div class="showScore">
            <span class="score">{{ score }}分</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StuEvaCard',
    props: {
        knowledge: String,
        overall: String,
        score: Number
    }
}
</script>

<style scoped>
    .stuEvaCard {
        background-color: rgb(241, 238, 238);
        border: 1px solid #ccc;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 80%;
        height: 50px;
    }
    .stuEvaCard div {
        height: 50px;
        display: grid;
        place-items: center; /* 居中元素 */
        overflow: auto;
    }
    .stuEvaCard .el-divider{
        height: 100%;
    }
    .stuEvaCard .showKno  {
        /* background-color: red; */
        width: 40%;
        font-size: 20px;
        position: relative;
        left: 4%;
    }
    .stuEvaCard .hrF {
        position: relative;
        left: 48%;
        bottom: 100%;
    }
    .stuEvaCard .showOverall {
        /* background-color: aqua; */
        height: 100%;
        width: 20%;
        position: relative;
        bottom: 200%;
        left: 52%;
        font-size: 20px;
    }
    .stuEvaCard .hrS {
        position: relative;
        left: 73%;
        bottom: 300%;
    }
    .stuEvaCard .showScore {
        /* background-color: rebeccapurple; */
        width: 20%;
        position: relative;
        bottom: 400%;
        left: 77%;
        font-size: 20px;
    }
    ::-webkit-scrollbar {
        display: none;
    }
</style>