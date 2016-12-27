<template>
    <div>
        <div v-for="order in orders" class="mui-card">
            <div class="mui-card-header">
                <p class="mui-pull-left header">{{order.base}}  订单号{{order.orderId}}号</p>
            </div>
            <div class="mui-card-content">
                <div v-for="(title,index) in titles" class="nlb-justify">
                    <span class="title">{{title}}</span>
                    <p class="value">{{order[keys[index]]}}</p>
                </div>
            </div>
            <div class="mui-card-footer" v-if="order.status==0">
                <div class="nlb-justify">
                    <span class="red">提示:24小时内未支付订单将自动取消，请尽快完成支付</span>
                    <router-link :to="order.path" class="mui-btn mui-btn-primary pay-btn" >去支付</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['orders','titles','keys']
    }
</script>

<style scoped>
    .header {
        font-size: 13px;
        font-weight: bold;
        color: #000;
    }
    .title {
        float: left;
        margin-left: 8px;
    }
    .value {
        text-align: right;
        margin-bottom: 6px;
        margin-right: 8px;
        color: darkred;
    }
</style>