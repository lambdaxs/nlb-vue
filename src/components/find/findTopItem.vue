<template>
    <ul class="mui-table-view mui-grid-view view_find view_find">
        <li v-for="item in items" class="mui-table-view-cell mui-media mui-col-xs-6">
            <router-link :to="item.path" class="mui-text-center">
                <img class="mui-media-object mui-pull-left" :src="item.image" />
                <span class="mui-pull-left">{{item.title}}</span>
            </router-link>
        </li>
    </ul>
</template>

<script>
    export default {
        props:['items']
    }
</script>

<style scoped>
    .mui-media-object.mui-pull-left {
        width: 28px!important;
        height: 28px!important;
    }
</style>