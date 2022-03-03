<template>
  <section>
    <div id="app">
      <Header />

      <router-view />

      <Footer />
    </div>
  </section>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  methods: {
    sum(a, b) {
      return a + b;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables.scss";
</style>
