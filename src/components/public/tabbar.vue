<template>
    <nav class="mui-bar mui-bar-tab" id="tabbar-content">
        <router-link v-for="item in items" :to="item.path" class="mui-tab-item1">
            <span class="mui-icon" :class="item.image"></span>
            <span class="mui-tab-label">{{item.title}}</span>
        </router-link>
    </nav>
</template>

<script>
    export default {
        props:['items']
    }
</script>

<style scoped>
    .mui-tab-item1
    {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #929292;
    }
    .mui-tab-item1.router-link-active
    {
        color: #002dff !important;
    }
    .mui-tab-item1 .mui-icon
    {
        top: 3px;

        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .mui-tab-item1 .mui-icon ~ .mui-tab-label
    {
        font-size: 11px;

        display: block;
        overflow: hidden;

        text-overflow: ellipsis;
    }
    .mui-tab-item1 .mui-icon:active
    {
        background: none;
    }
</style>