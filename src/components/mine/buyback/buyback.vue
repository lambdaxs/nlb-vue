<template>
    <div>
        <navi title="申请回购" back="true"></navi>
        <div class="mui-card">
            <div class="mui-card-header">
                <p>您的本期总量为:<span class="nlb-home-num">1</span>亩</p>
            </div>
            <div class="mui-content">
                <form class="mui-input-group">
                    <div class="mui-input-row">
                        <input v-model="form.nums" type="number" class="mui-input-clear" placeholder="回购亩数">
                    </div>
                    <div class="mui-input-row">
                        <input v-model="form.money" type="number" placeholder="回购金额">
                    </div>
                    <div class="mui-input-row">
                        <input v-model="form.auth_code" type="number" placeholder="验证码">
                    </div>
                    <div class="mui-input-row mui-checkbox mui-left" style="margin-top: 10px; font-size: 14px">
                        <label style="display: inline;line-height: 2">同意</label><a id="service"  @click="toggleAgreementAction">《农林宝服务协议》</a>
                        <input v-model="isAgree" id="is-agree" style="top: 0;" name="is-agree" value="Item 1" type="checkbox">
                    </div>
                    <div class="mui-button-row">
                        <timerButton  class="mui-btn mui-btn-primary codes-btn" :second="30" :btnTapped="sendAuthCodeAction"></timerButton>
                        <button @click="buybackAction" type="button" class="mui-btn mui-btn-danger reg-btn" :disabled="!isAgree" data-loading-text="正在加载...">立即回购</button>
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

    export default {
        data(){
          return {
              isAgree:true,
              showAgreement:false,
              form:{
                  nums:'',
                  money:'',
                  auth_code:''
              }
          }
        },
        methods:{
            toggleAgreementAction(){
                this.showAgreement = !this.showAgreement
            },
            sendAuthCodeAction(){//发送验证码
                return new Promise(s=>{
                    s()
                })
            },
            buybackAction(){//发起回购
                console.log('buy back')
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

</style>