<template>
  <section>
    <div class="columns is-multiline has-text-centered">
      <div class="column is-12">
        <h1 class="is-size-1">Gantt</h1>
      </div>
      <div class="column is-12" v-if="token != 'undefined'">
        <Gantt :API_KEY="token" />
      </div>
    </div>
  </section>
</template>

<script>
import Gantt from "../components/gantt.vue";

export default {
  components: {
    Gantt,
  },
  data() {
    return {
      token: this.$store.getters.getToken,
      loading: false,
      datastored: this.$store.state.user,
    };
  },
};
</script>
