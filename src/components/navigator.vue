<template>
    <header class="mui-bar mui-bar-nav" id="titleView">
        <div  v-if="back"  class="mui-icon mui-icon-left-nav mui-pull-left" @click="pop"></div>
        <h1 class="mui-title">{{title}}</h1>
        <div  v-if="right"  class="mui-icon mui-pull-right" @click="rightTap">{{rightTtitle}}</div>
    </header>
</template>


<script>

    export default {
        props:['title','back','right','rightTitle','rightCall'],
        methods:{
            pop(){
                this.$router.back()
            },
            rightTap(){
                if (this.rightCall){
                    this.rightCall()
                }
            }
        }
    }
</script>

<style scoped>

    .mui-icon-left-nav {
        color: #007aff;
    }

</style>