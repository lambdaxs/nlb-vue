/**
 * Created by xiaos on 16/12/13.
 */

export const handleErr = (rs)=>{
    return new Promise((s,f)=>{
        let {errdesc,errno} = rs
        if (errdesc){
            mui.toast(errdesc,{
                type:'div'
            })
        }
        if (errno !== 0){//错误消息
            f(errno)
        } else {//成功
            s(rs)
        }
    })
}

export const handleJsonErr = (rs)=>{
    return rs.json().then(rs=>{
        return handleErr(rs)
    })
}
