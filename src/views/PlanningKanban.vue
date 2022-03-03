<template>
  <section>
    <div class="columns is-multiline has-text-centered">
      <div class="column is-12">
        <h1 class="is-size-1">Kanban</h1>
      </div> 
      <div class="column is-12" v-if="token != 'undefined'">
        <SchedulerKanban :API_KEY="token" :ID_USER="idUser"/>
      </div>
    </div>
  </section>
</template>

<script>
import SchedulerKanban from "../components/SchedulerKanban.vue";

export default {
  components: {
    SchedulerKanban,
  },
  data() {
    return {
      token: this.$store.getters.getToken,
      idUser: this.$store.getters.getIdUser,
      loading: false,
      datastored: this.$store.state.user,
    };
  },
};
</script>