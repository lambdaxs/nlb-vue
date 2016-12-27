<template>
    <div>
        <div class="mui-spinner mui-spinner-custom" v-show="isLoading"></div>
        <div id="mine-profit" class="mui-card mui-text-center" v-show="!isLoading">
            <div class="mui-card-content nlb-num nlb-mine-num mui-row" >
                <div class="mui-col-xs-6 mui-col-sm-6 nlb-me-pdg border-0">
                    <a href="#">
                        <div class="nlb-me-title">{{data.monthTitle1}}</div>
                        <div class="mui-media-body top-sTitle">{{data.monthNum1}}</div>
                        <div class="nlb-border-right"></div>
                    </a>
                </div>
                <div class="mui-col-xs-6 mui-col-sm-6 nlb-me-pdg border-0">
                    <a href="#">
                        <div class="nlb-me-title">{{data.monthTitle2}}</div>
                        <div class="mui-media-body top-sTitle">{{data.monthNum2}}</div>
                        <div class="nlb-border-right"></div>
                    </a>
                </div>
            </div>
            <div class="mui-card-footer nlb-rm-header-line nlb-me-grid" >
                <ul class="mui-table-view mui-grid-9 mui-grid-view border-0 opacity-rgba">

                    <li class="mui-table-view-cell mui-media mui-col-xs-3 nlb-me-pdg border-0">
                        <a href="#">
                            <div class="nlb-me-title">{{data.sNumber1}}</div>
                            <div class="mui-media-body nlb-me-sTitle">{{data.sTitle1}}</div>
                            <div class="nlb-border-right"></div>
                        </a>
                    </li>

                    <li class="mui-table-view-cell mui-media mui-col-xs-3 nlb-me-pdg border-0">
                        <a href="#">
                            <div class="nlb-me-title">{{data.sNumber2}}</div>
                            <div class="mui-media-body nlb-me-sTitle">{{data.sTitle2}}</div>
                            <div class="nlb-border-right"></div>
                        </a>
                    </li>

                    <li class="mui-table-view-cell mui-media mui-col-xs-3 nlb-me-pdg border-0">
                        <a href="#">
                            <div class="nlb-me-title">{{data.sNumber3}}</div>
                            <div class="mui-media-body nlb-me-sTitle">{{data.sTitle3}}</div>
                            <div class="nlb-border-right"></div>
                        </a>
                    </li>

                    <li class="mui-table-view-cell mui-media mui-col-xs-3 nlb-me-pdg border-0">
                        <a href="#">
                            <div class="nlb-me-title">{{data.sNumber4}}</div>
                            <div class="mui-media-body nlb-me-sTitle">{{data.sTitle4}}</div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import userApi from 'apis/userApi'

    export default {
        data(){
          return {
              isLoading:true,
              data:{}
          }
        },
        mounted(){
            this.getUserInfo().then(rs=>{
                this.isLoading = false
            },err=>{
                console.log(err)
                this.isLoading = false
            })
        },
        methods:{
            getUserInfo(){
                return userApi.getInfo()
                        .then(rs=>{
                            let userInfo = rs.userinfo
                            var fhNum = parseFloat(userInfo.dividend_capital)
                            var tgNum = parseInt(userInfo.promotion_capital)
                            this.data =  {
                                monthTitle1 : "账户余额(元)",
                                monthNum1 : parseInt(userInfo.capital),
                                monthTitle2 : "总收益(元)",
                                monthNum2 : parseInt(tgNum)+parseInt(fhNum),
                                sTitle1 : '认购总数(亩)',
                                sNumber1 : userInfo.totalOrderNum,
                                sTitle2 : '总投资(元)',
                                sNumber2 : parseInt(userInfo.totalOrderFee),
                                sTitle3 : '总分红收益(元)',
                                sNumber3 : parseInt(fhNum),
                                sTitle4 : '总推广佣金(元)',
                                sNumber4 : parseInt(tgNum)
                            }
                            return new Promise(s=>{
                                s()
                            })
                        },err=>{
                            this.data = {}
                            console.log(err)
                            throw err
                        })
            },
        }
    }
</script>

<style scoped>
    .nlb-me-pdg {
        padding: 0 !important;
    }

    .nlb-me-sTitle {
        font-size: 14px !important;
        color: #fafafa !important;
    }

    .nlb-me-title {
        font-size: 16px;
        color: #fff;
    }

    .nlb-me-grid {
        padding: 0 ;
        padding-top: 15px;
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
    .border-0 {
        border-radius: 0 !important;
        border: 0 !important;
    }
    .opacity-rgba {
        background-color: rgba(242,242,242,0.3) !important;

    }
    .top-sTitle {
        margin-top: 10px;color: #fff
    }
    .nlb-num {
        font-size: 30px;
        font-weight: 100;
        margin-top: 20px;
        margin-bottom: 5px;
    }

    #mine-profit {
        background-color: #37A061;
        margin: 0;
    }
</style>