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
        <v-layout row wrap class="my-3" v-if="!loading">
            <v-flex xs12>
                <v-carousel>
                    <v-carousel-item
                            v-for="event in events"
                            :src="event.imageUrl"
                            :key="event.id"
                            @click="onLoadEvent(event.id)">
                        <div class="title">
                            {{event.title}}
                        </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm6 class="text-xs-center text-sm-right">
                <v-btn large router to="/allevents" class="primary ma-4">
                    Wszystkie wydarzenia
                    <v-icon right medium>dns</v-icon>
                </v-btn>
            </v-flex>

            <v-flex xs12 sm6 class="text-xs-center text-sm-left">
                <v-btn large router to="/event/new" class="primary ma-4">
                    Organizuj wydarzenie
                    <v-icon right medium>add_circle_outline</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        computed: {
            events(){
                return this.$store.getters.featuredEvents
            },
            loading () {
                return this.$store.getters.loading
            }
        },
        methods:{
            onLoadEvent (id){
                if(this.$store.getters.user !== null && this.$store.getters.user !== undefined){
                    this.$router.push('/event/' + id)
                } else{
                    this.$router.push('/allevents')
                }
            }
        }
    }
</script>

<style scoped>
    .title{
        position: absolute;
        bottom: 50px;
        background-color: rgba(0, 0, 0, 0.72);
        color: white;
        font-size: 2em;
        padding: 20px;
        margin-bottom: 0;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%)
    }


</style>
