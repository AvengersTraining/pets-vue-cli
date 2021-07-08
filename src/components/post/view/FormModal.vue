<template>
  <div>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      v-bind:title="$t('post.new_post')"
      size="lg"
      @show="resetModal"
      @hidden="resetModal"
      @shown="getPostData"
      @ok="handleOk"
    >
      <template #modal-title>
        <span class="font-weight-bold">{{ id ? `${$t('post.update_post')} ${id}` : $t('post.new_post') }}</span>
      </template>
      <b-overlay :show="isLoading" rounded="sm">
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            v-bind:label="$t('post.field.price')"
            label-for="price-input"
            :state="priceState"
            invalid-feedback="Price is required"
          >
            <b-form-input
              id="price-input"
              type="number"
              v-bind:placeholder="$t('post.placeholder.price')"
              :class="{ 'is-invalid' : (errors && errors.price) }"
              v-model="post.price"
              :state="priceState"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validation" v-if="errors && errors.price">
              {{ errors.price }}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            v-bind:label="$t('post.pet_name')"
            label-for="type-select"
          >
            <b-form-select
              v-model="selectedItem"
              :options="pets"
              text-field="name"
              value-field="id"
              :class="{ 'is-invalid' : (errors && errors.type) }"
              class="form-control">
            </b-form-select>
            <b-form-invalid-feedback :state="validation" v-if="errors && errors.type">
              {{ errors.type }}
            </b-form-invalid-feedback>
          </b-form-group>
        </form>
      </b-overlay>
      <template #modal-ok>{{ $t('common.btn_submit') }}
      </template>
    </b-modal>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Utility from '@/helpers/Utility'
export default {
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      errors: {},
      isLoading: false,
      selectedItem: null,
      options: {
        type: [
          { value: 'dog', text: this.$t('pet.options.type.dog') },
          { value: 'cat', text: this.$t('pet.options.type.cat') }
        ]
      },
      post: {
        pet_id: null,
        price: null
      },
      priceState: null,
      pets: []
    }
  },
  computed: {
    ...mapState({
      error: state => state.storePost.error
    }),
    validation () {
      if (this.errors) {
        return false
      }
    }
  },
  created () {
    this.$store.dispatch('storePet/getList')
      .then((res) => {
        this.pets = res
        this.selectedItem = res[0]['id']
      })
  },
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.priceState = valid
      return valid
    },
    resetModal () {
      this.errors = {}
      this.post = {}
      this.priceState = null
    },
    async getPostData () {
      let post = this.post
      if (this.id) {
        post = await this.$store.dispatch('storePost/getPostById', this.id)
      }
      this.post = post
      this.isLoading = false
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    async handleSubmit () {
      if (!this.checkFormValidity()) {
        return
      }
      this.post.pet_id = this.selectedItem
      let response = null
      if (this.id) {
        response = await this.$store.dispatch('storePost/updatePost', this.post)
      } else {
        response = await this.$store.dispatch('storePost/storePost', this.post)
      }
      if (!response) {
        this.$toasted.show(this.$t('common.alert.failed'), {
          type: 'error',
          duration: 4000
        })
        return
      }
      this.$bvModal.hide('modal-prevent-closing')
      this.$store.dispatch('storePost/getList')
        .then((res) => {
          this.$emit('updatePosts', res)
        })
      this.$toasted.success(this.$t('common.alert.success'), {
        duration: 4000
      })
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
