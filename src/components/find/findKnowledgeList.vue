<template>
    <div>
        <navi :title="title" back="true"></navi>
        <findItem :items="items"></findItem>
    </div>
</template>

<script>
    import navi from '../navigator.vue'
    import findItem from '../find/findItem.vue'

    let icon = require('assets/find/find-news.png')

    export default {
        data(){
            return {
                title:'',
                items:[]
            }
        },
        mounted(){

        },
        activated(){
            this.items = []

            let type = this.$route.query.type
            if (type == 0){//公司新闻
                this.title = '公司新闻'
                this.fetchData('http://ad.91nlb.com/v1/help/getNewsList')
            }else {//众筹知识
                this.title = '众筹知识'
                this.fetchData('http://ad.91nlb.com/v1/help/getknowledgeList')
            }
        },
        methods:{
            fetchData(url){
                this.$http.get(url)
                        .then(rs=>rs.json())
                        .then(rs=>{
                            this.items = rs.list.map(v=>{
                                let item = {}
                                item.image = icon
                                item.title = v.title
                                item.path = {name:'findImage',query:{hid:v.href.split('=')[1]}}
                                return item
                            })
                        })
                        .catch(err=>{
                            console.log(err)
                        })
            }
        },
        components:{
            navi,
            findItem
        }
    }
</script>
