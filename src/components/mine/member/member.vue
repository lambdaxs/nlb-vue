<template>
    <div>
        <navi title="我的会员" back="true"></navi>
        <div class="mui-card">
            <div class="mui-card-header">
                <div class="mui-pull-left">
                    <p class="mui-text-left">已邀请<span>{{invites[0]}}</span>人 有效邀请<span>{{invites[1]}}</span>人</p>
                    <p class="mui-text-left">剩余邀请人数<span>{{invites[2]}}</span>人</p>
                </div>
                <router-link tag="button" :to="{name:'vipReg'}" class="mui-btn mui-btn-primary mui-pull-right">邀请注册</router-link>
            </div>
            <div class="mui-card-conten">
                <table style="width: 100%;">
                    <thead>
                    <tr>
                        <th v-for="title in titles">{{title}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="member in members" class="td-pgd">
                        <td>{{member.name}}</td>
                        <td>{{member.phone}}</td>
                        <td>{{member.state}}</td>
                        <td>{{member.totalmoney}}</td>
                        <td>{{member.money}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <p v-if="members.length==0" class="no-data">暂无数据</p>
        </div>
    </div>
</template>

<script>
    import navi from 'components/navigator.vue'
    import userApi from 'apis/userApi'

    export default {
        data(){
          return {
              invites:['-','-','-'],
              titles:['姓名','手机','状态','订单总额(元)','推广佣金(元)'],
              members:[]
          }
        },
        activated(){
          this.fetchData()
        },
        methods:{
          fetchData(){
            userApi.getMembers()
                    .then(rs=>{
                        this.invites = rs.nums
                        this.members = rs.members || []
                    },err=>{
                        console.log(err)
                    })
          }
        },
        components:{
            navi
        }
    }
</script>

<style scoped>
    .mui-card-header span {
        color: #007aff;
    }
    .no-data {
        margin-top: 8px;
        text-align: center;
    }
</style>