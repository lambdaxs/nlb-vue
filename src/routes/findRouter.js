/**
 * Created by xiaos on 16/12/11.
 */
import find from 'components/find.vue'
import findCustom from 'components/find/findCustom.vue'
import customDetail from 'components/find/customDetail.vue'
import findImage from 'components/find/findImage.vue'
import knowledge from 'components/find/findKnowledgeList.vue'

export default [
    {
        name:'find',
        path:'/find',
        component:find
    },
    {
        name:'custom',//客服帮助
        path:'/find/custom',
        component:findCustom
    },{
        name:'customDetail',//客服帮助详细信息
        path:'/find/custom/detail',
        component:customDetail
    },{
        name:'findImage',//项目/公司介绍 风险保障
        path:'/find/image',
        component:findImage
    },{
        name:'findKnowledge',//公司新闻和众筹知识
        path:'/find/knowledge',
        component:knowledge
    }
]