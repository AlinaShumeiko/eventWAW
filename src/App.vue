<template>
  <v-app>
    <v-app-bar app class="secondary">
      <v-app-bar-nav-icon @click.stop="sideNav = !sideNav"
                          class="hidden-sm-and-up"></v-app-bar-nav-icon>
      <router-link to="/" tag="span" style="cursor: pointer">
      <v-toolbar-title class="headline text-uppercase ml-5">
        <span>Wydarzenie
        </span>
        <span class="font-weight-light">WAW</span>
      </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
                text
                v-for="item in menuItems"
                :key="item.title"
                :to="item.link">
          <v-icon left medium>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn
                @click="onLogout"
                v-if="isUserLoggedIn"
                text>
          <v-icon left medium>exit_to_app</v-icon>
        </v-btn>


      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer app temporary v-model="sideNav">
      <v-list>
        <v-list-item
                v-for="item in menuItems"
                :key="item.title"
                :to="item.link">
          <v-list-item-action>
            <v-icon medium>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{ item.title}}</v-list-item-content>
          <v-spacer></v-spacer>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view></router-view>
    </v-content>

    <template v-if="error">
      <v-snackbar
              :timeout="7000"
              :multi-line="true"
              @input="closeError"
              :value="true"
              color="error"
      >
        {{error}}
        <v-btn
                dark
                text
                @click.native="closeError">Close</v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>


<script>
  export default {
    name: 'App',
    data(){
      return{
        sideNav:false
      }
    },
    computed: {
      isUserLoggedIn () {
        return this.$store.getters.isUserLoggedIn
      },
      error() {
          return this.$store.getters.error
      },
      menuItems () {
        if (this.isUserLoggedIn) {
          return [
            {icon: 'dns', title: 'Wszystkie Wydarzenia', link: '/allevents'},
            {icon: 'event', title: 'Twoje Wydarzenia', link: '/event'},
            {icon: 'add_circle_outline', title: 'Organizuj Wydarzenie', link: '/event/new'},
            {icon: 'add_circle_outline', title: 'Registered', link: '/registered'},
          ]
        }
        return [
          {icon: 'face', title: 'Załóż konto', link: '/signup'},
          {icon: 'lock_open', title: 'Załoguj się', link: '/signin'}
        ]
      }
    },
    methods: {
      onLogout(){
        this.$store.dispatch('LogoutUser')
        this.$router.push('/')
      },
      closeError (){
        this.$store.dispatch('clearError')
      }
    },
  }
</script>

<style>
  .v-toolbar__content{
    padding: 0px!important;
  }
</style>
