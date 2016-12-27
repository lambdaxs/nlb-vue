<template>
    <div>
        <navi title="提现" back="true"></navi>

        <!--余额信息-->
        <h5 class="mui-content-padded"></h5>
        <ul class="mui-table-view mui-grid-view">
            <li v-for="(item,index) in titles" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <div class="grid-title">{{item}}</div>
                <div class="mui-media-body" id="capital">{{nums[index]}}</div>
                <div class="nlb-border-right" v-if="index!=2"></div>
            </li>
        </ul>

        <!--银行卡信息-->
        <h5 class="mui-content-padded"></h5>
        <headList :items="items"></headList>
        <p class="mui-text-left">{{info}}</p>

        <!--提现表单-->
        <h5 class="mui-content-padded"></h5>
        <form class="mui-input-group">
            <div class="mui-input-row nlb-input-row">
                <label>提现金额</label>
                <input v-model="form.apply_num" type="number" placeholder="提现金额200起" class="mui-input-clear">
            </div>
            <div class="mui-input-row">
                <label>验证码</label>
                <input v-model="form.auth_code" type="number" placeholder="请输入验证码">
            </div>
        </form>
        <timerbutton class="mui-btn mui-btn-danger bottom-btn" :second="30" :btnTapped="sendAuthCode"></timerbutton>
        <button @click="withdrawAction" type="button" class="mui-btn mui-btn-primary bottom-btn">确认提现</button>

    </div>
</template>

<script>
    import navi from 'components/navigator.vue'
    import headList from 'components/public/baseList.vue'
    import timerbutton from 'components/public/countdownButton.vue'

    import userApi from 'apis/userApi'

    //您本月剩余免费提现次数不足 本次提现将扣除1%的手续费
    export default {
        data(){
            return {
                titles:['账户总额(元)', '冻结(元)', '可提现(元)'],
                nums:[0,0,0],
                items:[{
                    title:'绑定的银行卡',
                    image:require('assets/mine/wallet/mine-tg.png'),
                    path:'#'
                }],
                info:'本月可免费提现次数剩余 -- 次',
                form:{
                    apply_num:'',
                    auth_code:''
                }
            }
        },
        mounted(){
            this.fetchData()
        },
        methods:{
            fetchData(){
                userApi.getUserInfo('withdraw')
                        .then(rs=>{
                            this.nums = rs.nums
                            let {bank_name,withdrawNums,card_no} = rs
                            this.items[0].title = bank_name?`${bank_name}(尾号${card_no.slice(-4)}的储蓄卡)`:'未绑定银行卡'
                            this.items[0].path = bank_name?{name:'mineProfile'}:{name:'updateBank'}
                            this.info = withdrawNums>3?'您本月剩余免费提现次数不足,本次提现将扣除1%的手续费': `本月可免费提现次数剩余${3-withdrawNums}次`
                        },err=>{
                            console.log(err)
                        })
            },
            sendAuthCode(){//发送验证码
                return userApi.getWithdrawAuthCode()
            },
            withdrawAction(){//提现操作
                let {apply_num,auth_code} = this.form
                let hasAuthCode = auth_code
                let allValue = apply_num && auth_code
                let more200 = apply_num >= 200

                if (!hasAuthCode){
                    mui.toast('请填写验证码')
                } else if (!allValue){
                    mui.toast('请补全信息')
                }else if (!more200){
                    mui.toast('提现金额必须大于等于200')
                }else {
                    userApi.walletWithdrawAction(apply_num,auth_code)
                            .then(rs=>{
                                mui.toast('提现订单已提交,请等待客服处理')
                                this.$router.back()
                            },err=>{
                                console.log(err)
                            })
                }
            }
        },
        components:{
            navi,
            headList,
            timerbutton
        }
    }
</script>

<style scoped>
    .nlb-border-right {
        height: 34px;
        width: 1px;
        background-color: #000;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -17px;
        opacity: 0.6;
    }
    .grid-title {
        font-size: 14px;
    }

    .bottom-btn {
        margin: 0 auto;
        margin-top: 8px;
        width:90%;
        line-height: 26px;
    }
</style>