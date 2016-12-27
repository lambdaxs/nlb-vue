<template>
    <div class="tree-container">
        <navi title="林场"></navi>

        <pull :onPull="update">
            <div class="mui-spinner mui-spinner-custom" v-show="isLoading"></div>
            <treeItem :items="treeItems"></treeItem>
        </pull>

    </div>
</template>

<script>
    import navi from './navigator.vue'
    import treeItem from './home/homeItem.vue'

    import pull from './public/pullUpdate.vue'

    import treeApi from '../apis/treeApi'

    export default {
        data(){
            return {
                isLoading:true,
                treeItems:[{
                    areaName: "林场地区",
                    title: "销售",
                    ratio: "--",
                    ratioDesc: "预计年收益率",
                    desc: "地区描述",
                    path: "#"
                }],
            }
        },
        mounted(){
            this.fetchData().then(()=>{
                //加载成功
            },err=>{
                console.log('treelist load err'+err)
            })
        },
        activated(){
            document.body.scrollTop = sessionStorage.getItem('treeHeight',document.body.scrollTop)||0
        },
        deactivated(){
            sessionStorage.setItem('treeHeight',document.body.scrollTop)
        },
        methods:{
            update(endUpdate){
                this.fetchData().then(()=>{
                    endUpdate('加载完成')
                },err=>{
                    endUpdate(`加载失败 ${err.message || err.statusText}`)
                })
            },
            fetchData(){
                return treeApi.getTreeList().then(rs=>{
                    this.treeItems = rs
                    this.isLoading = false
                },err=>{
                    this.isLoading = false
                    throw err
                })
            }
        },
        components:{
            navi,
            pull,
            treeItem
        }
    }
</script>
