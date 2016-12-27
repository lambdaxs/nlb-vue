<template>
    <div>
        <navi title="修改密码" back="true"></navi>
        <h5 class="mui-content-padded"></h5>

        <form class="mui-input-group">
            <div class="mui-input-row nlb-input-row">
                <label>原密码</label>
                <input type="password" class="mui-input-password" v-model="data.old_password" placeholder="请输入原登录密码">
            </div>
            <div class="mui-input-row nlb-input-row">
                <label>新密码</label>
                <input type="password" class="mui-input-password" v-model="data.new_password" placeholder="请输入新密码">
            </div>
            <div class="mui-input-row nlb-input-row">
                <label>新密码</label>
                <input type="password" class="mui-input-password" v-model="data.confirm_password" placeholder="请再输入新密码">
            </div>
        </form>
        <button  @click="updatePasswd" class="mui-btn mui-btn-danger bottom-btn" data-loading-icon="mui-spinner mui-spinner-custom">确认修改登录密码</button>

        <p style="padding: 10px 11px">温馨提示：若首次登录平台或者未设置过登录密码，可以留空。如有疑问，请联系客服处理<a href="tel:4008081618">400-808-1618</a></p>
    </div>
</template>

<script>
    import navi from 'components/navigator.vue'
    import userApi from 'apis/userApi'

    export default {
        data(){
            return {
                data:{
                    old_password:'',
                    new_password:'',
                    confirm_password:''
                }
            }
        },
        methods:{
            updatePasswd(){
                let {old_password,new_password,confirm_password} = this.data

                let allValue = old_password && new_password && confirm_password
                let same = confirm_password === new_password

                if (!allValue){
                    mui.toast('请补全信息')
                }else if(!same){
                    mui.toast('两次密码输入不一致')
                }else {
                    let btn = mui('.bottom-btn')
                    btn.button('loading')
                    userApi.updatePasswd(this.data).then(()=>{
                        btn.button('reset')
                        mui.toast('修改成功')
                        this.$router.back()
                    },err=>{
                        console.log(err)
                    })
                }
            }
        },
        components:{
            navi
        }
    }
</script>

<style scoped>
    .bottom-btn{
        padding: 6px 12px;
        margin: 15px auto;
        width: 90%;
        line-height: 32px;
    }
</style>