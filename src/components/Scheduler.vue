<template>
  <section class="schelduler">
    <b-loading
      :is-full-page="isFullPage"
      v-model="isLoading"
      :can-cancel="true"
    ></b-loading>
    <section
      class="
        is-flex-widescreen is-justify-content-flex-start is-align-items-baseline
        pr-2
      "
    >
      <div class="column is-narrow">
        <div class="is-flex is-flex-wrap-wrap">
          <label class="label pt-2">
            Affichage
            <span class="is-hidden-widescreen">&nbsp;&nbsp;&nbsp;</span> :
            &nbsp;
          </label>
          <div class="control is-flex-grow-2">
            <div class="dropdown is-block is-fullwidth" v-bind:class="showing">
              <div class="dropdown-trigger">
                <button
                  class="button is-fullwidth is-justify-content-space-between"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                  @click="show"
                >
                  <span class="icon-text">
                    <span class="icon">
                      <em
                        class="fas fa-circle"
                        v-bind:style="{ color: typeview.color }"
                      ></em>
                    </span>
                    <span>{{ typeview.title }}</span>
                  </span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content has-text-left">
                  <a
                    class="dropdown-item"
                    v-for="(item, i) in arrayFilter"
                    :key="i"
                    :value="item.title"
                    @click="setView(item)"
                  >
                    <span class="icon-text">
                      <span class="icon" v-bind:style="{ color: item.color }">
                        <em class="fas fa-circle"></em>
                      </span>
                      <span>{{ item.title }}</span>
                    </span>
                  </a>
                  <hr class="dropdown-divider" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-narrow">
        <div class="is-flex is-flex-wrap-wrap">
          <label class="label pt-2"
            >Utilisateurs <span class="is-hidden-widescreen">&nbsp;</span>:
            &nbsp;</label
          >
          <div class="control is-flex-grow-2">
            <div class="select is-block">
              <multiselect
                v-model="selectedUsers"
                :options="users"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                placeholder="Selectionnez"
                label="name"
                track-by="name"
                :preselect-first="true"
                @close="dispatchAction"
              >
                <template slot="selection" slot-scope="{ values, isOpen }"
                  ><span
                    class="multiselect__single"
                    v-if="values.length &amp;&amp; !isOpen"
                    >{{ values.length }} selections</span
                  ></template
                >
              </multiselect>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-narrow">
        <div class="is-flex is-flex-wrap-wrap">
          <label
            class="
              label
              is-flex-tablet-only is-justify-content-space-between
              pt-2
            "
            for="month"
          >
            Mois
            <span class="is-hidden-widescreen">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span
            >: &nbsp;
          </label>
          <div class="control is-flex-grow-2">
            <div class="select is-block is-fullwidth">
              <select
                name="month"
                id="month"
                class="is-block-mobile"
                v-model="month_selected"
                @change="updateStartDate"
              >
                <option v-for="month in months" :key="month">
                  {{ month }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-narrow">
        <div class="is-flex is-flex-wrap-wrap">
          <label
            class="
              label
              is-flex-tablet-only is-justify-content-space-between
              pt-2
            "
            for="year"
          >
            Année
            <span class="is-hidden-widescreen">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span
            >: &nbsp;
          </label>
          <div class="control is-flex-grow-2">
            <div class="select is-block is-fullwidth">
              <select
                name="year"
                class="is-block-mobile"
                id="year"
                v-model="year_selected"
                @change="updateStartDate"
              >
                <option
                  v-for="year in [
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                    17, 18, 19,
                  ]"
                  :key="year"
                  :value="currentYear - year"
                >
                  {{ currentYear - year }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="columns">
      <div class="column is-12">
        <DayPilotScheduler
          style="width: 100%"
          id="dp"
          :config="config"
          ref="scheduler"
        />
      </div>
    </div>

    <b-modal :active.sync="isComponentModalActive" has-modal-card>
      <form method="post" @submit.prevent="handleCreateSchedule">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Creation de tâche</p>
          </header>
          <section
            class="modal-card-body is-size-5 columns is-multiline is-marginless"
          >
            <div class="column" label="Titre">
              <b-input
                name="sujet"
                type="text"
                v-model="form.sujet"
                placeholder="Titre de la tache"
              ></b-input>
              <span
                class="has-text-danger is-size-7"
                v-if="!form.sujet && form.submit == true"
              >
                {{ errors.sujet }}
              </span>
            </div>
          </section>
          <footer class="modal-card-foot is-justify-content-flex-end">
            <button
              class="button"
              type="button"
              @click="
                form.sujet = '';
                errors.sujet = '';
                // dp.update();
                isComponentModalActive = false;
              "
            >
              Annuler
            </button>

            <button
              type="submit"
              class="button is-danger"
              :class="loading ? 'is-loading' : ''"
            >
              Creer
            </button>
          </footer>
        </div>
      </form>
    </b-modal>
  </section>
</template>

<script>
import { DayPilot, DayPilotScheduler } from "daypilot-pro-vue";
import Vue from "vue";
import axios from "axios";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
export default {
  name: "Scheduler",
  props: {
    arrayFilter: {
      type: Array,
      default() {
        return [
          {
            color: "#2251ff",
            title: "Défaut",
            index: "color_defaut",
          },
          {
            color: "#ffcedf0",
            title: "Etat",
            index: "color_etat",
          },
          {
            color: "#25ffcd",
            title: "Priorité",
            index: "color_priorite",
          },
          {
            color: "#de452a",
            title: "Utilisateur",
            index: "color_utilisateur",
          },
          {
            color: "#cdee00",
            title: "Type",
            index: "color_type",
          },
          {
            color: "#e19400",
            title: "Priorité échéance",
            index: "color_priorite_echeance",
          },
        ];
      },
    },
    USER_API: {
      type: String,
      default() {
        return "https://0002-zebridge-dev-externe.api.crm-simple.com/utilisateurs/";
      },
    },
    API_KEY: {
      type: String,
      default() {
        return "";
      },
    },
    IdUser: {
      type: String,
      default() {
        return "";
      },
    },

    URI: {
      type: String,
      default() {
        return "https://0002-zebridge-dev-externe.api.crm-simple.com/interactions/";
      },
    },

    URI_ACTION: {
      type: String,
      default() {
        return "https://0002-zebridge-dev-externe.api.crm-simple.com/interaction/";
      },
    },

    months: {
      type: Array,
      default() {
        return [
          "Janvier",
          "Février",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juillet",
          "Août",
          "Septembre",
          "Octobre",
          "Novembre",
          "Décembre",
        ];
      },
    },
    month_selected_number: {
      type: Number,
      default() {
        return new Date().getMonth();
      },
    },

    month_selected: {
      type: String,
      default() {
        return this.months[this.month_selected_number];
      },
    },

    year_selected: {
      type: Number,
      default() {
        return new Date().getFullYear();
      },
    },

    index: {
      type: String,
      default() {
        return (this.months.indexOf(this.month_selected) + 1).toLocaleString(
          "en-US",
          {
            minimumIntegerDigits: 2,
            useGrouping: false,
          }
        );
      },
    },
    idUtilisateurs: {
      type: Array,
      default() {
        return ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
      },
    },
    idprojets: {
      type: Array,
      default() {
        return [];
      },
    },
    idcontacts: {
      type: Array,
      default() {
        return [];
      },
    },
    idsocietes: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      users: [],
      args: {},
      typeview: {
        title: "Selectionnez",
        color: "#2251ff",
        index: "color_defaut",
      },
      isLoading: true,
      isFullPage: false,
      the_user_ID: this.IdUser,
      showing: "",
      currentYear: this.year_selected,
      selectedUsers: [],
      loading: false,
      myEvents: [],
      endDate: "",
      startDate: "",
      events: null,
      myResources: [],
      isComponentModalActive: false,
      tasks: [],
      form: {
        sujet: "",

        submit: false,
      },
      locale: "fr-FR",
      errors: {
        sujet: "Le champs titre est obligatoire",
      },

      config: {
        idUser: this.IdUser,
        //range:"Year",
        events: [], // events items list on dayplot
        timeHeaders: [
          // { groupBy: "Year" },
          { groupBy: "Month" },
          { groupBy: "Week" },
          { groupBy: "Day", format: "d" },
        ],
        scale: "Day",
        days: DayPilot.Date.today().daysInYear(),
        // startDate: DayPilot.Date.today().firstDayOfMonth(),

        startDate: this.year_selected + "-" + this.index + "-01",
        timeRangeSelectedHandling: "Enabled",
        onTimeRangeSelected: (args) => {
          this.isComponentModalActive = true;
          this.events = args;
        },

        onBeforeTimeHeaderRender: (args) => {
          if (args.header.level === 1) {
            args.header.html = "Semaine " + args.header.start.weekNumberISO();
          }
        },
        // onBeforeCellRender: (args) => {
        //   if (args.cell.resource != this.IdUser) {
        //     args.cell.disabled = true;
        //     //args.cell.backColor = "#dddddd";
        //   }
        // },

        eventMoveHandling: "Update",
        onEventMoved: (args) => {
          if (args.e.data.lock === "0") {
            this.Update_event({
              idaction: args.e.data.idaction,
              id: args.e.id(),
              start: args.newStart,
              end: args.newEnd,
              text: args.e.data.text,
              resource: args.e.resource(),
              lock: args.e.data.lock,
              color: args.e.data.color,
            });
          }
        },

        eventResizeHandling: "Update",
        onEventResized: async (args) => {
          if (args.e.data.lock === "0") {
            const event = {
              idaction: args.e.data.idaction,
              id: args.e.id(),
              start: args.newStart,
              end: args.newEnd,
              text: args.e.data.text,
              resource: args.e.resource(),
              lock: args.e.data.lock,
              color: args.e.data.color,
            };

            this.Update_event(event);
          }
        },

        eventClickHandling: "Editing",
        onEventClicked: async (args) => {
          if (args.e.data.lock === "0") {
            const modal = await DayPilot.Modal.prompt(
              "Modifier: ",
              args.e.text()
            );
            if (modal.canceled) {
              return;
            }

            const event = {
              idaction: args.e.cache.idaction,
              id: args.e.id(),
              start: args.e.start(),
              end: args.e.end(),
              text: modal.result,
              resource: args.e.resource(),
              lock: args.e.data.lock,
              color: args.e.data.color,
            };

            let index = this.config.events.findIndex(
              (x) => x.id === args.e.id()
            );
            this.config.events[index] = event;
            var tab = String(event.start).replace("T", " ");
            var data = JSON.stringify({
              idaction: event.idaction,
              sujet: event.text,
              date_action: tab,
            });
            axios({
              method: "put",
              url: this.URI_ACTION + this.API_KEY,
              headers: {
                "Content-Type": "application/json",
              },
              data: data,
            }).then(() => {
              this.dispatchAction();
            });
          }
        },
        eventHoverHandling: "Bubble",
        bubble: new DayPilot.Bubble({
          onLoad: (args) => {
            let idaction = args.source.data.idaction;
            let start = "";
            let end = "";
            start = args.source.data.start;
            start = start.split(" ");

            let new_date = start[0].split("-");
            start[0] = new_date[2] + "-" + new_date[1] + "-" + new_date[0];

            var new_end = start[1].split(":");
            start[1] = new_end[0] + ":" + new_end[1];

            end = args.source.data.end;
            end = end.split(" ");
            new_date = end[0].split("-");
            end[0] = new_date[2] + "-" + new_date[1] + "-" + new_date[0];
            new_end = end[1].split(":");
            end[1] = new_end[0] + ":" + new_end[1];

            // if event object doesn't specify "bubbleHtml" property
            // this onLoad handler will be called to provide the bubble HTML
            args.html =
              "<span style='font-weight: 900'>" +
              args.source.data.text +
              "</span></br>" +
              "Début: " +
              start[0] +
              " à " +
              start[1] +
              "</br>" +
              "Fin: " +
              end[0] +
              " à " +
              end[1] +
              "</br>" +
              "<a href='https://0002-zebridge-dev-externe.crm-simple.com/action_edit.php?idaction=" +
              idaction +
              "' target='_blank'rel='noopener' >Voir plus</a>";
            start = "";
            end = "";
           
          },
        }),
        treeEnabled: true,
        onBeforeEventRender: (args) => {
          if (args.data.lock === "1") {
            args.data.moveDisabled = true;
            args.data.resizeDisabled = true;
            args.data.clickDisabled = true;
          }
          // } else {
          //   args.data.moveDisabled = true;
          //   args.data.resizeDisabled = true;
          //   args.data.clickDisabled = true;
          // }
          args.data.barColor = args.data.color;
          args.data.areas = [
            {
              top: 12,
              right: 6,
              width: 16,
              height: 16,
              icon: "fas fa-chevron-down",
              fontColor: "#999",
              visibility: "Visible",
              action: "ContextMenu",
              style:
                "display:flex;justify-content:center; align-items: center;background-color: #f9f9f9; border: 1px solid #ccc; cursor:pointer;",
            },
          ];
        },
      },
    };
  },
  components: {
    DayPilotScheduler,
    Multiselect,
  },
  computed: {
    // DayPilot.Scheduler object - https://api.daypilot.org/daypilot-scheduler-class/
    scheduler: function () {
      return this.$refs.scheduler.control;
    },
  },
  methods: {
    show() {
      this.showing = this.showing.length === 0 ? "is-active" : "";
    },

    setView(type) {
      this.typeview = type;
      this.show();
      this.dispatchAction();
    },
    setColor(type, data) {
      let color = type.color;
      try {
        const jsondata = data.color.value;
        color = JSON.parse(jsondata)[type.index];
      } catch (error) {
        //console.log("undefined color data");
      }

      return color;
    },
    setRenderRangeText() {
  
      let index = (this.months.indexOf(this.month_selected) + 1).toLocaleString(
        "en-US",
        { minimumIntegerDigits: 2, useGrouping: false }
      );
    
      this.startDate = this.year_selected + "-" + index + "-01";
   
      this.endDate = this.year_selected + "-" + index + "-31";

    },
    getQueryParam() {
      /**
       *@param none
       *@author Jacques
       *@Resume : figure out  filter on API request
       *@example : condition:idutilisateur:egal:1:OR:idutilisateur:egal:4:separator:AND:condition:idprojet:egal:1:OR:idprojet:egal:4060:separator:AND:condition:idsociete:egal:4:OR:idsociete:egal:2234
       **/

      let filter = "";
      // filtering users
      if (this.selectedUsers.length > 0) {
        filter = filter.concat(
          filter.length === 0 ? "condition:" : ":separator:AND:condition:",
          this.setfilter(
            this.selectedUsers.map((e) => {
              return e.id;
            }),
            "idutilisateur"
          )
        );
      }

      // idprojet
      if (this.idprojets.length > 0) {
        filter = filter.concat(
          filter.length === 0 ? "condition:" : ":separator:AND:condition:",
          this.setfilter(this.idprojets, "idprojet")
        );
      }

      // idcontact
      if (this.idcontacts.length > 0) {
        filter = filter.concat(
          filter.length === 0 ? "condition:" : ":separator:AND:condition:",
          this.setfilter(this.idcontacts, "idcontact")
        );
      }

      // idsociete
      if (this.idsocietes.length > 0) {
        filter = filter.concat(
          filter.length === 0 ? "condition:" : ":separator:AND:condition:",
          this.setfilter(this.idsocietes, "idsociete")
        );
      }
      filter = filter.concat(
        filter.length === 0 ? "condition:" : ":separator:AND:condition:",
        "date_action:biggerthanoregal:" +
          this.startDate +
          ":AND:date_action:lowerthanoregal:" +
          this.endDate
      );

      return filter;
    },
    setfilter(listArray, param) {
      if (listArray.length === 1) {
        return param + ":egal:" + listArray[0];
      } else {
        return (
          param +
          ":egal:" +
          listArray[0] +
          ":OR:" +
          this.setfilter(listArray.slice(1), param)
        );
      }
    },
    async loadUsers() {
      return await axios({
        method: "get",
        url: this.USER_API + this.API_KEY,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.data.result === 1) {
            this.users = response.data.data.map((el) => {
              return {
                id: el.idutilisateur.value.toString(),
                name: el.nom_utilisateur.value.toString(),
              };
            });
            this.selectedUsers = this.users.filter(
              (x) => x.id in this.idUtilisateurs
            );

            this.config.iduser = this.IdUser;
            Vue.set(this.config, "resources", this.users); // setting new  properties for config
          } else {
            //console.log(response.data.err_message);
          }

          return response.data.result;
        })
        .catch((error) => {
          console.log(error);
          //return response.data.result;
        });
    },
    dispatchAction() {
      this.isLoading = true;
      this.getData(0).then((items) => {
        Vue.set(this.config, "events", items.flat(Infinity));

        this.isLoading = false;
      });
    },

    Update_event(events) {
      var new_string = "" + events.start;
      new_string = new_string.replace("T", " ");
      let tab = new_string.split(".")[0];

      var fin = new Date(events.end);
      var debut = new Date(events.start);

      const time_difference = fin.getTime() - debut.getTime();
      const hours = Math.floor(time_difference / (1000 * 60 * 60));
      const remaining_milliseconds = time_difference % (1000 * 60 * 60);
      const minutes = Math.floor(remaining_milliseconds / (1000 * 60));

      var data = JSON.stringify({
        idaction: events.idaction,
        sujet: events.text,
        idutilisateur: events.resource,
        date_action: tab,
        e_lock: events.lock,
        duree_heures: hours,
        duree_minutes: minutes,
        color: events.color === "" ? "#9e5fff" : events.color,
      });

      var config = {
        method: "put",
        url: this.URI_ACTION + this.API_KEY,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      return axios(config)
        .then(async () => {
          this.scheduler.update(events);
          this.config.event = [];
          await this.dispatchAction();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleCreateSchedule() {
      const dp = this.events.control;

      this.form.submit = true;
      if (this.form.sujet != "") {
        this.loading = true;

        var ef = this;
        var tab = String(this.events.start.value).replace("T", " ");
        tab = tab.replace(".000Z", "");

        var fin = new Date(this.events.end.value);
        var debut = new Date(this.events.start.value);

        const time_difference = fin.getTime() - debut.getTime();

        //calculate days difference by dividing total milliseconds in a day
        const hours = Math.floor(time_difference / (1000 * 60 * 60));
        const remaining_milliseconds = time_difference % (1000 * 60 * 60);
        const minutes = Math.floor(remaining_milliseconds / (1000 * 60));

        var data = JSON.stringify({
          sujet: ef.form.sujet,
          date_action: tab,
          color: "#9e5fff",
          duree_heures: hours,
          idutilisateur: this.events.resource,
          duree_minutes: minutes,
        });

        var config = {
          method: "post",
          url: this.URI_ACTION + this.API_KEY,
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };

        return axios(config).then((response) => {
          let newElement = {
            idaction: response.data.idaction,
            start: this.events.start.value,
            end: this.events.end.value,
            id: response.data.idaction,
            resource: this.events.resource,
            text: this.form.sujet,
            color: "#9e5fff",
            lock: "0",
          };

          dp.events.add(newElement);
          this.loading = false;
          this.isComponentModalActive = false;
          this.form.sujet = "";
          this.errors.sujet = "";
          return newElement;
        });
      } else {
        this.loading = false;
        this.errors.sujet = "Le champs titre est obligatoire";
      }
    },
    async getData(nbPage = 0) {
      return axios({
        method: "get",
        url:
          this.URI + this.API_KEY + "/" + this.getQueryParam() + "/" + nbPage,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.data.data.length > 0) {
            let data = response.data.data.map((tache) => {
              return {
                id: tache.idaction.value.toString(),
                idaction: tache.idaction.value,
                start: tache.date_action.value,
                end: tache.date_fin.value,
                text: tache.sujet.value,
                resource: tache.idutilisateur.value,
                lock: tache.e_lock.value,
                color: this.setColor(this.typeview, tache),

                //color: tache.color.value === "" ? "#9e5fff" : tache.color.value,
                //bgColor: tache.color.value || "#FFF",
                // bgColor: "#e8eef7",
              };
            });
            return Promise.all([...data, this.getData(++nbPage)]);
          } else {
            return [];
          }
        })
        .catch(() => {
          return [];
        });
    },
    // loadEvents() {
    //   Vue.set(this.config, "events", this.myEvents);
    // },
    //loadResources() {
    /***
     * Loading user data and set them as ressource
     */
    // this.loadUsers().then(data)=> {
    // }
    //   Vue.set(this.config, "resources", this.myResources);
    // },

    updateColor(e, color) {
      var dp = this.scheduler;
      e.data.color = color;
      dp.events.update(e);
    },

    // updateTâches() {
    //   for (let item of this.config.events) {
    //     this.updateColor(item, item.color);
    //     this.lockTâches(item);
    //   }
    // },
    updateStartDate() {
      let index = (this.months.indexOf(this.month_selected) + 1).toLocaleString(
        "en-US",
        { minimumIntegerDigits: 2, useGrouping: false }
      );
      this.config.startDate = this.year_selected + "-" + index + "-01";
     // this.startDate = this.year_selected + "-" + index + "-01";
       this.setRenderRangeText();

      this.dispatchAction();
    },
  },
  watch: {
    isComponentModalActive() {
      if (!this.isComponentModalActive) {
        this.form.sujet = "";
        this.errors.sujet = "";
      }
      this.config.timeRangeSelectedHandling = !this.isComponentModalActive
        ? "CallBack"
        : "Enabled";
    },
  },

  async mounted() {
    this.setRenderRangeText();
    await this.loadUsers(); // loading users list* and ressource by the  way
    this.dispatchAction(); // Load and set planing's  items;
  },
};
</script>
<style lang="scss" scoped>
@import "@/variables.scss";

.color_rond {
  border-radius: 8px;
  width: 12px;
  height: 12px;
  margin: 1px;
}
.icon-private {
  background-color: #9e5fff !important;
  height: 10px;
  margin-top: 5px;
  border-radius: 10px;
  border: solid 1px #9e5fff;
  width: 11px;
}
// .icon-private {
//   // icon-blue:before {
//   background-color: #9e5fff;
//   //}
// }
.schelduler,
.scheduler_default_main {
  font-family: "Poppins", sans-serif !important;
}
label {
  display: inline-flex;
  padding: 20px 20px 10px;
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
</style>
