<template>
    <div class="custom-detail">
        <navi :title="title" back="true"></navi>

        <img :src="headImage" class="head-image">
        <list :items="items"></list>

    </div>
</template>

<script>

    import navi from '../navigator.vue'
    import list from '../public/extendList.vue'

    let headImage = require('assets/find/helpDetail.jpg')
    let detailInfo = require('./customDetail.json')

    export default {
        data(){
            return {
                headImage,
                title:'',
                items:[]
            }
        },
        mounted(){

        },
        activated(){
            let {type=0,title} = this.$route.query

            if (title == '新手指南'){
                this.items = detailInfo[detailInfo.length-1]
            }else {
                this.items = detailInfo[type]
            }
            this.title = title
        },
        components:{
            navi,
            list,
        }
    }
</script>

<style scoped>
    .head-image {
        width:100%;
    }
</style>

