<template>
    <div>
        <navi title="订单详情" back="true"></navi>
        <div>
            <div class="header">订单金额:{{form.total}}元</div>

            <!--订单详情-->
            <listView :items="items"></listView>

            <!--支付方式-->
            <listView id="pay_type" :items="payItems" tableviewStyle="mui-table-view-radio"></listView>

            <button @click="payAction" class="mui-btn mui-btn-primary bottom-btn" data-loading-icon="mui-spinner mui-spinner-custom" :disabled="loadData">立即支付</button>
            <router-link tag="button" :to="{name:'walletRecharge'}" class="mui-btn mui-btn-danger bottom-btn">余额不足?去充值</router-link>

            <!--弹出支付步骤-->
            <div id="mask" class="mui-backdrop" v-if="showOrder">
                <div class="mask-content">
                    <h4>众智赢佳公司帐户信息<i @click="maskCloseAction" class="mui-icon mui-icon-close close-mask"></i></h4>
                    <div v-for="item in orderInfo" class="mui-table-view-cell">
                        <div>{{item}}</div>
                    </div>
                    <div class="mui-table-view-cell">
                        <div>线下支付流程：</div>
                        <div class="mui-text-center red">1.对公司账户打款</div>
                        <div class="mui-text-center"><img width="35" :src="arrowIcon"></div>
                        <div class="mui-text-center red" >2.拨打客服电话确认订单号</div>
                        <div class="mui-text-center"><img width="35" :src="arrowIcon"></div>
                        <div class="mui-text-center red">3.完成支付</div>
                    </div>
                    <div class="mui-text-center">
                        <button @click="confirmAction" class="mui-btn mui-btn-primary bottom-btn" data-loading-icon="mui-spinner mui-spinner-custom">确认支付</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import navi from 'components/navigator.vue'
    import listView from 'components/public/baseList.vue'
    import homeApi from 'apis/homeApi'

    export default {
        data(){
            return {
                form:{
                    total:'8800',
                    name:'安徽淮南2万亩林场',
                    time:'5年半',
                    nums:'1亩',
                    income:'138元'
                },
                loadData:true,
                showOrder:false,//是否弹出待支付界面
                arrowIcon:require('assets/mine/wallet/arrow.png'),
                payItems:[{
                    title:'线下支付',
                    image:require('assets/mine/wallet/pay_nlb.png'),
                    path:'#',
                    style:'mui-selected'
                },{
                    title:'余额支付',
                    image:require('assets/mine/wallet/ye.png'),
                    path:'#'
                },{
                    title:'微信支付(敬请期待)',
                    image:require('assets/mine/wallet/pay_wx.png'),
                    path:'#'
                },{
                    title:'支付宝支付(敬请期待)',
                    image:require('assets/mine/wallet/pay_alipay.png'),
                    path:'#'
                },{
                    title:'京东支付(敬请期待)',
                    image:require('assets/mine/wallet/pay_jd.png'),
                    path:'#'
                },{
                    title:'银行卡支付(敬请期待)',
                    image:require('assets/mine/mine-card.png'),
                    path:'#'
                }],
                orderInfo:['公司名称: 北京众智赢佳科技有限公司','开户银行: 广发银行股份有限公司北京潘家园支行','银行帐号: 9550880202962300165','客服电话: 4008081618','客服QQ: 372150575']
            }
        },
        mounted(){
            //阻止其他支付方式被选中
            mui('.mui-table-view').on('tap','.mui-table-view-cell',function(){
                let title = this.getElementsByClassName('cellTitle')[0].innerHTML.trim()
                if (title.startsWith('线下') || title.startsWith('余额')){
                    return true
                }else {
                    mui.toast('敬请期待')
                    return false
                }
            })
        },
        activated(){
            let {id,number,order_id} = this.$route.query
            let ratio = number > 10?0.1999:0.1888
            this.form.total = number*8800
            this.form.nums = `${number}亩`
            this.form.income = `${(number*8800*ratio/12).toFixed(2)}元`
            this.fetchData(id)
        },
        computed:{
            items(){//订单详情
                let {name,time,nums,income} = this.form
                let list = [name,time,nums,income]
                return ['林场名称:','育林周期:','育林数量:','预计每月收益:'].map((item,index)=>{
                    let obj = {}
                    obj.title = item + list[index]
                    obj.path = '#'
                    obj.notShowRight = true
                    return obj
                })
            }
        },
        methods:{
            payAction(){
                let title = document.querySelector('#pay_type .mui-selected .cellTitle').innerHTML.trim()
                let {forest_id,number,order_id} = this.$route.query

                if (title.startsWith('线下支付')){//弹出支付步骤
                    this.showOrder = true
                }else if (title.startsWith('余额支付')){//直接用余额支付
                    let pay_channel = '余额支付'
                    this.postData({forest_id,number,order_id,pay_channel})
                }

            },
            postData(params){//发送支付请求
                let btn = mui('.bottom-btn')
                btn.button('loading')
                homeApi.saveOrder(params)
                        .then(rs=>{
                            mui.toast('支付成功')
                            btn.button('reset')
                            this.$router.replace({name:'home'})
                        },err=>{
                            mui.toast('支付失败')
                            console.log(err)
                            btn.button('reset')
                        })
            },
            confirmAction(){//点击确认支付
                mui.confirm('是否已经转账并联系过客服?','请确认',['是','否'],(value)=>{
                    if (value.index == 1){//点击否
                        return
                    }else {
                        let {forest_id,number,order_id} = this.$route.query
                        let pay_channel = '线下支付'
                        this.postData({forest_id,number,order_id,pay_channel})
                    }
                })
            },
            maskCloseAction(){//关闭支付界面
                this.showOrder = false
            },
            fetchData(id){//获取账户余额
                homeApi.getTreeDetail(id)
                        .then(rs=>{
                            this.loadData = false

                            let [,data,userinfo] = rs
                            this.form.name = data.areaName
                            let capital = userinfo.capital
                            this.payItems[1].title = `余额支付 (可用余额${capital})`

                        },err=>{
                            this.loadData = false
                            console.log(err)
                        })
            }
        },
        components:{
            navi,
            listView
        }
    }
</script>

<style scoped>
    .bottom-btn {
        margin: 0 auto;
        margin-top: 8px;
        margin-bottom: 8px;
        width: 90%;
        height: 44px;
    }
    .mask-content {
        position: relative;
        width: 90%;
        height: 90%;
        margin: 10% auto 0;
        background-color: #fff;
        overflow: scroll;
    }

    .mask-content h4 {
        position: relative;
        text-align: center;
        padding: 10px;
        /*color: #37A061;*/
    }
    .mask-content .mui-table-view-cell {
        font-size: 14px;
        text-align: left;
    }

    .mask-content .red {
        font-weight: bold;
        color:blue;
    }
</style>