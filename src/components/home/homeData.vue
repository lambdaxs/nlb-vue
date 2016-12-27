<template>
    <div class="mui-card" :style="backgroundImage">
        <div class="mui-card-header nlb-rm-header-line">
            <div class="mui-media-body mui-text-center">
                <img :src="image" />
                <span>{{dataModel.title}}</span>
            </div>
        </div>
        <div class="mui-card-content mui-text-center">
            <p class="nlb-data-view nlb-data-title">{{dataModel.moneyDesc}}</p>
            <div class="mui-media-body">
                <p class="nlb-data-num">{{dataModel.moneyNum}}</p>
            </div>
            <p class="nlb-data-view nlb-data-title">{{dataModel.userDesc}}</p>
            <div class="mui-media-body">
                <p class="nlb-data-num">{{dataModel.userNum}}</p>
            </div>
        </div>
        <div class="mui-card-footer">
            <p class="nlb-data-view">{{dataModel.desc}}</p>
        </div>
    </div>
</template>

<script>
    let bgImage = require('../../assets/home/dataViewBg.png')
    let headImage = require('../../assets/home/flag1.png')

    export default {
        props:['dataModel'],
        data(){
            return {
                backgroundImage:{
                    'background-image': `url(${bgImage})`
                },
                image:headImage
            }
        }
    }
</script>

<style scoped>

    .mui-card {
        background-size: cover;
        background-repeat: no-repeat;
    }

    .mui-media-body img {
        width: 15px;
        height: 15px;
    }

    .mui-media-body span {
        margin-left: 3px;
        color: white;
    }

    .nlb-data-title {
        font-size: 14px;
    }

    .nlb-data-num {
        font-size: 32px;
        color: #feed9e;
        font-weight: 400;
    }

    .nlb-data-view{
        color:#f7f8f8 !important;
    }
</style>