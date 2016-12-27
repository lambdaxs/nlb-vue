<template>
    <div>
        <navi title="个人资料" back="true"></navi>

        <h5 class="mui-content-padded"></h5>

        <div class="nlb-row">
            <div class="nlb-col-left">
                <div id="progress" class="mui-spinner mui-spinner-custom" v-show="iconUpload"></div>
                <div id="people-icon" :style="image">{{imageText}}</div>
                <input id="browse" class="up-img" type="file" accept="image/gif,image/jpeg,image/jpg,image/png" @change="previewFiles">
            </div>
            <div class="nlb-col-right">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell">
                        <a>姓名 : <span id='name'>{{user.name}}</span></a>
                    </li>
                    <li class="mui-table-view-cell">
                        <a>身份证 : <span id='id'>{{user.id}}</span></a>
                    </li>
                    <li class="mui-table-view-cell">
                        <a class="">手机号码 : <span id='mobile'>{{user.mobile}}</span></a>
                    </li>
                </ul>
            </div>
        </div>

        <h5 class="mui-content-padded"></h5>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell">
                <a>银行名称 :  <span>{{user.bank_name}}</span></a>
            </li>
            <li class="mui-table-view-cell">
                <a>银行卡号 :  <span>{{user.card_no}}</span></a>
            </li>
            <li class="mui-table-view-cell">
                <router-link :to="routers.updateAddress" class="mui-navigate-right">
                    收货地址 :
                    <span>{{user.address}}</span>
                </router-link>
            </li>
            <li class="mui-table-view-cell">
                <router-link :to="routers.updatePasswd" class="mui-navigate-right">登录密码 :  <span>{{user.passwdText}}</span></router-link>
            </li>
        </ul>

        <h5 class="mui-content-padded"></h5>
        <router-link tag="button" :to="routers.updateBank" class="mui-btn mui-btn-primary bind-btn">绑定银行卡</router-link>
    </div>
</template>

<script>
    import navi from '../../navigator.vue'
    import userApi from 'apis/userApi'

    export default {
        data(){
            return {
                iconUpload:false,
                routers:{
                    updateAddress:{
                        name:'updateAddress',
                    },
                    updatePasswd:{
                        name:'updatePasswd'
                    },
                    updateBank:{
                        name:'updateBank'
                    }
                },
                user:{
                    name:'',
                    id:'',
                    avatar:'',
                    mobile:'',
                    bank_name:'',
                    card_no:'',
                    address:'',
                    passwdText:''
                }
            }
        },
        computed:{
          image (){
              return this.user.avatar?{'background-image':`url(${this.user.avatar})`}:null
            },
            imageText(){
                return this.user.avatar? '':'点击上传头像'
            }
        },
        activated(){
            this.fetchData()
        },
        methods:{
            fetchData(){
                userApi.getUserInfo()
                        .then(rs=>{
                            this.user = rs
                        },err=>{
                            console.log(err)
                        })
            },
            previewFiles() {
                let self = this
                self.iconUpload = true

                let icon = document.querySelector('#people-icon')
                let file = document.querySelector('input[type=file]').files[0]

                if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
                    var reader = new FileReader();
                    reader.addEventListener("load", function () {
                        //展示缩略图
                        icon.style.backgroundImage = `url(${this.result})`

                        //上传图片到服务器
                        userApi.uploadAvatar(this.result)
                                .then(()=>{
                                    self.iconUpload = false
                                    mui.toast('头像上传成功')
                                },err=>{
                                    mui.toast('头像上传失败'+err)
                                })
                    }, false);
                    reader.readAsDataURL(file);
                }
            }
        },
        components:{
            navi
        }
    }
</script>

<style scoped>
    .nlb-row {
        overflow: hidden;
        position: relative;
        height: 129px;
        border-bottom: 1px solid #c8c7cc;
    }

    .nlb-col-left {
        height: 100%;
        width: 99px;
        float: left;
        background-color: #fff;
        padding: 15px 5px;
        position: relative;
    }

    .nlb-col-right {
        float: right;
        position: absolute;
        left: 100px;
        right: 0;
    }

    .mui-table-view-cell a {
        text-align: left;
    }

    .bind-btn {
        margin: 0 auto;
        width: 90%;
        height: 44px;
    }
    .up-img {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }

    #people-icon {
        width: 100%;
        height: 100%;
        background-size: cover;
    }
</style>