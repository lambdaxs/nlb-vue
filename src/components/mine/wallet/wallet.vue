<template>
    <div>
        <navi title="我的钱包" back="true"></navi>

        <div class="wallet-bg">
            <p>账户余额(元)</p>
            <h1 id="walletNum">{{num}}</h1>
        </div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media">
                <router-link :to="router.recharge" class="mui-navigate-right">
                    <img class="mui-pull-left nlb-cell-image" :src="rechargeIcon">
                    <div class="mui-media-body cellTitle">
                        充值
                    </div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media">
                <router-link :to="router.withdraw" class="mui-navigate-right">
                    <img class="mui-pull-left nlb-cell-image" :src="withdrawIcon">
                    <div class="mui-media-body cellTitle">
                        提现
                    </div>
                </router-link>
            </li>
        </ul>

        <h5 class="mui-content-padded"></h5>

        <div class="view-page">
            <div id="segmentedControl" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-primary">
                <a class="mui-control-item mui-active" href="#recharge">充值明细</a>
                <a class="mui-control-item" href="#withdraw">提现明细</a>
            </div>
        </div>

        <div id="progress" class="mui-spinner mui-spinner-custom" v-show="isLoading"></div>

        <div id="recharge" class="mui-control-content mui-active">
            <detailList :items="rechargeList" type="充值"></detailList>
        </div>

        <div id="withdraw" class="mui-control-content">
            <detailList :items="withdrawList" type="提现"></detailList>
        </div>

    </div>
</template>

<script>
    import navi from 'components/navigator.vue'
    import detailList from './detailList.vue'

    import userApi from 'apis/userApi'

    export default {
        data(){
          return {
              rechargeIcon:require('assets/mine/wallet/withdrawals.png'),
              withdrawIcon:require('assets/mine/wallet/recharge.png'),
              isLoading:true,
              num:0,
              rechargeList:[],
              withdrawList:[],
              router:{
                  recharge:{
                      name:'walletRecharge'
                  },
                  withdraw:{
                      name:'walletWithdraw'
                  }
              }
          }
        },
        mounted(){

        },
        activated(){
            this.fetchData()
        },
        methods:{
            fetchData(){
                userApi.getWalletInfoList()
                        .then(rs=>{
                            this.rechargeList = rs.list
                            this.withdrawList = rs.applyList
                            this.num = parseInt(rs.userinfo.capital)
                            this.isLoading = false
                        },err=>{
                            mui('数据加载失败'+err)
                            this.isLoading = false
                        })
            }
        },
        components:{
            navi,
            detailList
        }
    }
</script>

<style scoped>
    .wallet-bg {
        padding: 20px 10px;
        background-color: #08af6a;
        color: #fff;
    }

    .wallet-bg p {
        color: #fff
    }

    .wallet-bg h1 {
        font-size: 40px;
        font-weight: 400;
    }

    .view-page {
        padding: 10px 10px 0 10px;
        background-color: #fff;
    }

    .nlb-cell-image {
        width: 26px;
        height: 26px;
        margin-right: 5px;
        margin-top: -1px;
    }
    .cellTitle {
        text-align: left;
    }

    #progress {
        margin-top: 50px;
    }
</style>