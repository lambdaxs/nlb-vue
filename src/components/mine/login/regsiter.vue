<template>
    <div id="regBox" class="mui-control-content">
        <form id="signup" class="mui-input-group">
            <div class="mui-input-row nlb-input-row">
                <label><a class="mui-icon mui-icon-phone"></a></label>
                <input v-model="regsiter.mobile" value="" type="number" class="mui-input-clear" placeholder="请输入手机号">
            </div>
            <div class="mui-input-row nlb-input-row">
                <label><a class="mui-icon mui-icon-personadd"></a></label>
                <input v-model="regsiter.invitation" value="" type="text" class="mui-input-clear" placeholder="请输入邀请码(必填)">
            </div>

            <div class="mui-input-row nlb-input-row">
                <label><a class="mui-icon mui-icon-chatbubble"></a></label>
                <input v-model="regsiter.authCode" type="text" placeholder="请输入验证码" style="width: 130px!important;">
                <timerButton  class="mui-btn mui-btn-primary codes-btn" :second="30" :btnTapped="sendRegsiterAuthCode"></timerButton>
            </div>

            <div class="mui-input-row nlb-input-row">
                <label class="login-label"><a class="mui-icon mui-icon-locked"></a></label>
                <input v-model="regsiter.passwd" value="" type="password" class="mui-input-password login-input" placeholder="请输入密码">
            </div>

            <div class="mui-input-row nlb-input-row">
                <label class="login-label"><a class="mui-icon mui-icon-locked"></a></label>
                <input v-model="regsiter.cpasswd" value="" type="password" class="mui-input-password login-input" placeholder="请重新输入密码">
            </div>

            <div class="mui-input-row mui-checkbox mui-left" style="margin-top: 10px; font-size: 14px">
                <label style="display: inline;line-height: 2">同意</label><a id="service"  @click="toggleAgreementAction">《农林宝服务协议》</a>
                <input v-model="regsiter.isAgree" id="is-agree" style="top: 0;" name="is-agree" value="Item 1" type="checkbox">
            </div>
            <div class="mui-button-row registered-btn-row">
                <button @click="regsiterAction" id="reg-btn" type="button" class="mui-btn mui-btn-danger registered" :disabled="!regsiter.isAgree">注册</button>
            </div>
            <div class="login-agree">
                <a class="mui-control-item" href="#loginBox">已有账号？去登录</a>
            </div>
        </form>
        <agreement v-if="showAgreement" :closeAction="toggleAgreementAction"></agreement>
    </div>
</template>

<script>
    import agreement from 'components/public/agreement.vue'
    import timerButton from 'components/public/countdownButton.vue'

    export default {
        data(){
            return {
                regsiter:{
                    mobile:'',
                    invitation:'',
                    authCode:'',
                    passwd:'',
                    cpasswd:'',
                    isAgree:true
                },
                showAgreement:false
            }
        },
        methods:{
            sendRegsiterAuthCode(){//发送注册验证码
                console.log('send reg auth code')
                return new Promise(s=>s())
            },
            regsiterAction(){//注册
                console.log('regsiter')
            },
            toggleAgreementAction(){//弹出协议
                this.showAgreement = !this.showAgreement
            }
        },
        components:{
            agreement,
            timerButton
        }
    }
</script>

<style scoped>
    .registered {
        width: 100%;
    }

    .registered-btn-row {
        padding: 0 10px;
        height: auto !important;
    }

    .nlb-input-row {
        height: 46px !important;
    }
    .nlb-input-row label {
        width: auto !important;
        float: left !important;
    }

    .nlb-input-row input {
        padding: 0 !important;
        height: 46px !important;
        float: left !important;
        width: auto !important
    }

    .codes-btn {
        width: auto !important;
        float: right !important;
        font-size: 12px;
        margin-top: 5px;
        margin-right: 5px;
    }
    .mui-input-group {
        padding-bottom: 8px;
    }
    .mui-input-group input>text {
        font-size: 14px;
    }

    .login-agree {
        padding: 5px 10px;
        margin-top: 5px;
        font-size: 12px;
        text-align: center;
    }
</style>