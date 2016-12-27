<template>
  <div class="hello">
      <navi title="我"></navi>
      <pull :onPull="update">
          <div>
              <h5 class="mui-content-padded"></h5>
              <headView v-show="loginState.showHead" ref="headView"></headView>

              <h5 class="mui-content-padded"></h5>
              <mineItem :items="userInfo"></mineItem>

              <h5 class="mui-content-padded"></h5>
              <mineItem :items="mineInfo"></mineItem>

              <div class="bottom-button">
                  <button @click="signOutAction" id="signOut" class="mui-btn mui-btn-block" :class="loginState.style">{{loginState.text}}</button>
              </div>
          </div>
      </pull>
  </div>
</template>

<script>

    import navi from './navigator.vue'
    import headView from './mine/headView.vue'
    import mineItem from './find/findItem.vue'
    import pull from './public/pullUpdate.vue'

    export default {
        data () {
            return {
                userInfo:[{
                    title:'个人资料',
                    path:{name:'mineProfile'},
                    image:require('assets/mine/people.png')
                }],
                mineInfo:[{
                    title : "我的钱包",
                    image : require('assets/mine/mine-money.png'),
                    path : {name:'mineWallet'}
                }, {
                    title:'我的林场',
                    image:require('assets/mine/mine-tree.png'),
                    path:{name:'mineTree'}
                },{
                    title : "交易记录",
                    image : require('assets/mine/mine-list.png'),
                    path : {name:'mineTrade'}
                }, {
                    title : "我的会员",
                    image : require('assets/mine/vip.png'),
                    path : {name:'mineMember'}
                },{
                    title : "我的佣金",
                    image : require('assets/mine/setting-yj.png'),
                    path : {name:'minePromotion'}
                }, {
                    title : "申请回购",
                    image : require('assets/mine/buyback.png'),
                    path : {name:'mineBuyback'}
                }, {
                    title : "合同与保单",
                    image : require('assets/mine/myContract.png'),
                    path : {name:'mineContract'}
                },{
                    title:"我的专属客服",
                    image:require('assets/mine/mine-kf.png'),
                    path: {name:'mineCustom'}
                }],
                loginState:{}//是否登录状态
            }
        },
        activated(){
            this.loginState = this.changeState()
        },
        methods:{
            changeState(){//底部按钮状态同步
                if (localStorage.getItem('token')){//已登录
                    return {style:'mui-btn-danger',text:'注销账号',showHead:true}
                }else {//未登录
                    return {style:'mui-btn-primary',text:'登录账号',showHead:false}
                }
            },
            signOutAction(){//底部按钮登录注销
                if (this.loginState.text == '登录账号'){//跳转登录界面
                    this.$router.replace({name:'auth'})
                }else {//注销
                    localStorage.removeItem('token')
                    mui.toast('账号已注销',{
                        type:'div'
                    })
                    this.loginState = this.changeState()
                }
            },
            update(endUpdate){//下拉刷新顶部数据
                this.$refs.headView.getUserInfo().then(()=>{
                    endUpdate('刷新完成')
                },err=>{
                    endUpdate('刷新失败 '+err)
                })
            }
        },
        components:{
            navi,
            headView,
            mineItem,
            pull
        }
    }
</script>

<style scoped>
    .bottom-button {
        padding: 10px;
    }

    #signOut {
        height: 40px;
        line-height: 40px;
        padding: 0;
    }
</style>
