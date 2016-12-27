<template>
    <div>
        <navi title="交易记录" back="true"></navi>

        <div class="view-page">
            <div id="segmentedControl" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-primary">
                <a class="mui-control-item mui-active" href="#touzi">投资明细</a>
                <a class="mui-control-item" href="#huigou">回购明细</a>
                <a class="mui-control-item" href="#fenhong">分红明细</a>
            </div>
        </div>

        <div id="progress" class="mui-spinner mui-spinner-custom" v-show="isLoading"></div>

        <!--投资-->
        <div id="touzi" class="mui-control-content mui-active">
            <p v-if="investment.orders.length==0" class="no-data">暂无数据</p>
            <orderItem :orders="investment.orders" :keys="investment.keys" :titles="investment.titles"></orderItem>
        </div>

        <!--回购-->
        <div id="huigou" class="mui-control-content">
            <p v-show="buybackDetail.length==0" class="no-data">暂无数据</p>
            <orderItem :orders="buybackDetail"></orderItem>
        </div>

        <!--分红-->
        <div id="fenhong" class="mui-control-content">
            <div class="mui-row fen-hong">
                <div class="mui-col-sm-6 mui-col-xs-6">
                    <div class="title">已分红次数</div>
                    <div class="num">{{distribute.nums}}</div>
                    <div class="nlb-border-right"></div>
                </div>
                <div class="mui-col-sm-6 mui-col-xs-6">
                    <div class="title">已分红总金额(元)</div>
                    <div class="num">{{distribute.total}}</div>
                </div>
            </div>
            <p v-if="distribute.orders.length==0" class="no-data">暂无数据</p>
            <orderItem :orders="distribute.orders" :keys="distribute.keys" :titles="distribute.titles"></orderItem>
        </div>

    </div>
</template>

<script>
    import navi from 'components/navigator.vue'
    import userApi from 'apis/userApi'
    import orderItem from './orderItem.vue'

    //回购明细


    export default {
        data(){
          return {
              isLoading:true,
              investment:{//投资明细
                  orders:[],
                  keys:['money','number','term','gains','startTime','endTime','status_text'],
                  titles:['购买金额:','购买数量:','期限:','预计每年收益:','购买时间:','购买到期时间:','状态']
              },
              distribute:{
                  orders:[],
                  keys:['order_id','base_title','gain_fee','return_dateline'],
                  titles:['订单号：','林场基地名称：','分红金额：','分红时间：'],
                  nums:0,//已分红次数
                  total:0,//已分红总额
              },
              buybackDetail:[],//回购明细
          }
        },
        mounted(){

        },
        activated(){
            this.fetchData()
        },
        methods:{
          fetchData(){
            userApi.getOrderRelative()
                    .then(rs=>{
                        this.isLoading = false
                        this.investment.orders = rs.investmentDetail || []
                        this.distribute.orders = rs.distributeDetail || []
                        this.distribute.nums = rs.distributeNums
                        this.distribute.total = rs.distributeTotal
                    },err=>{
                        console.log(err)
                        this.isLoading = false
                    })
          }
        },
        components:{
            navi,
            orderItem
        }
    }
</script>

<style scoped>
    .view-page {
        background-color: #fff;
    }
    .no-data{
        margin-top: 8px;
    }
    .fen-hong {
        margin: 0 auto;
        margin-top: 8px;
        margin-bottom: 8px;
        width: 90%;
        background-color: #007aff;
        color: #fff;
        border-radius: 5px;
        padding: 5px;
    }
    .nlb-border-right {
        height: 34px;
        width: 1px;
        background-color: #fff;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -17px;
        opacity: 0.6;
    }
</style>