<template>
  <div id="app">
    <div class="header" v-if="loggedIn">
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/" class="text-light">{{ $t('common.home') }}</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/pets" class="text-light">{{ $t('common.pet') }}</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/posts" class="text-light">{{ $t('common.post') }}</router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-avatar :src="user.avatar"></b-avatar>
              <span class="text-light">{{ user.username }}</span>
            </template>
            <b-dropdown-item href="/profile">{{ $t('common.profile') }}</b-dropdown-item>
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
import {mapState} from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState({
      user: state => state.storeAuthen.user
    }),
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
  min-height: 100vh;
  height: auto;
  padding-bottom: 10vh;
}
a {
  text-decoration: none;
}
.ml-auto {
  margin-left: auto;
}
</style>
