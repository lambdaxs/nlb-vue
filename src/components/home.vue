<template>
    <div class="home-container">

        <navi title="首页"></navi>

        <pull :onPull="update">
            <div>
                <banner :items="bannerItems"></banner>

                <div class="mui-card card-view">
                    <div class="mui-card-content">
                        <div class="mui-row">
                            <div v-for="item in cardItemOne" class="mui-col-sm-4 mui-col-xs-4">
                                <router-link :to="item.path">
                                    <img :src="item.image">
                                    <p>{{item.title}}</p>
                                </router-link>
                            </div>
                        </div>
                        <div class="mui-row">
                            <div v-for="item in cardItemTwo" class="mui-col-sm-4 mui-col-xs-4">
                                <router-link :to="item.path">
                                    <img :src="item.image">
                                    <p>{{item.title}}</p>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>

                <splitLine title="产品推荐" left="true"></splitLine>
                <homeItem :items="homeItems"></homeItem>

                <!--<splitLine title="账户资金由广发银行保管" :image="splitIcon"></splitLine>-->
                <!--<homeData :dataModel="saleData"></homeData>-->

            </div>
        </pull>
    </div>


</template>

<script>
    import navi from './navigator.vue'
    import pull from './public/pullUpdate.vue'
    import splitLine from './public/splitLine.vue'


    import banner from './public/banner.vue'
    import homeItem from './home/homeItem.vue'
    import homeData from './home/homeData.vue'

    import homeApi from '../apis/homeApi'

    let defaultImage = require('assets/banner/loading.png')

    export default {
        data () {
            return {
                bannerItems:[{
                    path:'#',
                    image:defaultImage,
                    loop:true
                },{
                    path:'#',
                    image:defaultImage,
                    loop:false
                },{
                    path:'#',
                    image:defaultImage,
                    loop:true
                }],
                homeItems:[{
                    areaName: "林场地区",
                    title: "销售",
                    ratio: "--",
                    ratioDesc: "预计年收益率",
                    desc: "地区描述",
                    path: "#"
                }],
                splitIcon:require('assets/home/promise.png'),
                saleData:{
                    title:'宝妹报数据',
                    moneyDesc:'累计众筹金额(元)',
                    moneyNum:'-',
                    userDesc:'众筹用户(人)',
                    userNum:'-',
                    desc:'风险提示：本平台数据非特别指出，为我司统计所得。'
                },
                cardItemOne:[{
                    title:'我的钱包',
                    image:require('assets/home/card/money.png'),
                    path:{name:'mineWallet'}
                },{
                    title:'我的林场',
                    image:require('assets/home/card/trees.png'),
                    path:{name:'mineTree'}
                },{
                    title:'我的会员',
                    image:require('assets/home/card/vip.png'),
                    path:{name:'mineMember'}
                }],
                cardItemTwo:[{
                    title:'林场相册',
                    image:require('assets/home/card/photos.png'),
                    path:{name:'detail'}
                },{
                    title:'平台资讯',
                    image:require('assets/home/card/news.png'),
                    path:{name:'findKnowledge',query:{type:0}}
                },{
                    title:'积分商城',
                    image:require('assets/home/card/city.png'),
                    path:{name:'detail'}
                }]
            }
        },
        mounted(){
            this.fetchData()
        },
        activated(){
            document.body.scrollTop = sessionStorage.getItem('homeViewHeight',document.body.scrollTop)||0
        },
        deactivated(){
            sessionStorage.setItem('homeViewHeight',document.body.scrollTop)
        },
        components:{
            navi,
            pull,
            splitLine,
            banner,
            homeItem,
            homeData
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
                return homeApi.getHomeList().then(rs=>{
                    this.bannerItems = rs.bannerItems
                    this.homeItems = rs.homeItems
                    this.saleData = rs.saleData
                },err=>{
                    throw err
                })
            }

        }
    }
</script>

<style scoped>
    .card-view img{
        margin-top: 3px;
        width: 35px;
        height: 35px;
    }
</style>