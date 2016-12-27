/**
 * Created by xiaos on 16/12/13.
 */
import Vue from 'vue'
import {handleJsonErr} from '../utils/handleError'
import parse from 'url-parse'
import domain from './domain'

//处理登录成功后的操作
const handleLogin = (rs)=>{
    return new Promise((s,f)=>{
        //登录成功 存入token
        if (rs.token){
            localStorage.setItem('token',rs.token)
            s(rs.errdesc)
        }else {
            console.error('no token return')
            f('no token return')
        }
    })
}

const userUrl = domain.uicApi
const mineUrl = domain.myApi

var token = localStorage.getItem('token')
if (!token) {
    console.log('未存储token')
}

export default {
    //密码登录
    loginByMobileAndPasswd(mobile,passwd){
        return Vue.http.post(userUrl+'login',
            {
                mobile,
                passwd
            })
            .then(handleJsonErr)
            .then(handleLogin)
    },
    //验证码登录
    loginByMoileAndAuthCode(mobile,authCode){
        return Vue.http.post(userUrl+'loginWithCode',
            {
                mobile,
                auth_code:authCode
            })
            .then(handleJsonErr)
            .then(rs=>handleLogin(rs),err=>{
                throw err
            })
    },
    //发送登录验证码
    sendLoginAuthCode(mobile){
        return Vue.http.post(userUrl+'getLoginCode',
            {
                mobile
            })
            .then(handleJsonErr)
    },
    //修改密码
    updatePasswdByAuthCode(mobile,authCode,passwd,cpasswd){
        return Vue.http.post(userUrl+'updatePasswordWithCode',
            {
                mobile,
                auth_code : authCode,
                passwd,
                cpasswd
            },{params:{token}})
            .then(handleJsonErr)
    },
    //发送修改密码的验证码
    sendUpdatePasswdAuthCode(mobile){
        return Vue.http.post(userUrl+'getForgotCode',
            {
                mobile
            },{params:{token}})
            .then(handleJsonErr)
    },

    //发送注册验证码
    sendRegsiterAuthCode(mobile,invitation){
        return Vue.http.post(userUrl+'getAuthCode',
            {
                mobile,
                invitation
            })
            .then(handleJsonErr)
    },
    //注册
    regsiter(mobile,invitation,authCode,passwd,cpasswd){
        return Vue.http.post(userUrl+'reg',
            {
                mobile,
                invitation,
                auth_code:authCode,
                passwd,
                cpasswd
            },{params:{token}})
            .then(handleJsonErr)
            .then(rs=>handleLogin(rs))
    },
    getInfo(){//获取我的界面头部信息
        return Vue.http.get('http://app.boris.pub/v1/my/getInfo',{params:{token}})
            .then(handleJsonErr)
            .then(rs=>{
                return new Promise((s,f)=>{
                    let errno = rs.errno
                    if (errno != 0){//错误处理
                        let msgMap = {
                            10010:'尚未登录',
                            10012:'身份验证失效,请注销后重新登录'
                        }
                        mui.toast(msgMap[errno],{
                            type:'div'
                        })
                        f(errno)
                    }else {
                        s(rs)
                    }
                })
            },err=>{
                throw err
            })
    },
    getUserInfo(type){//获取用户银行信息
        return Vue.http.get('http://app.boris.pub/v1/my/getUserBankInfo',{params:{token}})
            .then(handleJsonErr)
            .then(rs=>{
                //银行数据
                let {name,id,bank_name,card_no} = rs.userbankinfo
                let {mobile,province,city,county,address,avatar,is_set_password} = rs.userinfo
                let fullAdress = address?`${province}-${city}-${county}-${address}`:'未设置-设置'
                let passwdText = is_set_password == 1?'已设置-修改':'未设置-设置'
                let bankData = {
                    name,
                    id,
                    mobile,
                    bank_name,
                    card_no,
                    address:fullAdress,
                    passwdText,
                    avatar
                }

                //提现金额数据
                let {capital,lockedPromotionGains,currentMonthApplyWithdrawNum} = rs.userinfo

                let withdrawNums = parseInt(currentMonthApplyWithdrawNum)//当月提现次数
                let total = (parseFloat(capital) + parseFloat(lockedPromotionGains)).toFixed(2)//账号总额

                let withdrawData = {
                    nums:[capital, lockedPromotionGains, total],
                    withdrawNums,
                    bank_name,
                    card_no,
                }


                let resultMap = {
                    'bank':bankData,
                    'withdraw':withdrawData
                }

                let result = resultMap[type] || bankData

                return new Promise((s,f)=>{
                    s(result)
                })
            },err=>{
                console.error(err)
                throw err
            })
    },
    sendBindingCardAuthCode(){//发送绑定银行卡验证码
        return Vue.http.get(mineUrl+'getBindingCardAuthCode',{params:{token}})
            .then(handleJsonErr)
    },
    bindCard({name,id,bank_name,card_no,auth_code}){//修改银行卡
        return Vue.http.post(mineUrl+'bindingCard',{
            name,
            id,
            bank_name,
            card_no,
            auth_code
        },{params:{token:token}})
            .then(handleJsonErr)
    },
    //上传头像
    uploadAvatar(base64Str){
      return Vue.http.post(mineUrl+'uploadAvatar',{
          file:base64Str
      },{params:{token}})
          .then(handleJsonErr)
    },
    //修改收货地址
    updateAdress({
        province,
        province_id,
        city,
        city_id,
        country:county,
        country_id:county_id,
        address
    }){
        return Vue.http.post(mineUrl+'updateAddress',{
            province,
            province_id,
            city,
            city_id,
            county,
            county_id,
            address
        },{params:{token}})
            .then(handleJsonErr)
    },
    //获取地区列表
    getAreaList(pid){
        return Vue.http.post('http://app.boris.pub/v1/app/getArea?token=1000044-07eb93eb36b409b15e41699d7bc479ea',{
                pid:pid
            })
            .then(rs=>rs.json())
    },
    //修改密码
    updatePasswd({old_password,new_password,confirm_password}){
        return Vue.http.post(mineUrl+'updatePassword',{
            old_password,
            new_password,
            confirm_password
        },{params:{token}})
            .then(handleJsonErr)
    },

    //钱包
    //充值和提现信息列表
    getWalletInfoList(){
        return Vue.http.post(mineUrl+'capitalList',{

        },{params:{token}})
            .then(handleJsonErr)
    },
    //充值操作
    walletRechargeAction(recharge_num){
        return Vue.http.post(mineUrl+'addRecharge',{
            recharge_num
        },{params:{token}})
            .then(handleJsonErr)
    },
    //提现操作
    walletWithdrawAction(apply_num,auth_code){
        return Vue.http.post(mineUrl+'applyWithdraw',{
                apply_num,
                auth_code
            },{params:{token}})
            .then(handleJsonErr)
    },
    //提现验证码
    getWithdrawAuthCode(){
        return Vue.http.get(mineUrl+'getWithDrawAuthCode',{params:{token}})
            .then(handleJsonErr)
    },
    //交易记录
    getOrderRelative(){
        return Vue.http.get(mineUrl+'getOrderRelative',{params:{token}})
            .then(handleJsonErr)
            .then(rs=>{
                let status_text = {
                    '0':'未付款',
                    '1':'已付款,等待确认',
                    '99':'付款完成'
                }
                let investmentDetail = rs.list.map(order=>{
                    //订单状态
                    order.status_text = status_text[order.status] || '已取消'
                    //支付路径
                    let url = parse(order.href, true)
                    let {order_id,id,number} = url.query
                    order.path = {name:'orderDetail', query:{order_id,id,number}}
                    return order
                }) //投资明细

                let distributeDetail = rs.distribute//分红明细
                let distributeNums = rs.userinfo.dividend_num//已分红次数
                let distributeTotal = rs.userinfo.dividend_capital//已分红总数额

                let result = {
                    investmentDetail,
                    distributeDetail,
                    distributeNums,
                    distributeTotal
                }
                return new Promise(s=>{
                    s(result)
                })
            },err=>{
                console.log(err)
                throw err
            })
    },
    //我的会员
    getMembers(){//邀请情况
        return Vue.http.get(mineUrl+'getMyMember',{params:{token}})
            .then(handleJsonErr)
            .then(rs=>{
                let {recommend_num,valid_recommend_num,recommend_limit_num} = rs.userinfo
                let left_num = parseInt(recommend_limit_num) - parseInt(recommend_num)
                let nums = [recommend_num,valid_recommend_num,left_num]
                let members = rs.list
                return new Promise(s=>{
                    s({nums,members})
                })
            },err=>{
                throw err
            })
    },
    //邀请注册验证码
    getInvitationAuthCode(){
        return Vue.http.get(mineUrl+'getInvitationAuthCode',{params:{token}})
            .then(handleJsonErr)
    },
    //邀请注册
    invitationUser({auth_code,mobile}){
        return Vue.http.post(mineUrl+'invitationUser',{
            auth_code,
            mobile
        },{params:{token}})
            .then(handleJsonErr)
    },
    //佣金明细
    promotionList(){
        return Vue.http.get(mineUrl+'promotionList',{params:{token}})
            .then(handleJsonErr)
    }

}