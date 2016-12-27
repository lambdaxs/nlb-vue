<template>
    <div class="custom">
        <navi title="客服帮助" back="true"></navi>

        <img :src="headImage" style="width:100%;">
        <list :items="items"></list>
        <div id="bottomView"></div>
    </div>
</template>

<script>

    import navi from '../navigator.vue'
    import list from '../public/baseList.vue'

    let headImage = require('assets/find/helpList.png')

    export default {
        data(){
            return {
                headImage,
                items:[{
                    title:'登录注册篇',
                    path:{name:'customDetail',query:{type:0,title:'登录注册篇'}}
                },{
                    title:'开卡绑卡篇',
                    path:{name:'customDetail',query:{type:1,title:'开卡绑卡篇'}}
                },{
                    title:'充值篇',
                    path:{name:'customDetail',query:{type:2,title:'充值篇'}}
                },{
                    title:'投资收益篇',
                    path:{name:'customDetail',query:{type:3,title:'投资收益篇'}}
                },{
                    title:'提现和推广奖励篇',
                    path:{name:'customDetail',query:{type:4,title:'提现和推广奖励篇'}}
                },]
            }
        },
        components:{
            navi,
            list,
        }
    }
</script>
