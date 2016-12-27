/**
 * Created by xiaos on 16/12/13.
 */
import Vue from 'vue'
import {handleJsonErr} from '../utils/handleError'
import parse from 'url-parse'
import domain from './domain'

//处理首页轮播数据
const handleBannerData = (data)=>{
    let bannerDatas = data.map(banner=>{
        banner.path = {name:'detail'}
        banner.loop = false
        return banner
    })
    let length = bannerDatas.length
    if (length > 0){
        let first = JSON.parse(JSON.stringify(bannerDatas[length-1]))
        let last = JSON.parse(JSON.stringify(bannerDatas[0]))
        first.loop = true
        last.loop = true
        bannerDatas.unshift(first)
        bannerDatas.push(last)
    }
    return bannerDatas
}

//处理首页产品数据
const handleProductData = (data)=>{
    return data.map(product=>{
        let url = parse(product.href, true)
        let id = url.query.id
        let type = url.query.type
        product.path = {name:'buyTree',query:{type:type,id:id}}
        return product
    })
}

const mainUrl = domain.adApi

var token = localStorage.getItem('token')
if (!token) {
    console.log('未存储token')
}

export default {
    getHomeList(){//获取首页列表

        return Vue.http.get(mainUrl+'index/getData')
            .then(handleJsonErr)
            .then(rs=>{
                //顶部轮播图片
                const bannerItems = handleBannerData(rs.home_banner_list)
                //产品列表数据
                const homeItems = handleProductData(rs.home_recommend_list)
                //数据看板数据
                const saleData = rs.sale_data
                return new Promise((s)=>{
                    s({bannerItems,homeItems,saleData})
                })
            },err=>{
                throw err
            })
    },
    getTreeDetail(id){//认购信息
        return Vue.http.post(mainUrl+'forest/getDetail',{id},{params:{token}})
            .then(handleJsonErr)
            .then(rs=>{
                const bannerItems = handleBannerData(rs.data.album)
                const data = rs.data
                const userinfo = rs.userinfo
                return new Promise(s=>{
                    s([bannerItems,data,userinfo])
                })
            },err=>{
                throw err
            })
    },
    addOrder({id,number}){//添加订单
        return Vue.http.post(mainUrl+'pay/addOrder',{
            id,
            number
        },{params:{token}})
            .then(handleJsonErr)
    },
    saveOrder({forest_id,number,order_id,pay_channel}){//用户确认提交订单
        return Vue.http.post(mainUrl+'pay/saveOrder',{
            forest_id,//林场id
            number,//认购亩数
            order_id,//订单id
            pay_channel//支付方式 [线下支付,余额支付]
        },{params:{token}})
            .then(handleJsonErr)
    }
}
