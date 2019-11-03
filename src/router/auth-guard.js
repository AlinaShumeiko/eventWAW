import store from '../store'


export default  function ( to , from, next){
    if(!store.getters.isUserLoggedIn){

    if (store.getters.user!==null && store.getters.user!== undefined) {
        next()
    } else {
        next('/signin?signinError=true')
    }}else {
        next()
    }
}
