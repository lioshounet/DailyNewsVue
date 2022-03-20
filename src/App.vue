<!--
 * @author: Lan_
 * @create: 2021-06-26 13:52 PM
 * @license: MIT
 * @lastAuthor: Lan_
 * @lastEditTime: 2021-06-29 20:02 PM
 * @desc:
-->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import page from  "./layout/index.vue";
export default {
  name: 'App',
  components: {
    page
  },
  data() {
    return {
      num:100,
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
