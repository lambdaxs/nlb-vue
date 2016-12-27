<template>
    <div>
        <navi title="林场认筹" back="true"></navi>
        <banner :items="bannerItems"></banner>

        <div class="mui-card nlb-main-product">
            <div class="mui-card-header nlb-rm-header-line">
                <div class="mui-media-body">
                    <span id="forestName">{{data.areaName}}</span><span class="mui-badge mui-badge-green" id="periods">第一期</span>
                </div>
            </div>
            <!--内容区-->
            <div class="mui-card-content">
                <div class="mui-media-body mui-text-center">
                    <p class="nlb-num nlb-home-num" id="treeName">{{data.title}}</p><br>
                </div>
            </div>
            <div class="mui-card-footer">
                <p>描述:<span>{{data.desc}}</span></p>
            </div>
            <div id="opera-list">
                <div class="mui-table-view">
                    <div class="mui-table-view-cell">
                        <div>认筹价格: <span>{{form.money}}</span> 元/亩</div>
                        <div>育林周期: <span>5年半</span></div>
                    </div>
                    <div class="mui-table-view-cell">
                        <div>预计年收益率: <span>{{form.ratio_text}}</span></div>
                        <div>预计年收益额: <span>{{income}}</span> 元</div>
                        <div>认筹总价: <span>{{total}}</span> 元</div>
                    </div>
                    <div class="mui-table-view-cell">
                        <div class="mui-input-row">
                            <label>认筹亩数:</label>
                            <input type="number" :placeholder="form.range" v-model="form.number">
                        </div>
                        <span>(仅剩<span id="leftNum">{{data.left_num}}</span>亩)</span>
                        <div>{{form.msg}}</div>
                    </div>
                    <div class="mui-table-view-cell">
                        <div class="mui-input-row mui-checkbox mui-left">
                            <label>同意</label><a id="service" @click="toggleAgreementAction">《农林宝服务协议》</a>
                            <input v-model="isAgree" id="is-agree" style="top: 0;" name="is-agree" value="Item 1" type="checkbox">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-text-center">
            <button @click="buyAction" type="button" data-loading-icon="mui-spinner mui-spinner-custom" class="mui-btn mui-btn-primary bottom-btn" :disabled="!isAgree || !canBuy">立即认筹</button>
        </div>

        <agreement v-if="showAgreement" :closeAction="toggleAgreementAction"></agreement>
    </div>
</template>

<script>
    import navi from 'components/navigator.vue'
    import banner from 'components/public/banner.vue'
    import homeApi from 'apis/homeApi'
    import agreement from 'components/public/agreement.vue'

    let defaultImage = require('assets/banner/loading.png')

    export default {
        data(){
          return {
              canBuy:true,
              isAgree:true,
              showAgreement:false,
              bannerItems:[{
                  path:'#',
                  image:defaultImage,
                  loop:true
              },{
                  path:'#',
                  image:defaultImage,
                  loop:false
              },{
                  path:'#',
                  image:defaultImage,
                  loop:true
              }],
              data:{
                  areaName:"林场地区",
                  title:"林场名字",
                  ratioDesc:"预期年收益率",
                  desc:"描述信息",
                  left_num:"--"
              },
              form:{}
          }
        },
        computed:{
            total(){//总额
                let {number,money} = this.form
                return parseInt(number*money)
            },
            income(){//收入
                let {ratio,number,money} = this.form
                return (ratio*number*money).toFixed(2)
            },
        },
        mounted(){

        },
        activated(){
            this.fetchData()
            let type = this.$route.query.type
            if (type==1){
                this.canBuy = true
                this.form = {
                    ratio:0.1999,
                    ratio_text:'19.99%',
                    number:11,
                    range:'输入范围11-20',
                    money:8800,
                    msg:'注:每人最少认筹11亩,最多认筹20亩'
                }
            }else if (type == 0){
                this.canBuy = true
                this.form = {
                    ratio:0.1888,
                    ratio_text:'18.88%',
                    number:1,
                    range:'输入范围1-10',
                    money:8800,
                    msg:'注:每人最少认筹1亩,最多认筹10亩'
                }
            }else {
                this.canBuy = false
            }
        },
        methods:{
            toggleAgreementAction(){
              this.showAgreement = !this.showAgreement
            },
            fetchData(){
              const id = this.$route.query.id
              homeApi.getTreeDetail(id)
                      .then(rs=>{
                          let [bannerItems,data] = rs
                          this.bannerItems = bannerItems
                          this.data = data
                      },err=>{
                          console.log(err)
                      })
            },
            buyAction(){//立即认筹
                const number = parseInt(this.form.number)
                const {id,type} = this.$route.query
                let rangeMap = {
                    0:[1,10],
                    1:[11,20]
                }
                let range = rangeMap[type]
                if (number>=range[0] && number <= range[1]){
                    let btn = mui('.bottom-btn')
                    btn.button('loading')

                    homeApi.addOrder({id,number})
                            .then(rs=>{
                                mui.toast('订单添加成功')
                                btn.button('reset')
                                let {order_id} = rs
                                //跳转到支付界面
                                this.$router.push({name:'orderDetail',query:{
                                    number,
                                    forest_id : id,
                                    order_id
                                }})
                            },err=>{
                                mui.toast('订单添加失败')
                                btn.button('reset')
                                console.log(err)
                            })
                }else {
                    mui.toast('认筹数量不在范围内\n'+this.form.msg)
                }
            }
        },
        components:{
            navi,
            banner,
            agreement
        }
    }
</script>

<style scoped>
    .mui-text-center {
        padding-bottom: 10px;
    }
    #is-agree {
        top: 0;
    }
    .mui-table-view-cell label {
        display: inline;
        line-height: 2
    }

    .bottom-btn {
        margin: 0 auto;
        margin-top: 8px;
        width: 90%;
        line-height: 28px;
    }
</style>