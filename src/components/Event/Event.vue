<template>
   <v-container>
       <v-layout row v-if="!loading && events.length !== 0 ">
       <v-card
                 wrap
                 v-for="event in events" :key="event.id"
                 class="mb-2 primary"
                 width="850"

                 >
                   <v-container fluid>
                       <v-layout>
                           <v-flex xs5 sm4 md3>
                               <v-img
                                   :src="event.imageUrl"
                                   height="150px"
                                   class="ml-3">
                               </v-img>
                           </v-flex>
                           <v-flex xs7 sm8 md9>
                               <v-card-title primary-title>
                                   <div>
                                       <h4 class="white--text text-uppercase font-weight-light headline mb-0">
                                           {{ event.title}}
                                           </h4>
                                       <h5 style="font-size:medium">{{event.date | date }}</h5>
                                   </div>
                               </v-card-title>
                               <v-card-actions>
                                   <v-btn text outlined class="accent" :to="'/event/' + event.id">
                                       Sprawdź wydarzenie
                                       <v-icon light>arrow_forward</v-icon>
                                   </v-btn>
                               </v-card-actions>
                           </v-flex>
                       </v-layout>
                   </v-container>
               </v-card>
           </v-layout>
       <v-layout v-else-if="!loading && events.length === 0">
           <v-flex xs12 class="text-xs-center">
                <h1 class="accent--text text-uppercase
               text-center font-weight-light">
                    Dodaj swoje pierwsze wydarzenie !
                </h1>
           </v-flex>
       </v-layout>
       <v-layout v-else>
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
   </v-container>
</template>

<script>
    export default {
        computed: {
            events () {
                return this.$store.getters.myEvents
            },
            loading () {
                return this.$store.getters.loading
            }
        }
    }
</script>
