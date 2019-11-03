<template>
    <v-dialog width="350px" persistent v-model="editDialog">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on"  class="accent mr-2 my-2" small>
                Zmień datę
            </v-btn>
        </template>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title class="accent--text text-uppercase
                            text-center font-weight-light">Zmień datę</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-date-picker v-model="editedDate" style="width: 100%" actions>
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
                        </v-date-picker>
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
                editedDate: null
            }
        },
        methods: {
            onSaveChanges () {
                const newDate = new Date(this.event.date)
                const newDay = new Date(this.editedDate).getUTCDate()
                const newMonth = new Date(this.editedDate).getUTCMonth()
                const newYear = new Date(this.editedDate).getUTCFullYear()
                newDate.setUTCDate(newDay)
                newDate.setUTCMonth(newMonth)
                newDate.setUTCFullYear(newYear)
                this.$store.dispatch('updateEventData', {
                    id: this.event.id,
                    date: newDate
                })
            }
        },
        created () {
            this.editedDate = new Date(this.event.date).toISOString().slice(0,10)
        }
    }
</script>
