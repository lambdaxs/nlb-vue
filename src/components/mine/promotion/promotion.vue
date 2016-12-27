<template>
    <div>
        <navi title="我的佣金" back="true"></navi>
        <div class="mui-row card-header">
            <div v-for="(title,index) in headerTitles" class="mui-col-sm-4 mui-col-xs-4">
                <div class="title">{{title}}</div>
                <div class="num">{{headerNums[index]}}</div>
                <div class="nlb-border-right" v-if="index!==2"></div>
            </div>
        </div>
        <p v-if="list.length==0" style="margin-top: 8px;">暂无数据</p>
        <listView :orders="list" :titles="titles" :keys="keys"></listView>
    </div>
</template>

<script>
    import navi from 'components/navigator.vue'
    import userApi from 'apis/userApi'
    import listView from '../orders/orderItem.vue'

    export default {
        data(){
          return {
              headerTitles:['累计佣金(元)','冻结佣金(元)','解冻佣金(元)'],
              headerNums:['-','-','-'],
              list:[{
                  base:'sd',
                  name:'xiaos',
                  num:10,
                  orderId:12,
                  money:88000,
                  time:'2016',
                  lock_status:'已确认'
              }],
              titles:['来源:','所购数量(亩):','佣金金额(元):','解冻时间:','状态:'],
              keys:['name','num','money','time','lock_status']
          }
        },
        mounted(){
          this.fetchData()
        },
        methods:{
          fetchData(){
              userApi.promotionList()
                      .then(rs=>{
//                          this.list = rs.list.map(v=>{
//                                      v.orderId = v.number
//                                      return v
//                                  }) || []

                          let {totalPromotionGains:num1,lockedPromotionGains:num2,promotion_capital:num3} = rs.userinfo
                          this.headerNums = [num1,num2,parseInt(num3)]
                      },err=>{
                          console.log(err)
                      })
          }
        },
        components:{
            navi,
            listView
        }
    }
</script>

<style scoped>
    .card-header {
        margin: 0 auto;
        margin-top: 8px;
        margin-bottom: 8px;
        width: 90%;
        background-color: #007aff;
        color: #fff;
        border-radius: 5px;
        padding: 5px;
        font-size: 15px;
    }
    .nlb-border-right {
        height: 34px;
        width: 1px;
        background-color: #fff;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -17px;
        opacity: 0.6;
    }
</style>