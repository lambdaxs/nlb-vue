<template>
    <div class="mui-slider">
        <div class="mui-slider-group mui-slider-loop">
            <div v-for="(item, index) in items" class="mui-slider-item" :class="{ 'mui-slider-item-duplicate': item.loop,'mui-active':index==1 }">
                <router-link :to="item.path"><img :src="item.image" /></router-link>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props:['items'],
        mounted(){

        },
        updated(){
            this.autoSlide()
        },
        methods:{
            autoSlide(){
                var gallery = mui('.mui-slider');
                if (gallery){
                    gallery.slider({
                        interval:5000
                    })
                }else {
                    console.err('未找到mui-slider元素')
                }
            }
        }
    }
</script>
