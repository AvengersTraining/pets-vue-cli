<template>
  <b-modal
    id="modal-update"
    ref="modal"
    title="Update User"
    @ok="handleOk"
    @hidden="resetModal"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <div class="text-center">
        <b-avatar :src="userProfile.avatar" size="6rem"></b-avatar>
      </div>
      <b-form-group
        label-for="email"
        v-bind:label="$t('authen.field.email')"
        :invalid-feedback="$t('errors.email_required')"
        class="mb-lg-3">
        <b-form-input
          id="email"
          v-model="userProfile.email"
          v-bind:placeholder="$t('authen.placeholder.email')"
          :state="emailState"></b-form-input>
      </b-form-group>
      <div class="form-group"
           v-bind:class="{ 'has-error': errors && objectNotEmpty(errors.type)  }">
        <label>{{ $t('authen.field.type') }}</label>
        <select class="form-control" v-model="userProfile.type">
          <option v-bind:value="$t('authen.location_type.veterinary_hospital')">
            {{ $t('authen.location_type.veterinary_hospital')}}</option>
          <option v-bind:value="$t('authen.location_type.veterinary_center')">{{ $t('authen.location_type.veterinary_center')}}</option>
          <option v-bind:value="$t('authen.location_type.cat_island')">{{ $t('authen.location_type.cat_island')}}</option>
        </select>
        <span v-if="errors && objectNotEmpty(errors.type)" class="help-block">{{ errors.type[0] }}</span>
      </div>

      <b-form-group
        v-bind:label="$t('authen.field.avatar')"
        label-for="address"
        class="mb-lg-3">
        <b-form-input
          id="address"
          v-model="userProfile.avatar"
          :class="{ 'is-invalid' : (errors && objectNotEmpty(errors.avatar)) }"
          v-bind:placeholder="$t('authen.placeholder.address')"></b-form-input>
        <b-form-invalid-feedback :state="validation" v-if="errors && objectNotEmpty(errors.avatar)">
          {{ errors.avatar[0] }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        v-bind:label="$t('authen.field.address')"
        label-for="address"
        class="mb-lg-3">
        <b-form-input
          id="address"
          v-model="userProfile.address"
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
          v-model="userProfile.tel"
          :class="{ 'is-invalid' : (errors && objectNotEmpty(errors.tel)) }"
          v-bind:placeholder="$t('authen.placeholder.tel')"></b-form-input>
        <b-form-invalid-feedback :state="validation" v-if="errors && objectNotEmpty(errors.tel)">
          {{ errors.tel[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </form>
  </b-modal>
</template>
<script>
import { mapState } from 'vuex'
import Utility from '@/helpers/Utility'
export default {
  data () {
    return {
      userProfile: {
        avatar: null,
        username: null,
        password: null,
        password_confirmation: null,
        email: null,
        type: null,
        address: null,
        tel: null
      },
      emailState: null,
      show: true
    }
  },
  computed: {
    ...mapState({
      userData: state => state.storeAuthen.user,
      errors: state => state.storeAuthen.error
    }),
    validation () {
      if (this.errors) {
        return false
      }
    }
  },
  mounted () {
    this.userProfile = {...this.userData}
  },
  methods: {
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    checkFormValidity () {
      // Check validate email
      this.emailState = this.userProfile.email.length > 0
      return this.emailState
    },
    resetModal () {
      this.userProfile = {...this.userData}
    },
    async handleSubmit () {
      if (!this.checkFormValidity()) {
        return
      }
      await this.$store.dispatch('storeAuthen/actionUpdateUserInformation', {params: this.userProfile})
        .then(response => {
          if (response.record) {
            this.$toasted.success(response.message, {
              duration: 4000
            })
            this.$nextTick(() => {
              this.$bvModal.hide('modal-update')
            })
          }
        })
    },
    objectNotEmpty: Utility.objectNotEmpty
  }
}
</script>
