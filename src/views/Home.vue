<template>
  <div class="home">
    <HelloWorld msg="welcome to our showcase"  />
  </div>
</template>

<script>
import HelloWorld from "../components/welcome.vue";
export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/variables.scss";

</style>
