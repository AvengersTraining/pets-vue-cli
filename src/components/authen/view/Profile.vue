<template>
  <div class="col-md-6 pd">
    <h1 class="blue">{{ $t('common.profile') }}</h1>
    <b-avatar :src="userData.avatar" size="6rem"></b-avatar>
    <table class="table table-hover">
      <tbody>
      <tr>
        <td class="col-md-3">
          <i class="fa fa-user col-md-2"></i>
          <strong>
            {{ $t('user.name') }}
          </strong>
        </td>
        <td>{{ userData.username }}</td>
      </tr>
      <tr>
        <td class="col-md-3">
          <i class="fa fa-user col-md-2"></i>
          <strong>
            {{ $t('user.email') }}
          </strong>
        </td>
        <td>{{ userData.email }}</td>
      </tr>
      <tr>
        <td class="col-md-3">
          <i class="fa fa-user col-md-2"></i>
          <strong>
            {{ $t('user.type') }}
          </strong>
        </td>
        <td>{{ userData.type }}</td>
      </tr>
      <tr>
        <td class="col-md-3">
          <i class="fa fa-user col-md-2"></i>
          <strong>
            {{ $t('user.address') }}
          </strong>
        </td>
        <td>{{ userData.address }}</td>
      </tr>
      <tr>
        <td class="col-md-3">
          <i class="fa fa-user col-md-2"></i>
          <strong>
            {{ $t('user.tel') }}
          </strong>
        </td>
        <td>{{ userData.tel }}</td>
      </tr>
      </tbody>
    </table>
    <div>
      <b-button variant="primary" v-b-modal.modal-update>{{ $t('btn.update') }}</b-button>
      <update-profile/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UpdateProfile from './UpdateProfile.vue'
export default {
  components: {
    UpdateProfile
  },
  computed: {
    ...mapState({
      userData: state => state.storeAuthen.user
    })
  }
}
</script>

<style>
.pd {
  padding-left: 15px;
  padding-top: 20px;
}
.blue {
  color: #0dcaf0;
}
</style>
