<template>
    <div class="home-item">
        <div v-for="item in items" class="mui-card">
            <div class="mui-card-header nlb-rm-header-line">
                <div class="mui-media-body">
                    {{item.areaName}}
                    <span class="mui-badge mui-badge-primary" >
                        {{item.title}}
                    </span>
                </div>
            </div>
            <div class="mui-card-content">
                <router-link :to="item.path">
                    <div class="mui-media-body mui-text-center">
                        <p class="nlb-num nlb-home-num">{{item.ratio}}</p>
                        <p>{{item.ratioDesc}}</p>
                        <p>{{item.desc}}</p>
                    </div>
                </router-link>
            </div>
            <div class="mui-card-footer">
                <p> </p>
                <router-link :to="item.path"><span class="nlb-show-detail">查看详情</span></router-link>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props:['items']
    }
</script>

<style scoped>
    .nlb-num {
        font-size: 30px;
        font-weight: 100;
        margin-top: 20px;
        margin-bottom: 5px;
    }

    .nlb-home-num {
        color: crimson;
    }
</style>