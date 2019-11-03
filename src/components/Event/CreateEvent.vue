<template>
    <v-container>
        <v-layout row class="my-4">
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="accent--text text-uppercase
                    text-center font-weight-light">
                    Dodaj nowe wydarzenie
                </h1>
            </v-flex>
        </v-layout>
        <v-layout row class="ml-3">
            <v-flex>
                <form @submit.prevent="createEvent">
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="title"
                                label="Nazwa"
                                id="title"
                                v-model="title"
                                required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                    name="location"
                                    label="Miejsce"
                                    id="location"
                                    v-model="location"
                                    required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn
                                    :loading="loading"
                                    :disabled="loading"
                                    class="ma-2 white--text primary"
                                    fab
                                    @click="Upload">
                                <v-icon dark>mdi-cloud-upload</v-icon>
                            </v-btn>
                            <input
                                    ref="fileInput"
                                    type="file"
                                    style="display: none;"
                                    accept=".png, .jpg, .jpeg"
                                    @change = "onFileChange">
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <img :src="imageUrl" height="180" v-if="imageUrl">
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-textarea
                                    name="description"
                                    label="Opis"
                                    id="description"
                                    v-model="description"
                                    required>
                            </v-textarea>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <h4 class="accent--text
                            text-uppercase
                            text-center
                            mb-3">
                                Wybierz Datę & Czas
                            </h4>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mb-2">
                        <v-flex xs11 sm6 offset-sm3>
                            <v-date-picker v-model="date"></v-date-picker>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs11 sm6 offset-sm3 class="mb-2">
                            <v-time-picker v-model="time" format="24hr"></v-time-picker>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn
                                    class="accent" text
                                    :loading="loading"
                                    :disabled="!formIsValid || !this.image"
                                    type="submit">
                                Dodaj nowe Wydarzenie
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data () {
            return{
                title:'',
                location:'',
                image: null,
                imageUrl:'',
                description:'',
                date: new Date().toISOString().substr(0, 10),
                time: new Date().getHours() + ':' + new Date().getMinutes()
            }

        },
        computed: {
            formIsValid () {
                return this.title !== '' &&
                    this.location !== '' &&
                    this.description !== ''
            },
            submittableDateTime (){
                const date = new Date(this.date)
                if (typeof this.time === 'string') {
                    let hours = this.time.match(/^(\d+)/)[1]
                    const minutes = this.time.match(/:(\d+)/)[1]
                    date.setHours(hours)
                    date.setMinutes(minutes)
                } else {
                    date.setHours(this.time.getHours())
                    date.setMinutes(this.time.getMinutes())
                }
                return date
            },
            loading() {
                return this.$store.getters.loading
            }
        },
        methods: {
            createEvent () {
                if(!this.formIsValid || !this.image) {
                    return
                }
                const data = {
                    title: this.title,
                    location: this.location,
                    image: this.image,
                    description: this.description,
                    date: this.submittableDateTime
                }
                this.$store.dispatch('createEvent', data)
                this.$router.push('/event')

            },
            Upload () {
                this.$refs.fileInput.click()
            },
            onFileChange (event) {
                const file = event.target.files[0]
                const reader = new FileReader()
                reader.onload =() => {
                    this.imageUrl = reader.result
                }
                reader.readAsDataURL(file)
                this.image = file
            }
        }
    }
</script>
