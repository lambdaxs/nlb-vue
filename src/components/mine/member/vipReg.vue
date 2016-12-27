<template>
    <div>
        <navi title="邀请注册" back="true"></navi>
        <div class="mui-card">
            <div class="mui-card-header">
                <div class="mui-pull-left">
                    <p class="mui-text-left">已邀请<span>{{invite[0]}}</span>人  有效邀请<span>{{invite[1]}}</span>人  剩余邀请人数<span>{{invite[2]}}</span>人</p>
                </div>
            </div>
            <div class="mui-card-content">
                <form class="mui-input-group">
                    <div class="mui-input-row">
                        <label><a class="mui-icon mui-icon-phone"></a></label>
                        <input v-model="form.mobile" type="number" class="mui-input-clear" placeholder="请输入要邀请的手机号">
                    </div>
                    <div class="mui-input-row">
                        <label><a class="mui-icon mui-icon-chatbubble"></a></label>
                        <input v-model="form.auth_code" type="number" placeholder="请输入验证码">
                    </div>
                    <div class="mui-input-row mui-checkbox mui-left" style="margin-top: 10px; font-size: 14px">
                        <label style="display: inline;line-height: 2">同意</label><a id="service"  @click="toggleAgreementAction">《农林宝服务协议》</a>
                        <input v-model="isAgree" id="is-agree" style="top: 0;" name="is-agree" value="Item 1" type="checkbox">
                    </div>
                    <div class="mui-button-row">
                        <timerButton  class="mui-btn mui-btn-primary codes-btn" :second="30" :btnTapped="sendRegsiterAuthCode"></timerButton>
                        <button @click="sendInviteAction" type="button" class="mui-btn mui-btn-danger reg-btn" :disabled="!isAgree" data-loading-text="正在邀请...">邀请注册</button>
                    </div>
                </form>
            </div>
        </div>
        <agreement v-if="showAgreement" :closeAction="toggleAgreementAction"></agreement>
    </div>
</template>

<script>
    import navi from 'components/navigator.vue'
    import agreement from 'components/public/agreement.vue'
    import timerButton from 'components/public/countdownButton.vue'
    import userApi from 'apis/userApi'

    export default {
        data(){
          return {
              invite:['-','-','-'],
              form:{
                  mobile:'',
                  auth_code:''
              },
              isAgree:true,
              showAgreement:false
          }
        },
        mounted(){
          this.fetchData()
        },
        methods:{
            toggleAgreementAction(){
                this.showAgreement = !this.showAgreement
            },
            fetchData(){
              userApi.getMembers()
                      .then(rs=>{
                          this.invite = rs.nums
                      },err=>{
                          console.log(err)
                      })
            },
            sendRegsiterAuthCode(){//发送验证码
                return userApi.getInvitationAuthCode()
            },
            sendInviteAction(){//邀请注册
                let {mobile,auth_code} = this.form
                let allValue = mobile && auth_code
                if (!allValue){
                    console.log('补全信息')
                    mui.toast('请补全信息')
                }else {
                    let btn = mui('.reg-btn')
                    btn.button('loading')
                    userApi.invitationUser(this.form)
                            .then(rs=>{
                                mui.toast('邀请成功')
                                btn.button('reset')
                                this.$router.back()
                            },err=>{
                                btn.button('reset')
                                console.log(err)
                            })
                }

            }
        },
        components:{
            navi,
            agreement,
            timerButton
        }
    }
</script>

<style scoped>
    .mui-card-header span {
        color: #007aff;
    }
</style>