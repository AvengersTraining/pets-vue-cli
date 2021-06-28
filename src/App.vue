<template>
  <div id="app">
    <div class="header" v-if="loggedIn">
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/" class="text-light">{{ $t('common.home') }}</router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <span class="text-light">{{ $t('common.user') }}</span>
            </template>
            <b-dropdown-item href="#">{{ $t('common.profile') }}</b-dropdown-item>
            <b-dropdown-item @click="logout">{{ $t('common.sign_out') }}</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
import '@/assets/css/main.css'
import auth from './helpers/auth'
export default {
  name: 'App',
  data () {
    return {
      user: null
    }
  },
  computed: {
    loggedIn: function () {
      return auth.isAuth()
    }
  },

  methods: {
    async logout () {
      await this.$store.dispatch('storeAuthen/logout')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}
a {
  text-decoration: none;
}
.ml-auto {
  margin-left: auto;
}
</style>
