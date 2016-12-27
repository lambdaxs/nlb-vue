<template>
    <div class="p-mgn0" style="text-align:center;">
        <navi title="绑定银行卡" back="true"></navi>

        <h5 class="mui-content-padded"></h5>

        <form class="mui-input-group">
            <div class="mui-input-row">
                <label>开户姓名：</label>
                <input v-model="info.name" type="text" class="mui-input-clear" placeholder="请与身份证姓名保持一致">
            </div>
            <div class="mui-input-row">
                <label>身份证号：</label>
                <input v-model="info.id" type="text" class="mui-input-clear" placeholder="仅支持二代身份证">
            </div>
            <div class="mui-input-row">
                <label>银行名称：</label>
                <input v-model="info.bank_name" type="text" class="mui-input-clear" placeholder="请输入开户行名称">
            </div>
            <div class="mui-input-row">
                <label>银行卡号：</label>
                <input v-model="info.card_no" type="text" class="mui-input-clear" placeholder="请输入银行卡号">
            </div>
            <div class="mui-input-row">
                <label>验证码：</label>
                <input v-model="info.auth_code" type="number" placeholder="请输入验证码">
            </div>
            <div class="mui-btn-row">
                <timerButton class="mui-btn mui-btn-primary codes-btn-sms-login" :second="30" :btnTapped="sendAuthCode"></timerButton>
                <button @click="bindAction" type="button" class="mui-btn mui-btn-danger bind-btn" data-loading-icon="mui-spinner mui-spinner-custom" :disabled="!info.isAgree">绑定银行卡</button>
            </div>
        </form>

        <div class="mui-input-row mui-checkbox mui-left agreement">
            <label for="is-agree">同意</label><a @click="toggleAgreementAction">《农林宝服务协议》</a>
            <input v-model="info.isAgree" id="is-agree" name="is-agree" value="Item 1" type="checkbox">
        </div>

        <agreement v-if="showAgreement" :closeAction="toggleAgreementAction"></agreement>
    </div>
</template>

<script>
    import navi from 'components/navigator.vue'
    import timerButton from 'components/public/countdownButton.vue'
    import agreement from 'components/public/agreement.vue'

    import userApi from 'apis/userApi'
    export default {
        data(){
            return {
                info:{
                    name:'',
                    id:'',
                    bank_name:'',
                    card_no:'',
                    auth_code:'',
                    isAgree:true
                },
                showAgreement:false
            }
        },
        mounted(){
          userApi.getUserInfo().then(({name,id,card_no,bank_name})=>{
              let info = this.info
              info.name = name
              info.id = id
              info.card_no = card_no
              info.bank_name = bank_name
          },err=>{
              console.log(err)
          })
        },
        methods:{
            bindAction(){//绑定银行卡信息
                let data = this.info
                let hasAuthCode = data.auth_code
                let allValue = data.name && data.id && data.bank_name && data.card_no

                if (!allValue){
                    mui.toast('请补全信息')
                }else if(!hasAuthCode){
                    mui.toast('请输入验证码')
                }else {
                    let btn = mui('.bind-btn')
                    btn.button('loading')
                    userApi.bindCard(this.info)
                            .then(rs=>{
                                btn.button('reset')
                                mui.toast('银行卡绑定成功')
                                //返回个人资料界面
                                this.$router.back()
                            },err=>{
                                console.error(err)
                            })
                }
            },
            sendAuthCode(){
                return userApi.sendBindingCardAuthCode()
            },
            toggleAgreementAction(){
                this.showAgreement = !this.showAgreement
            }
        },
        components:{
            navi,
            timerButton,
            agreement
        }
    }
</script>

<style scoped>
    label {
        font-size: 14px;
    }
    .mui-btn-row button {
        margin-top: 8px;
        margin-bottom: 8px;
    }
    .agreement {
        margin: 0 auto;
    }
    .mui-checkbox {
        margin-top: 10px;
        font-size: 14px;
        text-align: left;
    }
    .mui-checkbox label{
        display: inline;
        line-height: 2;
    }
    .mui-checkbox input {
        top: 0;
    }
</style>