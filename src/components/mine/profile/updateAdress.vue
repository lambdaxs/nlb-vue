<template>
    <div>
        <navi title="填写收货地址" back="true"></navi>

        <h5 class="mui-content-padded"></h5>

        <form class="mui-input-group">
            <div class="mui-input-row">
                <label class="nlb-modify-lable">省份</label>
                <select v-model="info.province_id" @change="getCity" id="province" type="text" class="mui-input-clear nlb-modify-input" placeholder="请选择所在省份">
                    <option value="0">{{pre_text[0]}}</option>
                    <option v-for="item in info.provinceList" :value="item.id">{{item.name}}</option>
                </select>
            </div>
            <div class="mui-input-row">
                <label class="nlb-modify-lable">城市</label>
                <select v-model="info.city_id"   @change="getCountry" id="city" type="text" class="mui-input-clear nlb-modify-input" placeholder="请选择所在城市">
                    <option value="0">{{pre_text[1]}}</option>
                    <option v-for="item in info.cityList" :value="item.id">{{item.name}}</option>
                </select>
            </div>
            <div class="mui-input-row">
                <label class="nlb-modify-lable">区县</label>
                <select v-model="info.country_id" id="country" type="text" class="mui-input-clear nlb-modify-input" placeholder="请选择所在区/县">
                    <option value="0">{{pre_text[2]}}</option>
                    <option v-for="item in info.countryList" :value="item.id">{{item.name}}</option>
                </select>
            </div>
            <div class="mui-input-row" style="height: auto!important;">
                <textarea v-model="info.address" rows="3" cols="20" placeholder="请输入详细地址"></textarea>
            </div>
        </form>

        <button @click="appendAddress" class="mui-btn mui-btn-primary bottom-btn">添加地址</button>
    </div>

</template>

<script>
    import navi from 'components/navigator.vue'
    import userApi from 'apis/userApi'

    export default {
        data(){
            return {
                pre_text:['请选择省/直辖市','请选择城市','请选择区县'],
                info:{
                    province_id:0,
                    provinceList:[],
                    city_id:0,
                    cityList:[],
                    country_id:0,
                    countryList:[],
                    address:''
                }
            }
        },
        mounted(){
            this.getProvince()
        },
        methods:{
            changeArea(pid){
                return userApi.getAreaList(pid)
            },
            showInfo(err){
                mui.toast('获取城市信息失败'+err)
            },
            getProvince(){//进入时触发,获取省列表
              this.changeArea(0).then(rs=>{
                  this.info.provinceList = rs.list
              },this.showInfo)
            },
            getCity(){//选择完省后,获取城市列表
                this.pre_text = []
                this.changeArea(this.info.province_id).then(rs=>{
                    this.info.cityList = rs.list
                },this.showInfo)
            },
            getCountry(){//选取城市后,获取区县列表
                this.changeArea(this.info.city_id).then(rs=>{
                    this.info.countryList = rs.list
                },this.showInfo)
            },
            appendAddress(){
                let {province_id,city_id,country_id,address} = this.info

                let allValue = province_id && city_id && country_id && address
                if (!allValue){
                    mui.toast('请补全信息')
                }else {
                    let provinceSelect = document.getElementById('province')
                    let citySelect = document.getElementById('city')
                    let countrySelect = document.getElementById('country')

                    let province = provinceSelect.options[provinceSelect.selectedIndex].innerHTML
                    let city = citySelect.options[citySelect.selectedIndex].innerHTML
                    let country = countrySelect.options[countrySelect.selectedIndex].innerHTML

                    let btn = mui('.bottom-btn')
                    btn.button('loading')
                    userApi.updateAdress({
                        province,
                        city,
                        country,
                        province_id,
                        city_id,
                        country_id,
                        address
                    }).then((rs)=>{
                        btn.button('reset')
                        mui.toast('地址更新成功')
                        this.$router.back()
                    },err=>{
                        console.log(err)
                    })
                }

            }
        },
        components:{
            navi
        }
    }
</script>

<style scoped>
    .bottom-btn{
        padding: 6px 12px;
        margin: 15px auto;
        width: 90%;
        line-height: 32px;
    }
</style>