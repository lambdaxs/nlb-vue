<template>
    <div>
        <navi title="我的客服" back="true"></navi>
        <listView :items="items"></listView>

        <ul class="mui-table-view mui-grid-view bottom-view">
            <li v-for="item in bottomItems" class="mui-table-view-cell mui-media mui-col-xs-6">
                <a :href="item.path" class="mui-text-center">
                    <img class="mui-media-object mui-pull-left" :src="item.image" />
                    <span class="mui-pull-left">{{item.title}}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    import navi from 'components/navigator.vue'
    import listView from 'components/public/baseList.vue'

    export default {
        data(){
            return {
                items:[{
                    image:require('assets/mine/custom/kf.png'),
                    title:'客服: 一号客服(小美)',
                    path:'#'
                },{
                    image:require('assets/mine/custom/call_01.png'),
                    title:'电话: 400-808-1618',
                    path:'#'
                },{
                    image:require('assets/mine/custom/phone.png'),
                    title:'手机: 13522745650',
                    path:'#'
                },{
                    image:require('assets/mine/custom/qq.png'),
                    title:'QQ: 412958964',
                    path:'#'
                },{
                    image:require('assets/mine/custom/wechat.png'),
                    title:'微信: coco724',
                    path:'#'
                }],
                bottomItems:[{
                    image:require('assets/mine/custom/call_01.png'),
                    title:'拨打电话',
                    path:'tel:4008081618'
                },{
                    image:require('assets/mine/custom/phone.png'),
                    title:'拨打手机',
                    path:'tel:13522745650'
                }]
            }
        },
        components:{
            navi,
            listView
        }
    }
</script>

<style scoped>
    .bottom-view {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }
    .bottom-view img {
        width: 28px !important;
        height: 28px!important;
    }
    .bottom-view span {
        line-height: 28px;
    }
</style>