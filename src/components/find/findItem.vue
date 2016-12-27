<template>
    <ul class="mui-table-view">
        <li v-for="item in items" class="mui-table-view-cell mui-media">
            <router-link :to="item.path" class="mui-navigate-right">
                <img class="mui-pull-left nlb-cell-image" :src="item.image">
                <div class="mui-media-body cellTitle">
                    {{item.title}}
                </div>
            </router-link>
        </li>
    </ul>
</template>

<script>
    export default {
        props:["items"]
    }
</script>

<style scoped>
    .nlb-cell-image{
        width: 28px;
        height: 28px;
        margin-right: 8px;
    }

    .cellTitle {
        text-align: left;
        line-height: 28px;
        margin-right: 15px;
    }
</style>