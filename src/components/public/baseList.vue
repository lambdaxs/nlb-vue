<template>
    <ul class="mui-table-view" :class="tableviewStyle">
        <li class="mui-table-view-cell mui-media" v-for="item in items" :class="item.style">
            <router-link :to="item.path" :class="{'mui-navigate-right':!item.notShowRight}">
                <img v-if="item.image" class="mui-pull-left nlb-cell-image" :src="item.image">
                <div class="mui-media-body cellTitle">
                    {{item.title}}
                </div>
            </router-link>
        </li>
    </ul>
</template>

<script>
    export default {
        props:['items','tableviewStyle'],
    }
</script>

<style scoped>
    .mui-pull-left.nlb-cell-image{
        width: 28px;
        height: 28px;
    }
    .cellTitle {
        float: left;
        line-height: 28px;
        margin-left: 8px;
    }
</style>