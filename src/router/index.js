import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CreateEvent from '@/components/Event/CreateEvent'
import Event from '@/components/Event/Event'
import SignUp from '@/components/User/SignUp'
import SignIn from '@/components/User/SignIn'
import Events from '@/components/Event/Events'
import AllEvents from '@/components/Event/AllEvents'
import store from "@/store"


Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/event',
            name: 'Event',
            component: Event,
            meta: { requiresAuth: true }
        },
        {
            path: '/event/new',
            name: 'CreateEvent',
            component: CreateEvent,
            meta: { requiresAuth: true}
        },
        {
            path: '/event/:id',
            name: 'Events',
            props: true,
            component: Events,
            meta: { requiresAuth: true }
        },
        {
            path: '/signin',
            name: 'SignIn',
            component: SignIn
        },
        {
            path: '/signup',
            name: 'SignUp',
            component: SignUp
        },
        {
            path: '/allevents',
            name: 'AllEvents',
            component: AllEvents
        }
    ]
})
router.beforeEach((to, from, next) => {

    router.beforeEach((to, from, next) => {
        if (to.matched.some(record => record.meta.requiresAuth)) {
            if (!store.getters.isUserLoggedIn) {
                next('/signin?signinError=true')
            } else {
                next()
            }
        } else {
            next()
        }
    })
    next();
})

export default router
