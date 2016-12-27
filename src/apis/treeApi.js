/**
 * Created by xiaos on 16/12/13.
 */
import Vue from 'vue'
import parse from 'url-parse'
import domain from './domain'

let url = domain.fApi

export default {
    getTreeList(){
        return Vue.http.get(url+'getList')
            .then(rs=>rs.json())
            .then(rs=>{
                const treeItems = rs.list.map(item=>{
                    let url = parse(item.href, true)
                    let id = url.query.id
                    let type = url.query.type
                    item.path = {name:'buyTree',query:{type:type,id:id}}
                    return item
                })
                return new Promise((s)=>{
                    s(treeItems)
                })
            },err=>{
                throw err
            })
    }
}