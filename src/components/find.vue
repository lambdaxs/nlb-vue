<template>
    <div id="tree">
        <navi title="发现"></navi>

        <h5 class="mui-content-padded"></h5>
        <findTopItem :items="findTopItems"></findTopItem>

        <h5 class="mui-content-padded"></h5>
        <findItem :items="findItems"></findItem>
    </div>
</template>

<script>
    import navi from './navigator.vue'
    import findTopItem from './find/findTopItem.vue'
    import findItem from './find/findItem.vue'


    let topIcons = [require('../assets/find/find-kf.png'),require('../assets/find/find-js.png')]

    let icons = [
        require('../assets/find/find-xs.png'),
        require('../assets/find/find-bz.png'),
        require('../assets/find/find-gsjs.png'),
        require('../assets/find/find-news.png'),
        require('../assets/find/find-zs.png')]


    export default {
        data(){
            return {
                findTopItems:[{
                   title:'客服帮助',
                    path:{name:'custom'},
                    image:topIcons[0]
                },{
                    title:'投资介绍',
                    path:{name:'findImage',query:{hid:1}},
                    image:topIcons[1]
                }],
                findItems:[{
                    title : "新手指南",
                    path : {name:'customDetail',query:{type:10,title:'新手指南'}},
                    image : icons[0]
                }, {
                    title : "风险保障",
                    path : {name:'findImage',query:{hid:3}},
                    image : icons[1]
                }, {
                    title : "公司介绍",
                    path : {name:'findImage',query:{hid:4}},
                    image : icons[2]
                }, {
                    title : "公司新闻",
                    path : {name:'findKnowledge',query:{type:0}},
                    image : icons[3]
                }, {
                    title : "众筹知识",
                    path : {name:'findKnowledge',query:{type:1}},
                    image : icons[4]
                } ]
            }
        },
        components:{
            navi,
            findTopItem,
            findItem
        }
    }
</script>

<style scoped>

</style>
