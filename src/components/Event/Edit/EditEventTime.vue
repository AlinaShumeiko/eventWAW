<template>
    <v-dialog width="350px" persistent v-model="editDialog">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" class="accent mr-2 my-2" small>
                Zmień czas
            </v-btn>
        </template>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title class="accent--text text-uppercase
                    text-center font-weight-light">Zmień czas</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-time-picker v-model="editedTime" style="width: 100%" actions format="24hr">
                            <template>
                                <v-spacer></v-spacer>
                                <v-btn
                                        text
                                        class="primary"
                                        @click.native="editDialog = false">Close</v-btn>
                                <v-btn
                                        text
                                        class="primary"
                                        @click.native="onSaveChanges">Save</v-btn>
                            </template>
                        </v-time-picker>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: ['event'],
        data () {
            return {
                editDialog: false,
                editedTime: null
            }
        },
        methods: {
            onSaveChanges () {
                const newDate = new Date(this.event.date)
                const hours = this.editedTime.match(/^(\d+)/)[1]
                const minutes = this.editedTime.match(/:(\d+)/)[1]
                newDate.setHours(hours)
                newDate.setMinutes(minutes)
                this.$store.dispatch('updateEventData', {
                    id: this.event.id,
                    date: newDate
                })
            }
        },
        created () {
            this.editedTime = new Date().getHours() + ':' + new Date().getMinutes()
        }
    }
</script>
