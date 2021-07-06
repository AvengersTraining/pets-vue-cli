<template>
  <div>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      v-bind:title="$t('pet.new_pet')"
      size="lg"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <div class="text-center"><b-avatar v-bind:src="pet.avatar" size="6rem"></b-avatar></div>
        <b-form-group
          v-bind:label="$t('pet.field.avatar')"
          label-for="avatar-input"
        >
          <b-form-input
            id="avatar-input"
            v-bind:placeholder="$t('pet.placeholder.avatar')"
            :class="{ 'is-invalid' : (errors && errors.avatar) }"
            v-model="pet.avatar"
          ></b-form-input>
          <b-form-invalid-feedback :state="validation" v-if="errors && errors.avatar">
            {{ errors.avatar }}
          </b-form-invalid-feedback>
        </b-form-group>
        <div class="row mt-3">
          <div class="col-md-6">
            <b-form-group
              label="Name"
              label-for="name-input"
            >
              <b-form-input
                id="name-input"
                v-model="pet.name"
                v-bind:placeholder="$t('pet.placeholder.name')"
                v-bind:label="$t('pet.field.name')"
                :class="{ 'is-invalid' : (errors && errors.name) }"
              ></b-form-input>
              <b-form-invalid-feedback :state="validation" v-if="errors && errors.name">
                {{ errors.name }}
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group
              v-bind:label="$t('pet.field.age')"
              label-for="age-input"
            >
              <b-form-input
                id="age-input"
                v-model="pet.age"
                v-bind:placeholder="$t('pet.placeholder.age')"
                :class="{ 'is-invalid' : (errors && errors.age) }"
                type="number"
              ></b-form-input>
              <b-form-invalid-feedback :state="validation" v-if="errors && errors.age">
                {{ errors.age }}
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-6">
            <b-form-group
              v-bind:label="$t('pet.field.gender')"
              label-for="gender-select"
            >
              <b-form-select
                id="gender-select"
                v-model="pet.gender"
                :options="options.gender"
                :class="{ 'is-invalid' : (errors && errors.gender) }"
                class="form-control">
              </b-form-select>
              <b-form-invalid-feedback :state="validation" v-if="errors && errors.gender">
                {{ errors.gender }}
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group
              v-bind:label="$t('pet.field.type')"
              label-for="type-select"
            >
              <b-form-select
                id="type-select"
                v-model="pet.type"
                :options="options.type"
                :class="{ 'is-invalid' : (errors && errors.type) }"
                class="form-control">
              </b-form-select>
              <b-form-invalid-feedback :state="validation" v-if="errors && errors.type">
                {{ errors.type }}
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-6">
            <b-form-group
              v-bind:label="$t('pet.field.color')"
              label-for="color-input"
            >
              <b-form-input
                id="color-input"
                v-model="pet.color"
                v-bind:placeholder="$t('pet.placeholder.color')"
                :class="{ 'is-invalid' : (errors && objectNotEmpty(errors.color)) }"
              ></b-form-input>
              <b-form-invalid-feedback :state="validation" v-if="errors && errors.color">
                {{ errors.color }}
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group
              v-bind:label="$t('pet.field.status')"
              label-for="status-select"
            >
              <b-form-select
                id="status-select"
                v-model="pet.status"
                :options="options.status"
                :class="{ 'is-invalid' : (errors && errors.status) }"
                class="form-control">
              </b-form-select>
              <b-form-invalid-feedback :state="validation" v-if="errors && errors.status">
                {{ errors.status }}
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
        </div>
        <b-form-group
          class="mt-3"
          v-bind:label="$t('pet.field.description')"
          label-for="description-input"
        >
          <b-form-textarea
            id="description-input"
            v-model="pet.description"
            v-bind:placeholder="$t('pet.placeholder.description')"
            rows="3"
            max-rows="6"
            :class="{ 'is-invalid' : (errors && errors.description) }"
          ></b-form-textarea>
          <b-form-invalid-feedback :state="validation" v-if="errors && errors.description">
            {{ errors.description }}
          </b-form-invalid-feedback>
        </b-form-group>
      </form>
      <template #modal-ok>{{ $t('common.btn_submit') }}
      </template>
    </b-modal>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Utility from '@/helpers/Utility'
export default {
  data () {
    return {
      errors: {},
      options: {
        gender: [
          { value: this.$t('pet.options.gender.male'), text: this.$t('pet.options.gender.male') },
          { value: this.$t('pet.options.gender.female'), text: this.$t('pet.options.gender.female') }
        ],
        type: [
          { value: 'dog', text: this.$t('pet.options.type.dog') },
          { value: 'cat', text: this.$t('pet.options.type.cat') }
        ],
        status: [
          { value: this.$t('pet.options.status.not_recovered_yet'), text: this.$t('pet.options.status.not_recovered_yet') },
          { value: this.$t('pet.options.status.adopt'), text: this.$t('pet.options.status.adopt') },
          { value: this.$t('pet.options.status.posted'), text: this.$t('pet.options.status.posted') }
        ]
      },
      pet: {
        avatar: null,
        name: null,
        age: null,
        gender: this.$t('pet.options.gender.female'),
        type: this.$t('pet.options.type.dog'),
        color: null,
        status: this.$t('pet.options.status.not_recovered_yet'),
        description: null
      }
    }
  },

  computed: {
    ...mapState({
      error: state => state.storePet.error
    }),
    validation () {
      if (this.errors) {
        return false
      }
    }
  },

  methods: {
    checkForm () {
      let errors = []
      for (const [key, value] of Object.entries(this.pet)) {
        if (!value) {
          errors[key] = key + this.$t('common.is_required')
        }
      }
      this.errors = errors
    },
    resetModal () {
      this.errors = {}
      this.pet = {
        avatar: null,
        name: null,
        age: null,
        gender: 'male',
        type: 'dog',
        color: null,
        status: 'Chưa hồi phục',
        description: null
      }
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    async handleSubmit () {
      await this.checkForm()
      if (this.errors.length === 0) {
        this.$store.dispatch('storePet/storePet', this.pet)
          .then((res) => {
            if (res) {
              this.$bvModal.hide('modal-prevent-closing')
              this.$store.dispatch('storePet/getList')
                .then((res) => {
                  this.$emit('updatePets', res)
                })
              this.$toasted.success(this.$t('pet.message.create_success'), {
                duration: 4000
              })
            }
          })
      }
    },
    objectNotEmpty: Utility.objectNotEmpty
  }
}
</script>

<style scoped>
.form-control {
  margin: 5px 0px 10px 0px;
}
</style>
