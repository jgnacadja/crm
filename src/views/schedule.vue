<template>
  <section>
    <div class="columns is-multiline has-text-centered">
      <div class="column is-12">
        <h1 class="is-size-1">Agenda</h1>
      </div>
      <div class="column is-12" v-if="token != 'undefined'">
        <agenda :API_KEY="token" />
      </div>
    </div>
  </section>
</template>
<script>
import agenda from "@/components/agenda.vue";

export default {
  name: "Calendar",
  components: { agenda },
  data() {
    return {
      token: this.$store.getters.getToken,
      loading: false,
      datastored: this.$store.state.user,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables.scss";
.calendar-tools {
  align-items: center;
  display: flex;
  margin-left: auto;
}

.calendar-nav {
  display: flex;
  align-items: center;
  padding: 0px 0.5rem;
}

.boutons_nav {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0rem;
}

.flat-button {
  width: 100%;
  background-color: transparent !important;
  border: 1px solid gray !important;
  color: black !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  margin: 0 0.2rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.flat-button:hover {
  background-color: #d51516 !important;
  color: #fff !important;
}

select {
  width: 100%;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 0 10px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  background-color: #f5f5f5 !important;
  outline: none;
  cursor: pointer;
}

.button-add {
  padding: 1rem;
  background-color: #d51516 !important;
  color: #fff !important;
}

.calendar-menu-item {
  margin: 1rem 0;
}
</style>
