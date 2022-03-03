<template>
  <div v-if="token != null">
    <Scheduler :API_KEY="token" :IdUser="idUser" />
  </div>
</template>

<script>
import Scheduler from "../components/Scheduler.vue";

export default {
  name: "Panning",
  components: {
    Scheduler,
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

 