<template>
  <div class="pt-5">
    <b-form class="bg-light w-50 form-authen">
      <h1 class="mb-5 text-center">Login</h1>
      <span class="text-error" v-if="errors && errors.code == 401">
        {{ $t('authen.message.login_infor_incorrect') }}
      </span>
      <b-form-group
        id="input-group-1"
        label-for="input-1"
        class="mb-lg-3">
        <b-form-input
          id="input-1"
          v-model="username"
          :class="{ 'is-invalid' : (errors && objectNotEmpty(errors.username)) }"
          v-bind:placeholder="$t('authen.placeholder.username')"></b-form-input>
        <b-form-invalid-feedback :state="validation" v-if="errors && objectNotEmpty(errors.username)">
          {{ errors.username[0] }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-2" label-for="input-2" class="mb-lg-3">
        <b-form-input
          id="input-2"
          v-model="password"
          type="password"
          :class="{ 'is-invalid' : (errors && objectNotEmpty(errors.password)) }"
          v-bind:placeholder="$t('authen.placeholder.password')"></b-form-input>
        <b-form-invalid-feedback :state="validation" v-if="errors && objectNotEmpty(errors.password)">
          {{ errors.password[0] }}
        </b-form-invalid-feedback>
      </b-form-group>

      <div class="mt-5 text-center">
        <b-button @click="onSubmit" type="button" variant="primary">{{ $t('common.submit') }}</b-button>
        <b-link to="#">{{ $t('authen.register') }}</b-link>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import '@/assets/css/authen.css'
import Utility from '@/helpers/Utility'

export default {
  name: 'Login',
  props: {
  },
  data () {
    return {
      username: '',
      password: '',
      remember_me: []
    }
  },
  watch: {
  },
  computed: {
    ...mapState({
      errors: state => state.storeAuthen.error
    }),
    validation () {
      if (this.errors) {
        return false
      }
    }
  },
  methods: {
    onSubmit () {
      let username = this.username
      let password = this.password
      this.$store.dispatch('storeAuthen/login', { username, password })
    },

    objectNotEmpty: Utility.objectNotEmpty
  }
}
</script>

<style>
.text-error {
  font-size: 0.875em;
  color: #dc3545;
}
#app {
  background-image: url("../../../assets/cat.jpg");
  background-size: cover;
}
</style>
