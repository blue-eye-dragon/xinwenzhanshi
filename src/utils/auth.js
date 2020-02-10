//需要设置关于用户信息的相关函数，方便后续操作
//为了方便，使用sessionStorage存储用户信息
//约定————
//存储名称为'hm-toutiao-pc-93'
//value值为字符串
const KEY = 'hm-toutiao-pc-93'
//存储用户信息
const setUser = (user) => {
    window.sessionStorage.setItem(KEY,JSON.stringify(user))
}
//获取用户信息
const getUser = () =>{
    //可能在之前没有存储用户信息，所以KEY为空，获取职位null
    //null不能操作，所以要设置或，使其为空对象
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
}
//删除用户信息
const delUser = () =>{
    window.sessionStorage.removeItem(KEY)
}
//将所设置的三个函数导出
export default {
    setUser,
    getUser,
    delUser
}