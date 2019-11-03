import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: '#5ab0b5',
        secondary: '#c4ebe6',
        accent: '#46878c',
        info: '#ffdcbd',
        error: '#a3372c'
      },
    },
  },
});
