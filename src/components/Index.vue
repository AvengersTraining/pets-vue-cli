<template>
  <div>
    <h1 class="text-home">{{ $t('home') }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Otomanopee+One&display=swap');
body {
  background-image: url("../assets/background.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.text-home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 5rem;
  color: yellow;
  font-family: 'Otomanopee One', sans-serif;
}
</style>
