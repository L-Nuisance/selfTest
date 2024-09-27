<template>
    <div class="singleEvaCard">
        <h3>{{ knowledge }}</h3>
        <h4 class="accuracy">知识点正确率：</h4>
        <el-progress class="accuracy" :percentage="accuracy"/>
        <h4 class="evaluate">关于该知识点：</h4>
        <p class="evaluate">{{ evaluate }}</p>
    </div>
</template>

<script>
export default {
    name: 'SingleEvaCard',
    props: {
        knowledge: String,
        accuracy: Number,
        evaluate: String
    }
}
</script>

<style scoped>
    .singleEvaCard {
        width: 100%;
        height: auto;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .singleEvaCard h3 {
        font-weight: 700;
        font-size: 25px;
        margin: 2% 2%;
    }
    .singleEvaCard .accuracy {
        margin: 1% 2%;
    }
    .singleEvaCard .evaluate {
        margin: 1% 2%;
    }
    .singleEvaCard h4 {
        font-weight: 650;
    }
</style>