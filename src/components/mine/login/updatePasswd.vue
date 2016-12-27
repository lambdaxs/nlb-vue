<template>
    <div id="forgetBox" class="mui-control-content">
        <form id="forget" class="mui-input-group">
            <div class="mui-input-row nlb-input-row">
                <label><a class="mui-icon mui-icon-phone"></a></label>
                <input v-model="forget.mobile" value="" id="forgot_mobile" type="number" class="mui-input-clear" placeholder="请输入手机号">
            </div>
            <div class="mui-input-row nlb-input-row">
                <label><a class="mui-icon mui-icon-chatbubble"></a></label>
                <input v-model="forget.authCode" value="" id="forget_auth_code" type="text" placeholder="请输入验证码">
                <timerButton class="mui-btn mui-btn-primary codes-btn-forget" :second="30" :btnTapped="sendUpdatePasswdAuthCode"></timerButton>
            </div>

            <div class="mui-input-row nlb-input-row">
                <label class="login-label"><a class="mui-icon mui-icon-locked"></a></label>
                <input v-model="forget.passwd" value="" id="forgot_passwd" type="password" class="mui-input-password login-input" placeholder="请输入密码">
            </div>

            <div class="mui-input-row nlb-input-row">
                <label class="login-label"><a class="mui-icon mui-icon-locked"></a></label>
                <input v-model="forget.cpasswd" value="" id="forgot_cpasswd" type="password" class="mui-input-password login-input" placeholder="请重新输入密码">
            </div>

            <div class="mui-button-row login-block-row a">
                <button @click="updatePasswd" type="button" class="mui-btn mui-btn-danger login-block-forgot">修改密码</button>
            </div>
            <div class="login-agree">
                <a class="mui-control-item" href="#loginBox">想起密码？去登录</a>
            </div>
        </form>
    </div>
</template>

<script>
    import timerButton from '../../public/countdownButton.vue'

    export default {
        data(){
            return {
                forget:{
                    mobile:'',
                    authCode:'',
                    passwd:'',
                    cpasswd:''
                }
            }
        },
        methods:{
            updatePasswd(){
                console.log(this.forget)
                console.log('forget passwd')
            },
            sendUpdatePasswdAuthCode(){
                console.log(this.forget)
                console.log('forget passwd auth code')
            }
        },
        components:{
            timerButton
        }
    }
</script>

<style scoped>
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

    .codes-btn-forget {
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

    #forget_auth_code {
        width: 130px!important;
    }
</style>