import * as firebase from 'firebase'

class User{
    constructor (id, registeredEvents, fbKeys) {
        this.id = id,
        this.registeredEvents = registeredEvents
        this.fbKeys = fbKeys
    }
}

export default {
    state: {
        user: null,
        registeredEvents:[]
    },
    mutations: {
        setUser (state, payload) {
            state.user = payload
        },
        registerUserForEvent (state, payload) {
            const id = payload.id
            if (state.user.registeredEvents.findIndex(event => event.id === id) >= 0) {
                return
            }
            state.user.registeredEvents.push(id)
            state.user.fbKeys[id] = payload.fbKey
        },
        unregisterUserFromEvent (state, payload) {
            const registeredEvents = state.user.registeredEvents
            registeredEvents.splice(registeredEvents.findIndex(event => event.id === payload), 1)
            Reflect.deleteProperty(state.user.fbKeys, payload)
        },
    },
    actions: {
        async signUpUser ({commit}, {email,password}) {
            commit('clearError')
            commit('setLoading', true)
            try{
                const userCreds = await firebase.auth().createUserWithEmailAndPassword(email, password)
                commit ('setUser' , new User(userCreds.user.uid,[],{}))
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        async signInUser ({commit}, {email,password}) {
            commit('clearError')
            commit('setLoading', true)
            try{
                const userCreds = await firebase.auth().signInWithEmailAndPassword(email, password)
                commit ('setUser' , new User(userCreds.user.uid,[],{}))
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        autoLoginUser ({commit}, payload){
            commit('setUser', new User(payload.uid,[],{}))
        },
        LogoutUser ({commit}){
            firebase.auth().signOut()
            commit('setUser', null)
        },
        registerUserForEvent ({commit, getters}, payload) {
            commit('setLoading', true)
            const user = getters.user
            firebase.database().ref('/users/' + user.id).child('/registrations/')
                .push(payload)
                .then(data => {
                    commit('setLoading', false)
                    commit('registerUserForEvent', {id: payload, fbKey: data.key})
                })
                .catch(error => {
                    commit('setError', error.message)
                    commit('setLoading', false)
                })
        },
        unregisterUserFromEvent ({commit, getters}, payload) {
            commit('setLoading', true)
            const user = getters.user
            if (!user.fbKeys) {
                return
            }
            const fbKey = user.fbKeys[payload]
            firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey)
                .remove()
                .then(() => {
                    commit('setLoading', false)
                    commit('unregisterUserFromEvent', payload)
                })
                .catch(error => {
                    commit('setError', error.message)
                    commit('setLoading', false)
                })
        },
        fetchUserData ({commit, getters}) {
            commit('setLoading', true)
            firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
                .then(data => {
                    const dataPairs = data.val()
                    let registeredEvents = []
                    let swappedPairs = {}
                    for (let key in dataPairs) {
                        registeredEvents.push(dataPairs[key])
                        swappedPairs[dataPairs[key]] = key
                    }
                    const updatedUser = {
                        id: getters.user.id,
                        registeredEvents: registeredEvents,
                        fbKeys: swappedPairs
                    }
                    commit('setLoading', false)
                    commit('setUser', updatedUser)
                })
                .catch(error => {
                    commit('setError', error.message)
                    commit('setLoading', false)
                })
        },
    },
    getters: {
        user (state) {
            return state.user
        },
        isUserLoggedIn (state){
            return state.user !== null
        }
    }
}
