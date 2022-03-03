<template>
  <section class="gantt">
    <b-loading
      :is-full-page="isFullPage"
      v-model="isLoading"
      :can-cancel="true"
    ></b-loading>
    <div class="column is-12">
      <div class="columns multiline px-6 py-2">
        <div class="column is-12-touch">
          <div class="columns is-vcentered is-left has-text-left is-mobile">
            <div class="column is-narrow">
              <div class="field is-horizontal">
                <label class="label pt-2">Affichage : &nbsp;</label>
                <div class="control">
                  <div class="dropdown" v-bind:class="showing">
                    <div class="dropdown-trigger">
                      <button
                        class="button"
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
                      <div class="dropdown-content">
                        <a
                          class="dropdown-item"
                          v-for="(item, i) in arrayFilter"
                          :key="i"
                          :value="item.title"
                          @click="setView(item)"
                        >
                          <span class="icon-text">
                            <span
                              class="icon"
                              v-bind:style="{ color: item.color }"
                            >
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
              <div class="field is-horizontal">
                <label class="label pt-2">Utilisateurs : &nbsp;</label>
                <div class="control">
                  <div class="select">
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
              <div class="field is-horizontal">
                <div class="control">
                  <div class="select">
                    <select v-model="month_selected" @change="updateStartDate">
                      <option
                        v-for="(option, index) in months"
                        :value="option"
                        :key="index"
                      >
                        {{ option }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-narrow">
              <div class="field is-horizontal">
                <div class="control">
                  <div class="select">
                    <select v-model="year_selected" @change="updateStartDate">
                      <option
                        v-for="year in [
                          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                          16, 17, 18, 19,
                        ]"
                        :value="currentYear - year"
                        :key="year"
                      >
                        {{ currentYear - year }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <DayPilotGantt id="dp" :config="config" ref="gantt" />
  </section>
</template>

<script>
import { DayPilot, DayPilotGantt } from "daypilot-pro-vue";
import axios from "axios";
import moment from "moment";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

export default {
  name: "Gantt",
  props: {
    API_KEY: {
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

    dataList: {
      type: Array,
      default() {
        return [];
      },
    },

    USER_API: {
      type: String,
      default() {
        return "https://0002-zebridge-dev-externe.api.crm-simple.com/utilisateurs/";
      },
    },
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
  },
  data() {
    return {
      isFullPage: false,
      isLoading: true,
      startDate: "",
      endDate: "",
      config: {
        cellWidthSpec: "Fixed",
        cellWidth: 40,
        timeHeaders: [
          { groupBy: "Month", format: "MMMM yyyy" },
          { groupBy: "Week" },
          { groupBy: "Day", format: "d" },
        ],
        scale: "Day",
        days: DayPilot.Date.today().daysInYear(),
        startDate: DayPilot.Date.today().firstDayOfMonth(),
        rowHeaderHideIconEnabled: false,
        events: null,
        row: {
          bubbleHtml: "Row bubble",
        },
        columns: [
          {
            title: "Liste des tâches",
            width: 50,
            property: "text",
          },
        ],
        locale: "fr-fr",
        rowMoveHandling: "Disabled",
        onRowMoved: (args) => {
          var data = {};

          var config = {
            method: "put",
            url: this.URI_ACTION + this.API_KEY,
            headers: {
              "Content-Type": "application/json",
            },
            data: data,
          };
          if (args.position === "child") {
            data = JSON.stringify({
              idaction: args.kf.data.task.id,
              idaction_parent: args.lf.data.task.id,
            });

            config.data = data;
            axios(config).then(() => {
              this.gantt.tasks.update(args.e);
            });
          } else {
            data = JSON.stringify({
              idaction: args.kf.data.task.id,
              idaction_parent: null,
            });

            config.data = data;
            axios(config).then(() => {
              this.gantt.tasks.update(args.e);
            });
          }
        },
        taskMoveHandling: "Update",
        onTaskResized: (args) => {
          this.updateTask(args);
        },
        onTaskMoved: (args) => {
          this.updateTask(args);
        },
        linkCreateHandling: "Update",
        onLinkCreated: (args) => {
          console.log("onLinkCreated", args);

          var data = {};

          var config = {
            method: "put",
            url: this.URI_ACTION + this.API_KEY,
            headers: {
              "Content-Type": "application/json",
            },
            data: data,
          };

          let to_Start_date = args.target.start().value;
          let from_start_date = args.source.start().value;

          config.data = data;
          if (moment(to_Start_date).isSameOrAfter(from_start_date)) {
            data = JSON.stringify({
              idaction: args.to,
              idaction_parent: args.from,
            });

            axios(config).then(() => {
              this.gantt.tasks.update(args.e);
            });
          } else {
            // unlink
            let findLink = this.gantt.links.findByFromTo(args.from, args.to);
            if (findLink) this.gantt.links.remove(findLink);
          }
        },
        rowCreateHandling: "Enabled",
        onRowCreate: (args) => {
          console.log("onRowCreate", args);
          var ef = this;
          var today = new Date();
          //format date to YYYY-MM-dd hh:mm:ss
          var date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate() +
            " " +
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds();

          // format date from 2022-1-1 to 2022-01-01 with moment
          date = moment(date).format("YYYY-MM-DD HH:mm:ss");

          var data = JSON.stringify({
            sujet: args.text,
            date_action: date,
            color: "#9e5fff",
            duree_heures: "24",
            duree_minutes: "00",
          });

          var config = {
            method: "post",
            url: this.URI_ACTION + this.API_KEY,
            headers: {
              "Content-Type": "application/json",
            },
            data: data,
          };
          axios(config).then(function (response) {
            ef.gantt.tasks.add({
              id: DayPilot.guid(),
              text: args.text,
              start: new DayPilot.Date().getDatePart(),
              end: new DayPilot.Date().getDatePart().addDays(1),
              idaction: response.data.idaction,
            });
          });
        },
      },
      locale: "fr-FR",
      currentYear: "",
      gantt: null,
      users: [],
      selectedUsers: [],
      CscheduleList: [],
      showing: "",
      typeview: {
        title: "Selectionnez",
        color: "#2251ff",
        index: "color_defaut",
      },
    };
  },
  components: {
    DayPilotGantt,
    Multiselect,
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
        console.log("undefined color data");
      }

      return color;
    },
    isUserSelected(idUser) {
      return this.idUtilisateurs.find(idUser) > 0;
    },
    async loadUsers() {
      await axios({
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
          } else {
            console.log(response.data.err_message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    generateQueryFor(dataArray, dataParam, result) {
      if (dataArray.length > 0) {
        result = result.concat(
          result.length === 0 ? "condition:" : ":separator:AND:condition:",
          this.setfilter(dataArray, dataParam)
        );
      }
      return result;
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

      // Setting condition on Dates

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
    dispatchAction() {
      this.isLoading = true;
      this.loadTasks(0).then((items) => {
        // init customTasks variable
        let tasksList = [];

        // change all items with idaction_parent equal to 0 to null
        tasksList = items.slice(0, items.length - 1).map((item) => {
          item.color = this.typeview.color;
          item.bgColor = this.typeview.color;

          if (item.idaction_parent === 0) {
            item.idaction_parent = "";
          }
          return item;
        });

        let tasks = tasksList;
        // load links
        let links = this.loadLinks(tasksList);

        this.CscheduleList = tasks;

        // create gantt with tasks
        this.gantt.update({ tasks: tasksList });

        // create links
        this.gantt.update({ links: links });

        this.isLoading = false;
      });
    },
    async loadTasks(nbPage = 0, onDueDate = false) {
      return axios({
        method: "get",
        url:
          this.URI +
          this.API_KEY +
          "/" +
          this.getQueryParam(onDueDate ? "date_echeance" : "date_action") +
          "/" +
          nbPage,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.data.data.length > 0) {
            let result = response.data.data.map((e) => {
              return {
                start: e.date_action.value,
                end: e.date_fin.value,
                text: e.sujet.value,
                id: e.idaction.value.toString(),
                complete: 0,
                idaction_parent: e.idaction_parent,
                box: {
                  backColor: "#e8eef7",
                  barBackColor:
                    onDueDate && this.typeview.index != "color_priorite"
                      ? "#f2a640"
                      : this.setColor(this.typeview, e),
                },
              };
            });
            return Promise.all([
              ...result,
              this.loadTasks(++nbPage, onDueDate),
            ]);
          } else {
            return [];
          }
        })
        .catch(() => {
          return [];
        });
    },
    loadLinks(hierachiralTreeArray) {
      let tree = hierachiralTreeArray;
      let item;
      let i;
      let len;
      let id;
      let parent;
      let links = [];

      // build links
      for (i = 0, len = tree.length; i < len; i++) {
        item = tree[i];
        id = item.id;
        parent = item.idaction_parent.value;
        if (parent) {
          // lookup index of parent
          let parent_object = tree.find((e) => {
            return e.id === parent;
          });

          if (parent_object) {
            // set position by date start end
            if (moment(parent_object.start).isBefore(item.start)) {
              links.push({
                from: parent,
                to: id,
                type: "FinishToStart",
              });
            } else if (moment(parent_object.end).isAfter(item.end)) {
              links.push({
                from: parent,
                to: id,
                type: "StartToStart",
              });
            } else {
              links.push({
                from: parent,
                to: id,
                type: "FinishToFinish",
              });
            }
          }
        }
      }
      return links;
    },
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
    hierachiralTreeArray(array) {
      let tree = [];
      let lookup = {};
      let items;
      let item;
      let i;
      let len;
      // eslint-disable-next-line no-unused-vars
      let parent;

      items = array;
      for (i = 0, len = items.length; i < len; i++) {
        item = items[i];
        lookup[item.id] = item;
        parent = lookup[item.idaction_parent.value];
        item.children = [];
      }

      for (i = 0, len = items.length; i < len; i++) {
        item = items[i];
        parent = lookup[item.idaction_parent.value];
        if (parent) {
          parent.children.push(item);
        } else {
          tree.push(item);
        }
      }

      for (i = 0, len = tree.length; i < len; i++) {
        item = tree[i];
        if (item.children.length === 0) {
          delete item.children;
        }
      }
      return tree;
    },
    updateTask(args) {
      var ef = this;
      var date = new Date(args.newStart).toISOString();
      date = date.replace("T", " ");
      date = date.split(".")[0];
      var fin = new Date(args.newEnd);

      var debut = new Date(args.newStart);

      const time_difference = fin.getTime() - debut.getTime();
      const hours = Math.floor(time_difference / (1000 * 60 * 60));
      const remaining_milliseconds = time_difference % (1000 * 60 * 60);
      const minutes = Math.floor(remaining_milliseconds / (1000 * 60));

      var data = JSON.stringify({
        idaction: args.task.data.id,
        date_action: date,
        duree_heures: hours,
        duree_minutes: minutes,
      });

      var config = {
        method: "put",
        url: this.URI_ACTION + this.API_KEY,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config).then(function () {
        ef.gantt.tasks.update(args.e);
      });
    },
  },
  async mounted() {
    this.setRenderRangeText();
    this.gantt = this.$refs.gantt.control;
    this.month_selected_number = new Date().getMonth();
    this.month_selected = this.months[this.month_selected_number];
    this.year_selected = new Date().getFullYear();
    this.currentYear = this.year_selected;

    await this.loadUsers(); // loading users list
    this.dispatchAction();
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables.scss";
</style>
