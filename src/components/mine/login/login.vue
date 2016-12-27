<template>
    <div id="loginBox" class="mui-control-content mui-active">
        <div class="login-header">
            <div id="segmentedControl" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-primary">
                <a class="mui-control-item mui-active" href="#passwdLoginBox">密码登录</a>
                <a class="mui-control-item" href="#codeLoginBox">验证码登录</a>
            </div>
        </div>

        <!--密码登录-->
        <div id="passwdLoginBox" class="mui-control-content mui-active">
            <form class="mui-input-group">
                <div class="mui-input-row nlb-input-row">
                    <label><a class="mui-icon mui-icon-phone"></a></label>
                    <input v-model="passwdLogin.mobile" value="" type="text"  class="mui-input-clear" placeholder="请输入手机号">
                </div>
                <div class="mui-input-row nlb-input-row">
                    <label class="login-label"><a class="mui-icon mui-icon-locked"></a></label>
                    <input v-model="passwdLogin.passwd" value="" type="password"  class="mui-input-password login-input" placeholder="请输入密码">
                </div>

                <div class="mui-button-row login-btn-row">
                    <button type="button" class="mui-btn mui-btn-primary login-btn" @click="loginByPasswd" data-loading-text="正在登录...">登录</button>
                </div>

                <div class="forget-pwd">
                    <a href="#regBox" class="mui-control-item">还没有账号?点击注册</a>&nbsp;<a class="mui-control-item" href="#forgetBox">忘记密码？</a>
                </div>
            </form>
        </div>

        <!--验证码登录-->
        <div id="codeLoginBox"  class="mui-control-content ">
            <form class="mui-input-group">
                <div class="mui-input-row nlb-input-row">
                    <label><a class="mui-icon mui-icon-phone"></a></label>
                    <input v-model="codeLogin.mobile" value="" type="text" id="login_sms_mobile" class="mui-input-clear" placeholder="请输入手机号">
                </div>
                <div class="mui-input-row nlb-input-row">
                    <label><a class="mui-icon mui-icon-chatbubble"></a></label>
                    <input v-model="codeLogin.authCode" value="" id="login_sms_code" type="text" placeholder="请输入验证码">
                    <timerButton class="mui-btn mui-btn-primary codes-btn-sms-login" :second="30" :btnTapped="sendLoginAuthCode"></timerButton>
                </div>

                <div class="mui-button-row login-block-row login-btn-row">
                    <button type="button" class="mui-btn mui-btn-danger login-block-sms-login" @click="loginByAuthCode">登录</button>
                </div>
            </form>
        </div>
    </div>
</template>


<script>

    import timerButton from '../../public/countdownButton.vue'
    import userApi from '../../../apis/userApi'

    export default {
        data(){
            return {
                passwdLogin:{//密码登录
                    mobile:'',
                    passwd:''
                },
                codeLogin:{//验证码登录
                    mobile:'',
                    authCode:''
                }
            }
        },
        methods:{
            loginByPasswd(){//密码登录
                let btn = mui('.login-btn')
                btn.button('loading')

                let {mobile,passwd} = this.passwdLogin
                userApi.loginByMobileAndPasswd(mobile,passwd)
                        .then(rs=>{//登录成功 跳转到首页
                            btn.button('reset')
                            this.$router.replace({name:'mine'})
                        },err=>{
                            btn.button('reset')
                        })
            },
            sendLoginAuthCode(){//发送登录验证码
                let {mobile} = this.codeLogin
                return userApi.sendLoginAuthCode(mobile)
                        .then(rs=>{
                            return new Promise((s,f)=>{s()})
                        },err=>{
                            return new Promise((s,f)=>{f(err)})
                        })
            },
            loginByAuthCode(){//验证码登录
                let btn = mui('.login-btn')
                btn.button('loading')

                let {mobile,authCode} = this.codeLogin
                userApi.loginByMoileAndAuthCode(mobile,authCode)
                        .then(rs=>{
                            this.$router.replace({name:'mine'})
                            btn.button('reset')
                        },err=>{
                            btn.button('reset')
                        })
            },
        },
        components:{
            timerButton
        }
    }
</script>

<style scoped>
    .login-header {
        padding: 10px 10px 0 10px;
        background-color: #fff;
    }

    #login_sms_code {
        width: 130px!important;
    }

    .login-label {
        width: 30% !important;
    }

    .login-input {
        width: 70% !important;
        font-size: 14px;
    }
    .login-btn-row {
        /*padding:0 1px;*/
        margin: 0 8px;
        height: auto !important;
    }

    .login-btn-row button {
        display: block;
        width: 100%;
        margin-top: 10px;
    }
    .login-block-row {
        padding: 0 10px;
        height: auto;
    }

    .login-block-sms-login {
        margin-top: 8px;
        display: block;
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

    .codes-btn-sms-login {
        width: auto !important;
        float: right !important;
        font-size: 12px;
        margin-top: 5px;
        margin-right: 5px;
    }
    .mui-input-group {
        padding-bottom: 8px;
    }

    .forget-pwd {
        padding: 5px 20px;
        font-size: 12px;
        text-align: justify;
        text-align-last:justify;
    }

    .forget-pwd a{
        display: inline-block;
    }

    .mui-input-group .forget-pwd{
        font-size: 17px;
    }

    .mui-input-group input>text {
        font-size: 14px;
    }
</style>