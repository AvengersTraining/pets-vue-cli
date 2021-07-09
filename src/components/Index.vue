<template>
  <div id="home">
    <h1 class="text-home">{{ $t('home') }}</h1>
    <div class="flex">
      <div v-for="pet in pets" :key='pet.id' class="child">
      <b-card
      :title="pet.name"
      :img-src="pet.avatar"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
      >
        <b-card-text>
          {{ pet.description }}
        </b-card-text>
      </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      pets: []
    }
  },
  created () {
    this.$store.dispatch('storePet/getList')
      .then((res) => {
        this.pets = res
        this.pets.forEach((pet) => {
          pet.description = pet.description.length > 100 ? pet.description.slice(0, 100 - 1) + '…' : pet.description
        })
      })
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Otomanopee+One&display=swap');
#home {
  background: burlywood;
}
.text-home {
  display: flex;
  justify-content: center;
  font-size: 5rem;
  color: red;
  font-family: 'Otomanopee One', sans-serif;
}
.child {
  flex: 21%;
  text-align: -webkit-center;
}
.flex {
  display: flex;
  flex-wrap: wrap;
}
.card-body {
  height: 140px;
}
.card-img-top {
  width: 320px;
  height: 320px;
}
</style>
