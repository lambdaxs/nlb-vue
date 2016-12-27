<template>
    <div>
        <navi title="登录" back="true"></navi>

        <!--登录-->
        <login></login>
        <!--注册-->
        <regsiter></regsiter>
        <!--修改密码-->
        <updatePasswd></updatePasswd>
    </div>
</template>

<script>
    import navi from '../navigator.vue'

    import login from './login/login.vue'
    import regsiter from './login/regsiter.vue'
    import updatePasswd from './login/updatePasswd.vue'


    export default {
        components:{
            navi,
            login,
            regsiter,
            updatePasswd
        }
    }
</script>

<style scoped>
    .a {
        padding:0 10px;
        height: auto !important;
    }

    .a button {
        display: block;
        width: 100%;
        margin-top: 10px;
    }

    .none {
        display: none;
    }

    .on {
        display: block;
    }
</style>