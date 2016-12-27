<template>
    <button :disabled="disabled || time > 0" @click="sendSuccess">
        {{ text }}
    </button>
</template>

<script>
    export default {
        props: {
            second: {
                type: Number,
                default: 60
            },
            btnTapped:{//此函数返回值需为promise,用于异步操作
                type: Function,
                default:()=>{}
            }
        },
        data(){
            return {
                time:0,
                disabled:false
            }
        },
        methods: {
            run() {
                this.time = this.second
                this.timer()
            },
            timer() {
                if (this.time > 0) {
                    this.time--;
                    setTimeout(this.timer, 1000);
                }
            },
            sendSuccess() {
                if (this.btnTapped){
                    //外部点击按钮后先不可用
                    this.disabled = true
                    let promise = this.btnTapped()
                    if(promise){//返回一个promise
                        console.log(promise)
                        promise.then(()=>{
                            this.run();
                            this.disabled = false;
                        },err=>{
                            console.log('验证码按钮组件异常')
                            console.log(err)
                            this.disabled = false;
                        })
                    }else {//无返回,在上层被拦截处理
                        this.disabled = false;
                    }
                }else {
                    this.disabled = false;
                }
            }
        },
        computed: {
            text: function () {
                return this.time > 0 ? this.time + 's 后重新获取' : '获取验证码';
            }
        }
    }
</script>

<style scoped>

</style>