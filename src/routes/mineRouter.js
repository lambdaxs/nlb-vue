/**
 * Created by xiaos on 16/12/11.
 */
import mine from 'components/mine.vue'

import auth from '../components/mine/auth.vue'

import detail from '../components/home/homeDetail.vue'
import container from '../components/public/container.vue'

//个人资料
import profile from '../components/mine/profile/profile.vue'
import updateBank from '../components/mine/profile/updateBank.vue'
import updateAddress from '../components/mine/profile/updateAdress.vue'
import updatePasswd from '../components/mine/profile/updatePasswd.vue'


//我的钱包
import wallet from '../components/mine/wallet/wallet.vue'
import recharge from '../components/mine/wallet/recharge.vue'
import withdraw from '../components/mine/wallet/withdraw.vue'


//交易记录
import orders from '../components/mine/orders/orders.vue'
//订单支付

//我的会员
import member from '../components/mine/member/member.vue'
import vipReg from '../components/mine/member/vipReg.vue'

//我的佣金
import promotion from '../components/mine/promotion/promotion.vue'

//申请回购
import buyback from '../components/mine/buyback/buyback.vue'

//我的客服
import custom from '../components/mine/custom/custom.vue'

export default [
    {
        name:'mine',
        path:'/mine',
        component:mine
    },
    {//个人资料
        name:'mineProfile',
        path:'/mine/profile',
        component:profile,
        meta:{requireAtuh:true},
    },
    {//更新个人资料信息
        name:'updateInfo',
        path:'/mine/updateInfo',
        component:container,
        meta:{requireAtuh:true},
        children:[
            {//修改收货地址
                name:"updateAddress",
                path:'address',
                component:updateAddress,
                meta:{requireAtuh:true}
            },
            {//修改银行卡信息
                name:"updateBank",
                path:'bank',
                component:updateBank,
                meta:{requireAtuh:true}
            },
            {//修改登录密码
                name:"updatePasswd",
                path:'passwd',
                component:updatePasswd,
                meta:{requireAtuh:true}
            },
        ]
    },

    {//我的钱包
        name:'mineWallet',
        path:'/mine/wallet',
        component:wallet,
        meta:{requireAtuh:true},
    },
    {//钱包操作
        name:'walletContainer',
        path:'/mine/wallet/action',
        component:container,
        meta:{requireAtuh:true},
        children:[
            {//充值操作
                name:'walletRecharge',
                path:'recharge',
                component:recharge,
                meta:{requireAtuh:true}
            },{//提现操作
                name:'walletWithdraw',
                path:'withdraw',
                component:withdraw,
                meta:{requireAtuh:true}
            }
        ]
    },

    {//我的林场
        name:'mineTree',
        path:'/mine/tree',
        component:detail,
        meta:{requireAtuh:true}
    },
    {//交易记录
        name:'mineTrade',
        path:'/mine/trade',
        component:orders,
        meta:{requireAtuh:true}
    },

    {//我的会员
        name:'mineMember',
        path:'/mine/member',
        component:member,
        meta:{requireAtuh:true}
    },
    {//邀请注册
        name:'vipReg',
        path:'/mine/member/reg',
        component:vipReg
    },

    {//佣金
        name:'minePromotion',
        path:'/mine/promotion',
        component:promotion,
        meta:{requireAtuh:true}
    },

    {//申请回购
        name:'mineBuyback',
        path:'/mine/buyBack',
        component:buyback,
        meta:{requireAtuh:true}
    },
    {//合同与保单
        name:'mineContract',
        path:'/mine/contract',
        component:detail,
        meta:{requireAtuh:true}
    },
    {//我的专属客服
        name:'mineCustom',
        path:'/mine/custom',
        component:custom
    },
    {//登录
        name:'auth',
        path:'/mine/auth',
        component:auth
    },
]