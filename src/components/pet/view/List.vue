<template>
  <div id="pets">
    <h1 class="mb-3">{{ $t('pet.list') }}</h1>
    <b-button v-b-modal.modal-prevent-closing type="button" size="sm" variant="primary" class="mb-3 float-end">
      <b-icon icon="plus"></b-icon>{{ $t('common.btn_create') }}</b-button>
    <div id="list-pets">
      <b-table
        :items="pets"
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
          <b-button size="sm" class="mr-2 btn" variant="primary">
            {{ $t('common.btn_edit') }}
          </b-button>
          <b-button size="sm" class="mr-2 btn btn-danger">
            {{ $t('common.btn_edit') }}
          </b-button>
        </template>
        <template #cell(avatar)="data">
          <b-avatar v-bind:src="data.value"></b-avatar>
        </template>
      </b-table>

      <div>
        {{ $t('common.sort_by') }} <b>{{ sortBy }}</b>, {{ $t('common.sort_direction') }}
        <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
      </div>
    </div>
    <form-modal @updatePets="pets = $event"></form-modal>
  </div>
</template>

<script>
import FormModal from './FormModal'
export default {
  name: 'Pets',
  components: {
    FormModal
  },
  props: {
  },
  data () {
    return {
      sortBy: 'age',
      sortDesc: true,
      fields: [
        { key: 'id', sortable: true, label: this.$t('pet.field.id') },
        { key: 'avatar', sortable: false, label: this.$t('pet.field.avatar'), tdClass: 'text-center', thClass: 'text-center' },
        { key: 'name', sortable: true, label: this.$t('pet.field.name') },
        { key: 'age', sortable: true, label: this.$t('pet.field.age') },
        { key: 'gender', sortable: true, label: this.$t('pet.field.gender') },
        { key: 'type', sortable: true, label: this.$t('pet.field.type') },
        { key: 'status', sortable: false, label: this.$t('pet.field.status') },
        { key: 'actions', sortable: false, label: this.$t('common.actions'), tdClass: 'text-center', thClass: 'text-center' }
      ],
      pets: []
    }
  },
  created () {
    this.$store.dispatch('storePet/getList')
      .then((res) => {
        this.pets = res
      })
  },
  methods: {
  }
}
</script>

<style scoped>
  #pets {
    padding: 50px 30px;
  }
</style>
