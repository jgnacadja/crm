<template>
  <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <figure class="image">
          <img
            height="30"
            class="logo_crm"
            alt="logo"
            src="../assets/logo_simple.png"
          />
        </figure>
      </a>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="menu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="menu" class="navbar-menu">
      <div class="navbar-end">
        <router-link class="navbar-item" to="/"> Home </router-link>
        <router-link class="navbar-item" to="/schedule"> Agenda </router-link>

        <router-link class="navbar-item" to="/planning"> Planning </router-link>

        <router-link class="navbar-item" to="/gantt"> Gantt </router-link>

        <router-link class="navbar-item" to="/kanban"> Kanban </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      connect: null,
    };
  },
  mounted() {
    this.connect = this.$store.getters.isConnected;
    document.addEventListener("DOMContentLoaded", () => {
      // Get all "navbar-burger" elements
      const $navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-burger"),
        0
      );

      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach((el) => {
          el.addEventListener("click", () => {
            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle("is-active");
            $target.classList.toggle("is-active");
          });
        });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables.scss";
</style>
