<template>
  <div id="pets">
    <h1 class="mb-3">{{ $t('post.list') }}</h1>
    <b-button @click="showModalUpdateOrCreate(null)" type="button" size="sm" variant="primary" class="mb-3 float-end">
      <b-icon icon="plus"></b-icon>{{ $t('common.btn_create') }}</b-button>
    <div id="list-posts">
      <b-table
        :items="posts"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        label-sort-asc
        label-sort-clear
        label-sort-desc
        sort-icon-left
        bordered
        stacked="md"
        responsive="sm"
      >
        <template #cell(actions)="row">
          <b-button @click="showModalUpdateOrCreate(row.item.id)" size="sm" class="mr-2 btn" variant="primary">
            {{ $t('common.btn_edit') }}
          </b-button>
          <b-button @click="showModalConfirmDelete(row.item.id)" size="sm" class="mr-2 btn btn-danger">
            {{ $t('common.btn_delete') }}
          </b-button>
        </template>
        <template #cell(pet.avatar)="data">
          <b-avatar v-bind:src="data.value"></b-avatar>
        </template>
      </b-table>

      <div>
        {{ $t('common.sort_by') }} <b>{{ sortBy }}</b>, {{ $t('common.sort_direction') }}
        <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
      </div>
    </div>
    <form-modal :id="editingId" @updatePosts="posts = $event"></form-modal>
    <b-modal v-model="modalDeleteShow">Do you want to delete pet id {{ deleteId }}</b-modal>
    <b-modal
      id="modal-confirm-delete"
      ref="modal"
      v-bind:title="$t('pet.confirm_delete_title')"
      @ok="handleDelete"
    >
      {{ $t('pet.message.confirm_delete') }} {{ deleteId }}
    </b-modal>
  </div>
</template>

<script>
import FormModal from './FormModal'
export default {
  name: 'Posts',
  components: {
    FormModal
  },
  props: {
  },
  data () {
    return {
      sortBy: 'id',
      sortDesc: true,
      editingId: null,
      deleteId: null,
      modalDeleteShow: false,
      fields: [
        { key: 'id', sortable: true, label: this.$t('post.field.id') },
        { key: 'pet.avatar', sortable: false, label: this.$t('post.field.avatar'), tdClass: 'text-center', thClass: 'text-center' },
        { key: 'pet.name', sortable: true, label: this.$t('post.field.name') },
        { key: 'price', sortable: true, label: this.$t('post.field.price') },
        { key: 'actions', sortable: false, label: this.$t('common.actions'), tdClass: 'text-center', thClass: 'text-center' }
      ],
      posts: []
    }
  },
  created () {
    this.$store.dispatch('storePost/getList')
      .then((res) => {
        this.posts = res
      })
  },
  methods: {
    async showModalUpdateOrCreate (id = null) {
      this.editingId = id
      this.$bvModal.show('modal-prevent-closing')
    },
    showModalConfirmDelete (id) {
      this.deleteId = id
      this.$bvModal.show('modal-confirm-delete')
    },
    async handleDelete () {
      let res = null
      res = await this.$store.dispatch('storePost/delete', this.deleteId)
      if (res) {
        this.$bvModal.hide('modal-confirm-delete')
        this.deleteId = null
        this.$store.dispatch('storePost/getList')
          .then((res) => {
            this.posts = res
          })
        this.$toasted.show(this.$t('common.alert.success'), {
          type: 'success',
          duration: 4000
        })
      }
    }
  }
}
</script>

<style scoped>
#pets {
  padding: 50px 30px;
}
</style>
