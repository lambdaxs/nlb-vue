/**
 * Created by xiaos on 16/12/7.
 */

import homeRouter from './routes/homeRouter'
import treeRouter from './routes/treeRouter'
import findRouter from './routes/findRouter'
import mineRouter from './routes/mineRouter'

import detail from 'components/home/homeDetail.vue'


let routes = [
     {
        name:'detail',
        path:'/detail',
        component:detail
    }
]


export default routes.concat(findRouter).concat(homeRouter).concat(mineRouter).concat(treeRouter)