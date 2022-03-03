<template>
  <section class="container">
    <div
      class="
        columns
        is-multiline
        has-text-centered
        is-centered is-vcentered
        py-auto
      "
    >
      <div class="column mt-6 is-12 block">
        <h1 class="is-size-1">{{ msg }}</h1>
      </div>
      <div class="column is-12">
        <div
          class="
            columns
            is-multiline
            has-text-left-desktop has-text-centered-touch
          "
        >
          <div class="column">
            <p>
              An Vuejs project for testing simpleCRM components in 2.0
              envionnment<br /><br />
              <a
                href="https://github.com/Flora24-Yedidya/SimpleCRM-Agenda/blob/main/README.md"
                target="_blank"
                rel="noopener"
                >Get documentation here </a
              >.
            </p>
          </div>
          <div class="column is-one-third-desktop is-12-touch">
            <form
              action
              method="post"
              @submit.prevent="login"
              v-if="!connected"
            >
              <div class="card p-6" style="width: auto">
                <header class="card-head mb-6">
                  <p class="card-title is-size-1">Login</p>
                </header>
                <section class="card-body">
                  <b-field label="Identifiant">
                    <b-input
                      type="text"
                      v-model="user"
                      placeholder="Votre email"
                      required
                    >
                    </b-input>
                  </b-field>

                  <b-field label="Mot de passe">
                    <b-input
                      type="password"
                      v-model="password"
                      password-reveal
                      placeholder="Votre mot de passe"
                      required
                    >
                    </b-input>
                  </b-field>
                </section>
                <footer class="is-centered mt-6 mb-4">
                  <button
                    type="submit"
                    class="button is-danger"
                    :class="loading ? 'is-loading' : ''"
                  >
                    Login
                  </button>
                </footer>

                <span class="is-size-6 has-text-success" v-if="success">
                  {{ success }}
                </span>
              </div>
            </form>
            <div class="card" v-if="connected">
              <div class="card-content">
                <h3 class="is-size-2">Modules</h3>
                <div class="content">
                  <ul>
                    <li>
                      <router-link to="/schedule" class="has-text-success"
                        >Agenda</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/planning" class="has-text-success"
                        >Planning</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/gantt" class="has-text-success"
                        >Gantt</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/kanban" class="has-text-success"
                        >Kanban</router-link
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import appservice from "@/services/appservice.js";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
    user: {
      type: String,
      default: "admin",
    },
    password: {
      type: String,
      default: "Dw3BwezaQSar",
    },
  },
  data() {
    return {
      token: "",
      loading: false,
      success: "",
      connected: false,
    };
  },
  methods: {
    //login
    login: function () {
      this.loading = true;
      this.success = "";
      appservice
        .getToken(this.user, this.password)
        .then((data) => {
          this.loading = false;
          this.token = data.token;
          // define app state
          this.$store.commit("updateAuth", true);
          this.$store.commit("updateToken", data.token);
          this.$store.commit("updateIdUser", data.id);

          this.success = "Vous êtes authentifié";
          this.connected = true;
        })
        .catch((error) => {
          this.success = "Erreur authentifcation";
          console.log(error);
          this.loading = false;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/variables.scss";
</style>
