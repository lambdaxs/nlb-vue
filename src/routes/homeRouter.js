/**
 * Created by xiaos on 16/12/11.
 */
import home from 'components/home.vue'

//认购
import buyTree from '../components/home/homeBuyTree.vue'
//订单详情
import orderDetail from '../components/home/pay/orderDetail.vue'

export default [
    {
        name:'home',
        path:'/home',
        component:home
    },
    {//认购
        name:'buyTree',
        path:'/home/buyTree',
        component:buyTree,
        meta:{requireAtuh:true}
    },
    {//订单详情
        name:'orderDetail',
        path:'/home/buyTree/orderDetail',
        component:orderDetail,
        meta:{requireAtuh:true}
    }
]