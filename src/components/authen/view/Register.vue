<template>
  <div class="pt-5">
    <b-form class="bg-light w-50 form-authen mt-0" v-show="!registerSuccess">
      <h1 class="mb-3 text-center">{{ $t('authen.register') }}</h1>
      <span class="text-error" v-if="errors && errors.code == 500">
        {{ $t("authen.message.username_or_email_exist") }}
      </span>
      <b-form-group
        label-for="username"
        v-bind:label="$t('authen.field.username')"
        class="mb-lg-3">
        <b-form-input
          id="username"
          v-model="user.username"
          :class="{ 'is-invalid' : (errors && objectNotEmpty(errors.username)) }"
          v-bind:placeholder="$t('authen.placeholder.username')"></b-form-input>
        <b-form-invalid-feedback :state="validation" v-if="errors && objectNotEmpty(errors.username)">
          {{ errors.username[0] }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label-for="password" v-bind:label="$t('authen.field.password')" class="mb-lg-3">
        <b-form-input
          id="pasword"
          v-model="user.password"
          type="password"
          :class="{ 'is-invalid' : (errors && objectNotEmpty(errors.password)) }"
          v-bind:placeholder="$t('authen.placeholder.password')"></b-form-input>
        <b-form-invalid-feedback :state="validation" v-if="errors && objectNotEmpty(errors.password)">
          {{ errors.password[0] }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label-for="password-confirm" v-bind:label="$t('authen.field.password_confirm')" class="mb-lg-3">
        <b-form-input
          id="password-confirm"
          v-model="user.password_confirmation"
          type="password"
          :class="{ 'is-invalid' : (errors && objectNotEmpty(errors.password_confirmation)) }"
          v-bind:placeholder="$t('authen.placeholder.password')"></b-form-input>
        <b-form-invalid-feedback :state="validation" v-if="errors && objectNotEmpty(errors.password_confirmation)">
          {{ errors.password[0] }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        label-for="email"
        v-bind:label="$t('authen.field.email')"
        class="mb-lg-3">
        <b-form-input
          id="email"
          v-model="user.email"
          :class="{ 'is-invalid' : (errors && objectNotEmpty(errors.email)) }"
          v-bind:placeholder="$t('authen.placeholder.email')"></b-form-input>
        <b-form-invalid-feedback :state="validation" v-if="errors && objectNotEmpty(errors.email)">
          {{ errors.email[0] }}
        </b-form-invalid-feedback>
      </b-form-group>

      <div class="form-group"
        v-bind:class="{ 'has-error': errors && objectNotEmpty(errors.type)  }">
        <label for="type">{{ $t('authen.field.type') }}</label>
        <select class="form-control" v-model="user.type">
          <option v-bind:value="$t('authen.location_type.veterinary_hospital')">
            {{ $t('authen.location_type.veterinary_hospital')}}</option>
          <option v-bind:value="$t('authen.location_type.veterinary_center')">{{ $t('authen.location_type.veterinary_center')}}</option>
          <option v-bind:value="$t('authen.location_type.cat_island')">{{ $t('authen.location_type.cat_island')}}</option>
        </select>
        <span v-if="errors && objectNotEmpty(errors.type)" class="help-block">{{ errors.type[0] }}</span>
      </div>

      <b-form-group
        v-bind:label="$t('authen.field.open_time')"
        label-for="open-time"
        class="mb-lg-3">
        <b-form-input
          id="open-time"
          v-model="user.open_time"
          type="time"
          :class="{ 'is-invalid' : (errors && objectNotEmpty(errors.open_time)) }"
          ></b-form-input>
        <b-form-invalid-feedback :state="validation" v-if="errors && objectNotEmpty(errors.open_time)">
          {{ errors.open_time[0] }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        v-bind:label="$t('authen.field.close_time')"
        label-for="close-time"
        class="mb-lg-3">
        <b-form-input
          id="close-time"
          v-model="user.close_time"
          type="time"
          :class="{ 'is-invalid' : (errors && objectNotEmpty(errors.close_time)) }"
          ></b-form-input>
        <b-form-invalid-feedback :state="validation" v-if="errors && objectNotEmpty(errors.close_time)">
          {{ errors.close_time[0] }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        v-bind:label="$t('authen.field.address')"
        label-for="address"
        class="mb-lg-3">
        <b-form-input
          id="address"
          v-model="user.address"
          :class="{ 'is-invalid' : (errors && objectNotEmpty(errors.address)) }"
          v-bind:placeholder="$t('authen.placeholder.address')"></b-form-input>
        <b-form-invalid-feedback :state="validation" v-if="errors && objectNotEmpty(errors.address)">
          {{ errors.address[0] }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        v-bind:label="$t('authen.field.tel')"
        label-for="tel"
        class="mb-lg-3">
        <b-form-input
          id="tel"
          v-model="user.tel"
          :class="{ 'is-invalid' : (errors && objectNotEmpty(errors.tel)) }"
          v-bind:placeholder="$t('authen.placeholder.tel')"></b-form-input>
        <b-form-invalid-feedback :state="validation" v-if="errors && objectNotEmpty(errors.tel)">
          {{ errors.tel[0] }}
        </b-form-invalid-feedback>
      </b-form-group>

      <div class="mt-5 text-center">
        <b-button @click="onSubmit" type="button" variant="primary">{{ $t('common.submit') }}</b-button>
        <router-link to="/login">{{ $t('authen.login') }}</router-link>
      </div>
    </b-form>
    <div class="text-center w-50 m-auto" v-show="registerSuccess">
      <b-alert show variant="success" class="mt-5">
        <h4 class="alert-heading">{{ $t('common.well_done') }}</h4>
        <p>
          {{ $t('authen.message.register_succest') }}
        </p>
        <hr>
        <p class="mb-0">
          <router-link to="/login">{{ $t('authen.login') }}</router-link>
        </p>
      </b-alert>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import '@/assets/css/authen.css'
import Utility from '@/helpers/Utility'
export default {
  name: 'Register',
  props: {
  },
  data () {
    return {
      registerSuccess: false,
      user: {
        username: null,
        password: null,
        password_confirmation: null,
        email: null,
        type: null,
        open_time: null,
        close_time: null,
        address: null,
        tel: null
      }
    }
  },
  watch: {
    registerSuccess: function () {
      return this.registerSuccess
    }
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
      this.$store.dispatch('storeAuthen/register', this.user)
        .then((res) => {
          if (res) {
            this.registerSuccess = true
          }
        })
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

.form-control {
  margin: 5px 0px 10px 0px;
}
</style>
