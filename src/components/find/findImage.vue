<template>
    <div class="find-image">
        <navi :title="title" back="true"></navi>
        <div v-html="html" class="find-image-content"></div>
    </div>
</template>

<script>
    import navi from '../navigator.vue'
    export default {
        data(){
            return {
                title:'介绍',
                html:''
            }
        },
        mounted(){
            var content = document.querySelector('.find-image')
            content.style.backgroundColor = 'white'
        },
        activated(){
            this.html = ''
            this.fetchData()
        },
        updated(){
            //公司介绍特殊处理
            if (this.$route.query.hid == 4){
                var images = document.querySelectorAll('img');

                if (images){
                    var hidMap = {
                        2:'21',
                        3:'9',
                        4:'22'
                    }
                    var temp = []
                    images.forEach((v,index)=>{
                        temp.push(`<a href="#/find/image?hid=${hidMap[index]}">${v.outerHTML}</a>`)
                    })
                    this.html = temp.join('')
                }
            }
            //设置图片style
            var imgs = document.querySelectorAll('.find-image img')
            if (imgs){
                imgs.forEach(v=>{
                    v.style.width = '100%'
                })
            }
        },
        watch:{
            '$route':'fetchData'
        },
        methods:{
            fetchData(){
                let hid = this.$route.query.hid
                this.$http.post('http://f.91nlb.com/v1/help/getHelp',{id:hid},{emulateJSON:true})
                        .then(rs=>rs.json())
                        .then(rs=>{
                            if (rs.errno == 0){
                                this.title = rs.data.title
                                this.html = rs.data.content
                            }
                        })
                        .catch(err=>{
                            console.log(err)
                        })
            }
        },
        components:{
            navi
        }
    }
</script>

