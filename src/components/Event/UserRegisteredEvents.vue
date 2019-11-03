<template>
    <v-container>
        <v-layout row>
            <v-flex v-if="register">
                ok
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        computed: {
            register () {
                return console.log(this.$store.getters.user.registeredEvents.findIndex(eventId => {
                    return eventId === this.eventId
                }))
            }
        }
    }
</script>

