import * as firebase from 'firebase'

class Event{
    constructor (title, description,  ownerId, location ,imageUrl =' ', date, id = null)
    {
        this.title = title
        this.description = description
        this.ownerId = ownerId
        this.location = location
        this.imageUrl = imageUrl
        this.date = date
        this.id = id
    }
}

export default {
    state: {
        loadedEvents: []
    },
    mutations: {
        createEvent ( state , payload){
            state.loadedEvents.push(payload)
        },
        loadEvents (state, payload) {
            state.loadedEvents = payload
        },
        updateEvent (state, payload) {
            const event = state.loadedEvents.find(event => {
                return event.id === payload.id
            })
            if (payload.title) {
                event.title = payload.title
            }
            if (payload.description) {
                event.description = payload.description
            }
            if (payload.location) {
                event.location = payload.location
            }
            if (payload.date) {
                event.date = payload.date
            }
        }
    },
    actions: {
        async createEvent({commit, getters}, payload) {
            commit('clearError')
            commit('setLoading', true)

            const image = payload.image

            try {
                const newEvent = new Event(
                    payload.title,
                    payload.description,
                    getters.user.id,
                    payload.location,
                    '',
                    payload.date.toISOString()
                )

                const ev = await firebase.database().ref('events').push(newEvent)
                const imageExt = image.name.slice(image.name.lastIndexOf('.'))

                const StorageReference = firebase.storage().ref(`events/${ev.key}.${imageExt}`)
                StorageReference.put(image)
                    .then(function (snapshot) {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        console.log('Upload is ' + progress + '% done')
                    })
                    .then(function () {
                        StorageReference.getDownloadURL()
                            .then(function (imageUrl) {
                                firebase.database().ref('events').child(ev.key).update({imageUrl})
                                commit('setLoading', false)
                                commit('createEvent', {
                                    ...newEvent,
                                    id: ev.key,
                                    imageUrl: imageUrl
                                })
                            })
                    })

            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        },
        async fetchEvents({commit}) {
            commit('clearError')
            commit('setLoading', true)

            const result = []

            try {
                const fbValue = await firebase.database().ref('events').once('value')
                const events = fbValue.val()

                Object.keys(events).forEach(key => {
                    const event = events[key]
                    result.push(
                        new Event(
                            event.title,
                            event.description,
                            event.ownerId,
                            event.location,
                            event.imageUrl,
                            event.date,
                            key
                        )
                    )
                })
                commit('loadEvents', result)
                commit('setLoading', false)
            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }

        },
        updateEventData({commit}, payload) {
            commit('setLoading', true)
            const updateObj = {}
            if (payload.title) {
                updateObj.title = payload.title
            }
            if (payload.description) {
                updateObj.description = payload.description
            }
            if (payload.date) {
                updateObj.date = payload.date
            }
            if (payload.location) {
                updateObj.location = payload.location
            }
            firebase.database().ref('events').child(payload.id).update(updateObj)
                .then(() => {
                    commit('setLoading', false)
                    commit('updateEvent', payload)
                })
                .catch(error => {
                    console.log(error)
                    commit('setLoading', false)
                })
        }
    },
    getters: {
        loadedEvents (state) {
            return state.loadedEvents.sort((eventA, eventB) => {
                return eventA.date > eventB.date
            })
        },
        featuredEvents (state, getters){
            return getters.loadedEvents.sort(() => 0.5 - Math.random()).slice(0, 4)
        },
        myEvents (state,getters) {
            if(getters.isUserLoggedIn) {
                return state.loadedEvents.filter(event => {
                    return event.ownerId === getters.user.id
                })
            }
            else{
                return ''
            }
        },
        eventId (state) {
            return eventId => {
                return state.loadedEvents.find(event =>
                    event.id === eventId
                )
            }
        }
    }
}
