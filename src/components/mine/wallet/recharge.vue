<template>
    <div>
        <navi title="充值" back="true"></navi>
        <div class="recharge-num">
            <p>充值金额:</p>
            <input v-model="recharge_num" type="number" style="padding: 0" class="recharge-input" id='rechargeNum'  title="money"/>
        </div>
        <list :items="items" tableviewStyle="mui-table-view-radio"></list>
        <button @click="rechargeAction" class="mui-btn mui-btn-primary bottom-btn">立即充值</button>

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
                    <button @click="confirmAction" class="mui-btn mui-btn-primary bottom-btn" id="button-buy-offline">确认支付</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import navi from 'components/navigator.vue'
    import list from 'components/public/baseList.vue'
    import userApi from 'apis/userApi'


    export default {
        data(){
            return {
                arrowIcon:require('assets/mine/wallet/arrow.png'),
                showOrder:false,
                recharge_num:'',
                items:[{
                    title:'线下支付',
                    image:require('assets/mine/wallet/pay_nlb.png'),
                    path:'#',
                    style:'mui-selected'
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
                let title = this.getElementsByClassName('cellTitle')[0].innerHTML
                if (title.trim().startsWith('线下')){
                    return true
                }else {
                    mui.toast('敬请期待')
                    return false
                }
            })
        },
        methods:{
            //点击充值按钮
            rechargeAction(){
              if (!this.recharge_num || this.recharge_num == 0) {
                  mui.toast('请填写充值额度')
                  return
              }
              this.showOrder = true
          },
            //点击确认支付
            confirmAction(){
                mui.confirm('是否已经转账并联系过客服?','请确认',['是','否'],(value)=>{
                    if (value.index == 1){//点击否
                        return
                    }else {
                        let btn = mui('#button-buy-offline')
                        btn.button('loading')
                        userApi.walletRechargeAction(this.recharge_num)
                                .then(()=>{
                                    mui.toast('充值订单已提交,客服确认后即可到账(订单有效期24小时)',{
                                        duration:'long',
                                        type:'div'
                                    })
                                    btn.button('reset')
                                    this.$router.back()
                                },err=>{
                                    console.log(err)
                                })
                    }
                })
            },
            maskCloseAction(){
                this.showOrder = false
            }
        },
        components:{
            navi,
            list
        }
    }
</script>

<style scoped>
    .recharge-num {
        background-color: #fff;
        padding: 15px 10px;
    }

    .recharge-num p {
        font-size: 14px;
        text-align: left;
    }

    .recharge-num input {
        border: 0;
        font-size: 30px;
        border-bottom: 1px solid rgba(0,0,0,.2);
    }
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