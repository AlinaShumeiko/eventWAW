<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3 class="mt-8">
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onSignin">
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="email"
                                                label="Mail"
                                                id="email"
                                                v-model="email"
                                                type="email"
                                                required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="password"
                                                label="Hasło"
                                                id="password"
                                                v-model="password"
                                                type="password"
                                                required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn type="submit" :disabled="loading" :loading="loading">
                                            Zaloguj się
                                            <span slot="loader" class="custom-loader">
                                            <v-icon light>cached</v-icon>
                                            </span>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                email: '',
                password: ''
            }
        },
        computed: {
            user () {
                return this.$store.getters.user
            },
            loading (){
                return this.$store.getters.loading
            }
        },
        methods: {
            onSignin() {
                const user = {
                    email: this.email,
                    password: this.password
                }
                this.$store.dispatch('signInUser', user)
                    .then(() => {
                        this.$router.push('/event')
                    })
                    .catch(() => {
                    })
            },
            onDismissed() {
                this.$store.dispatch('clearError')
            },
        },
        created(){
            if(this.$route.query['signinError']){
                this.$store.dispatch('setError','Musisz najpierw załogować się!')
            }
        }
    }
</script>

<style>
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>

