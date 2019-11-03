<template>
    <v-dialog persistent v-model="registerDialog">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on"  class="error mx-3">
                {{ userIsRegistered ? 'Unregister' : 'Register' }}
            </v-btn>
        </template>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title
                                v-if="userIsRegistered"
                                class="accent--text text-uppercase font-weight-light"
                        >
                            Chcesz uchylić swoją rejestrację?
                        </v-card-title>
                        <v-card-title
                                v-else
                                class="accent--text text-uppercase font-weight-light"
                        >
                            Chcesz zarejestrować sie na wydarzenie?
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text class="font-weight-regular error--text">Zawsze możesz to zmienić!</v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn
                                    class="primary"
                                    text
                                    @click="registerDialog = false">Nie</v-btn>
                            <v-btn
                                    class="primary"
                                    text
                                    @click="onAgree">Tak</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: ['eventId'],
        data () {
            return {
                registerDialog: false
            }
        },
        computed: {
            userIsRegistered () {
                return this.$store.getters.user.registeredEvents.findIndex(eventId => {
                    return eventId === this.eventId
                }) >= 0
            }
        },
        methods: {
            onAgree () {
                if (this.userIsRegistered) {
                    this.$store.dispatch('unregisterUserFromEvent', this.eventId)
                } else {
                    this.$store.dispatch('registerUserForEvent', this.eventId)
                }
            }
        }
    }
</script>
