<template>
    <h5 :class="{'mui-text-center':center,'mui-text-left':left}" class="mui-content-padded nlb-v-align">
        <div v-if="left" class="line"></div>
        <span v-if="image"><img :src="image" class="nlb-icon-image"/></span>
        {{title}}
    </h5>
</template>

<script>
    export default {
        props:['title','image','left','center']
    }
</script>

<style scoped>
    .nlb-icon-image {
        width: 16px;
        height: 16px;
    }
    .line {
        background-color: #007aff;
        width: 5px;
        height: 16px;
        float: left;
        margin-right: 8px;
    }
</style>