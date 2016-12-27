<template>
    <div id="app">
        <navi title="" style="background-color: transparent;border-color: transparent;"></navi>

        <tabbar :items="items"></tabbar>

        <div class="mui-content">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>

    </div>
</template>
<script>
    import navi from './components/navigator.vue'
    import tabbar from './components/public/tabbar.vue'

    export default {
        data(){
            return {
                items:[{
                    title:'首页',
                    path:{name:'home'},
                    image:'mui-icon-home'
                },{
                    title:'林场',
                    path:{name:'tree'},
                    image:'mui-icon-map'
                },{
                    title:'发现',
                    path:{name:'find'},
                    image:'mui-icon-navigate'
                },{
                    title:'我',
                    path:{name:'mine'},
                    image:'mui-icon-person'
                }]
            }
        },
        components:{
            navi,
            tabbar
        }
    }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
