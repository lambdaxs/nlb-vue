<template>
    <ul class="mui-table-view">
        <li v-for="item in items" class="mui-table-view-cell mui-collapse">
            <a class="mui-navigate-right" path="#"><span>{{item.title}}</span></a>
            <div class="mui-collapse-content">
                <p>{{item.content}}</p>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        props:['items']
    }
</script>

<style scoped>
    .mui-navigate-right span {
        float: left;
    }

    .mui-collapse-content {
        text-align: left;
        text-indent: 20px;
        letter-spacing: 2px;
    }
</style>
