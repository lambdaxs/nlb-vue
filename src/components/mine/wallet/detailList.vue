<template>
    <div>
        <div v-for="item in items" class="mui-card mui-text-center mgn-0">
            <div class="mui-card-content">
                <div class="nlb-justify">
                    <span>{{type}}金额：</span>
                    <span class="nlb-home-num">{{item.apply_num}}</span>
                </div>
                <div class="nlb-justify">
                    <span>申请时间：</span>
                    <span class="nlb-home-num">{{item.fdateline}}</span>
                </div>

                <div class="nlb-justify">
                    <span>通过时间：</span>
                    <span class="nlb-home-num">{{item.fact_dateline}}</span>
                </div>
                <div class="nlb-justify">
                    <span>状态：</span>
                    <span class="nlb-home-num">{{item.status_text}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['items','type'],
    }
</script>

<style scoped>
    .nlb-justify {
        padding: 5px 15px;
        text-align:justify;
        /*text-justify:distribute-all-lines;!*ie6-8*!*/
        text-align-last:justify;/* ie9*/
        -moz-text-align-last:justify;/*ff*/
        -webkit-text-align-last:justify;/*chrome 20+*/
    }

    .nlb-justify span {
        display: inline-block;
    }

    .nlb-home-num {
        color: crimson;
    }
</style>