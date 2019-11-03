<template>
    <v-container>
        <v-layout>
            <v-flex xs12 class="text-center ">
                <v-progress-circular
                        indeterminate
                        class="primary--text"
                        :width="6"
                        :size="50"
                        v-if="loading"
                >
                </v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row wrap v-if="!loading" >
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h4 class="accent--text text-uppercase
                        font-weight-light headline mb-0">
                            {{event.title}}
                        </h4>
                        <v-spacer></v-spacer>
                        <addEditEvent :event="event" v-if="isOwner"></addEditEvent>
                    </v-card-title>
                        <v-img
                                :src="event.imageUrl"
                                height="400px"
                                class="ma-3">
                        </v-img>
                    <v-card-text>
                        <div class="font-weight-regular error--text">{{event.date | date}} - {{event.location}}</div>
                        <div>
                            <addEditEventDate  :event="event" v-if="isOwner" class="editDate"></addEditEventDate>
                            <addEditEventTime  :event="event" v-if="isOwner" ></addEditEventTime>
                        </div>
                        <div>{{event.description}}</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <addRegisterDialog
                                :eventId="event.id"
                                class="accent mx-4"
                                v-if="userIsAuthenticated && !isOwner">
                        </addRegisterDialog>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import EditEvent from './Edit/EditEvent'
    import EditEventDate from './Edit/EditEventDate'
    import EditEventTime from './Edit/EditEventTime'
    import RegisterDialog from './Registration/RegisterDialog'

    export default {
        props: ['id'],
        computed: {
            event () {
                const id = this.id
                return this.$store.getters.eventId(id)
            },
            loading () {
                return this.$store.getters.loading
            },
            isOwner () {
                return this.event.ownerId === this.$store.getters.user.id
            },
            userIsAuthenticated () {
                return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            },
        },
        components: {
            addEditEvent: EditEvent,
            addEditEventDate: EditEventDate,
            addEditEventTime: EditEventTime,
            addRegisterDialog: RegisterDialog,
        }
    }
</script>

<style>
    .editDate{
        margin-right:10px;
    }

</style>


