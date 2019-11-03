<template>
    <v-dialog width="400px" v-model="modal">

        <template v-slot:activator="{ on }">
            <v-btn v-on="on"  class="accent" fab>
                <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
        </template>

        <v-card>
            <v-container>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-title>
                            <h4 class="accent--text text-uppercase text-center font-weight-light">Zmień wydarzenie</h4>
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field
                                    name="title"
                                    label="Nazwa"
                                    v-model="editedTitle"
                                    type="text"
                                    required>
                            </v-text-field>
                            <v-text-field
                                    name="title"
                                    label="Miejsce"
                                    v-model="editedLocation"
                                    type="text"
                                    required>
                            </v-text-field>
                            <v-text-field
                                    name="description"
                                    label="Opis"
                                    v-model="editedDescription"
                                    type="text"
                                    multi-line
                                    required>
                            </v-text-field>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row>
                    <v-flex xs12 >
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="primary" @click="onCancel">Zamknij</v-btn>
                            <v-btn class="primary" @click="onSave">Akceptuj</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>

    </v-dialog>

</template>

<script>
    export default {
        props: ['event'],
        data(){
           return {
               modal: false,
               editedTitle: this.event.title,
               editedLocation: this.event.location,
               editedDescription: this.event.description
           }
           },
        methods: {
            onCancel(){
                this.editedDescription = this.event.description
                this.editedTitle = this.event.title
                this.editedLocation = this.event.location
                this.modal = false
            },
            onSave(){
                if (this.editedDescription !== '' && this.editedTitle !== ''){
                    this.$store.dispatch('updateEventData', {
                        title: this.editedTitle,
                        description : this.editedDescription,
                        location: this.editedLocation,
                        id: this.event.id
                    })
                    this.modal = false
                }

            }
        }
        }

</script>

