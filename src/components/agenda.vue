<template>
  <div class="columns is-multiline is-mobile">
    <b-loading
      :is-full-page="isFullPage"
      v-model="isLoading"
      :can-cancel="true"
    ></b-loading>
    <div class="column is-12">
      <div
        class="is-flex-widescreen is-flex-wrap-wrap is-justify-content-space-between is-align-items-center px-6 py-2 has-text-left"
      >
        <div class="is-flex-widescreen is-align-items-center">
          <div
            class="is-flex-tablet is-flex-wrap-wrap is-align-items-center mr-2 mb-2"
          >
            <label class="label pt-2">
              Affichage <span class="is-hidden-widescreen">&nbsp;&nbsp;</span> :
              &nbsp;
            </label>
            <div class="control is-flex-grow-2">
              <div
                class="dropdown is-block is-fullwidth"
                v-bind:class="showing"
              >
                <div class="dropdown-trigger">
                  <button
                    class="button is-fullwidth is-justify-content-space-between"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                    @click="show"
                  >
                    <span class="icon-text">
                      <span class="icon">
                        <i
                          class="fas fa-circle"
                          v-bind:style="{ color: typeview.color }"
                        ></i>
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
                        <span class="icon" v-bind:style="{ color: item.color }">
                          <i class="fas fa-circle"></i>
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
          <div
            class="is-flex-tablet is-flex-wrap-wrap is-align-items-center mr-2 mb-2"
          >
            <label class="label pt-2">Utilisateurs : &nbsp;</label>
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
                  <template
                    slot="selection"
                    slot-scope="{ values, isOpen }"
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
          <div
            class="is-flex-tablet is-align-items-center is-justify-content-end mb-2 mr-2"
          >
            <div class="control is-flex is-flex-grow-2">
              <span
                class="is-hidden-mobile is-block-tablet-only is-hidden-widescreen"
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <div class="select is-flex-grow-2 is-flex">
                <select
                  v-model="view"
                  class="is-flex-grow-2"
                  @change="dispatchAction"
                >
                  <option
                    v-for="(option, index) in viewModeOptions"
                    :value="option.value"
                    :key="index"
                  >
                    {{ option.title }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <label
            for="history"
            class="label is-flex-tablet is-flex-wrap-wrap is-align-items-center mr-2 mb-2"
          >
            Historique<span class="is-hidden-widescreen"
              >&nbsp;&nbsp;&nbsp;</span
            >
            : &nbsp;
            <input
              type="checkbox"
              id="history"
              v-model="history"
              @click="dispatchAction"
            />
          </label>
        </div>
        <div
          class="is-flex is-flex-wrap-wrap is-justify-content-center is-align-items-center"
        >
          <div class="mr-2 mb-2 text-center">
            <strong class="is-size-5">{{ renderRange }}</strong>
          </div>
          <div class="is-flex is-flex-grow-2 is-align-items-center">
            <div class="mr-2 mb-2">
              <button
                type="button"
                class="button is-flex is-align-items-center is-outlined flat-button"
                data-action="move-prev"
                @click="prev()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div class="mr-2 mb-2 is-flex-grow-2">
              <button
                type="button"
                class="button is-block is-fullwidth is-outlined flat-button"
                data-action="move-today"
                @click="today()"
              >
                Aujourd'hui
              </button>
            </div>
            <div class="mr-2 my-2">
              <button
                type="button"
                class="button is-flex is-align-items-center is-outlined flat-button"
                data-action="move-next"
                @click="next()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-12" id="calendar">
      <Calendar
        ref="tuiCalendar"
        style="height: 800px; width: 100%"
        :view="view"
        :calendars="calendarList"
        v-bind:schedules="CscheduleList"
        :taskView="taskView"
        :scheduleView="scheduleView"
        :theme="theme"
        :week="week"
        :month="month"
        :useCreationPopup="useCreationPopup"
        :useDetailPopup="useDetailPopup"
        :timezones="timezones"
        :disableDblClick="disableDblClick"
        :isReadOnly="isReadOnly"
        :template="template"
        @beforeCreateSchedule="onBeforeCreateSchedule"
        @beforeDeleteSchedule="onBeforeDeleteSchedule"
        @beforeUpdateSchedule="onBeforeUpdateSchedule"
        @clickDayname="onClickDayname"
        @clickSchedule="onClickSchedule"
        @clickTimezonesCollapseBtn="onClickTimezonesCollapseBtn"
      />
      <div
        class="tui-full-calendar-floating-layer"
        id="floating-layer-container"
        style="display: block; position: absolute; z-index: 1000"
        v-if="selected || creating"
      >
        <div
          class="tui-full-calendar-popup tui-full-calendar-popup-detail"
          v-if="!editing"
        >
          <div
            class="tui-full-calendar-popup-container"
            v-if="selected && !editing"
          >
            <div
              class="tui-full-calendar-popup-section tui-full-calendar-section-header"
            >
              <div>
                <span
                  class="tui-full-calendar-schedule-private tui-full-calendar-icon tui-full-calendar-ic-private"
                ></span>
                <span class="tui-full-calendar-schedule-title">{{
                  selected.schedule.title
                }}</span>
              </div>
              <div
                class="tui-full-calendar-popup-detail-date tui-full-calendar-content"
              >
                {{
                  getTemplate().popupDetailDate(
                    selected.schedule.isAllDay,
                    selected.schedule.start,
                    selected.schedule.end
                  )
                }}
              </div>
            </div>
            <div class="tui-full-calendar-section-detail">
              <div
                class="tui-full-calendar-popup-detail-item"
                v-if="selected.schedule.location"
              >
                <span
                  class="tui-full-calendar-icon tui-full-calendar-ic-location-b"
                ></span
                ><span class="tui-full-calendar-content">{{
                  getTemplate().popupDetailLocation(selected.schedule)
                }}</span>
              </div>

              <div class="tui-full-calendar-popup-detail-item">
                <span
                  class="tui-full-calendar-icon tui-full-calendar-ic-state-b"
                ></span
                ><span class="tui-full-calendar-content">
                  {{ getTemplate().popupDetailState(selected.schedule) }}</span
                >
              </div>
              <div class="tui-full-calendar-popup-detail-item">
                <span
                  class="tui-full-calendar-icon tui-full-calendar-calendar-dot"
                  :style="{
                    backgroundColor: getCalendar(selected.schedule.calendarId)
                      .bgColor,
                  }"
                ></span
                ><span class="tui-full-calendar-content">{{
                  getCalendar(selected.schedule.calendarId).name
                }}</span>
              </div>
            </div>
            <div
              class="tui-full-calendar-section-button"
              v-if="!selected.schedule.isReadOnly"
            >
              <button class="tui-full-calendar-popup-edit" @click="edit()">
                <span
                  class="tui-full-calendar-icon tui-full-calendar-ic-edit"
                ></span
                ><span class="tui-full-calendar-content">Modifier</span>
              </button>
              <div class="tui-full-calendar-popup-vertical-line"></div>
              <button
                class="tui-full-calendar-popup-delete"
                @click="onBeforeDeleteSchedule(selected)"
              >
                <span
                  class="tui-full-calendar-icon tui-full-calendar-ic-delete"
                ></span
                ><span class="tui-full-calendar-content">Supprimer</span>
              </button>
            </div>
          </div>
          <div
            class="tui-full-calendar-popup-top-line"
            :style="{
              backgroundColor: getCalendar(selected.schedule.calendarId)
                .bgColor,
            }"
            v-if="selected && !editing"
          ></div>
          <div
            id="tui-full-calendar-popup-arrow"
            class="tui-full-calendar-popup-arrow tui-full-calendar-arrow-left"
            v-if="selected && !editing"
          >
            <div class="tui-full-calendar-popup-arrow-border">
              <div class="tui-full-calendar-popup-arrow-fill"></div>
            </div>
          </div>
        </div>
        <iframe
          title="iframe"
          ref="editdata"
          id="tui-full-calendar-popup-iframe"
          referrerpolicy="unsafe-url"
          @load="checkingFrame"
          @pageshow="checkingFrame"
          :src="
            creating
              ? URI_ACTION_CREATION + '?date_debut=' + dateCreateEvent
              : URI_ACTION_UPDATE + selected.schedule.id
          "
          width="100%"
          height="100%"
          v-if="editing || creating"
          name="editdata"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { Calendar } from "@toast-ui/vue-calendar"; /* ES6 */
import "tui-calendar/dist/tui-calendar.css";
// If you use the default popups, use this.
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

import axios from "axios";

import moment from "moment";

import myTheme from "./myTheme";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
// eslint-disable-next-line no-unused-vars
const getDate = (type, start, value, operator) => {
  start = new Date(start);
  type = type.charAt(0).toUpperCase() + type.slice(1);
  if (operator === "+") {
    start[`set${type}`](start[`get${type}`]() + value);
  } else {
    start[`set${type}`](start[`get${type}`]() - value);
  }
  return start;
};
export default {
  components: { Calendar, Multiselect },
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

    URI_HISTORY: {
      type: String,
      default() {
        return "https://0002-zebridge-dev-externe.api.crm-simple.com/interactionshistorique/";
      },
    },

    URI_ACTION: {
      type: String,
      default() {
        return "https://0002-zebridge-dev-externe.api.crm-simple.com/interaction/";
      },
    },

    URI_ACTION_CREATION: {
      type: String,
      default() {
        return "https://0002-zebridge-dev-externe.crm-simple.com/action_edit.php";
      },
    },

    URI_ACTION_UPDATE: {
      type: String,
      default() {
        return "https://0002-zebridge-dev-externe.crm-simple.com/action_edit.php?idaction=";
      },
    },

    locale: {
      type: String,
      default() {
        return "fr-FR";
      },
    },

    calendarList: {
      type: Array,
      default() {
        return [
          {
            id: "0",
            name: "Private",
            bgColor: "#9e5fff",
            borderColor: "#9e5fff",
          },
          {
            id: "1",
            name: "Company",
            bgColor: "#00a9ff",
            borderColor: "#00a9ff",
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
    scheduleList: {
      type: Array,
      default() {
        return [];
      },
    },
    viewModeOptions: {
      type: Array,
      default() {
        return [
          {
            title: "Mois",
            value: "month",
          },
          {
            title: "Semaine",
            value: "week",
          },
          {
            title: "Jour",
            value: "day",
          },
        ];
      },
    },

    dateRange: {
      type: Array,
      default() {
        return [moment().subtract(1, "month").toDate(), moment().toDate()];
      },
    },

    timezones: {
      type: Array,
      default() {
        return [
          // paris
          {
            name: "Europe/Paris",
            label: "Paris",
            offset: "+01:00",
          },
        ];
      },
    },

    month: {
      type: Object,
      default() {
        return {
          startDayOfWeek: 1,
          daynames: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
        };
      },
    },

    week: {
      type: Object,
      default() {
        return {
          showTimezoneCollapseButton: true,
          timezonesCollapsed: true,
          daynames: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
          startDayOfWeek: 1,
        };
      },
    },

    taskView: {
      type: Boolean,
      default() {
        return true;
      },
    },

    scheduleView: {
      type: Array,
      default() {
        return ["time"];
      },
    },

    disableDblClick: {
      type: Boolean,
      default() {
        return true;
      },
    },

    isReadOnly: {
      type: Boolean,
      default() {
        return false;
      },
    },
    useCreationPopup: {
      type: Boolean,
      default() {
        return false;
      },
    },
    useDetailPopup: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      users: [],
      selectedUsers: [],
      editing: false,
      history: false,
      creating: false,
      clickCount: 0,
      selected: null,
      isFullPage: false,
      isLoading: true,
      info: null,
      event: null,
      view: "month",
      isComponentModalActive: false,
      renderRange: null,
      startDate: "",
      endDate: "",
      dateCreateEvent: "",
      form: {
        sujet: "",
        color: "",
        date_debut: "",
        date_fin: "",

        submit: false,
      },
      errors: {
        sujet: "Le champs titre est obligatoire",
        date_debut: "Le date debut est obligatoire",
        date_fin: "Le date fin est obligatoire",
        color: "Le champs couleur est obligatoire",
      },
      template: this.getTemplate(),
      theme: myTheme,
      CscheduleList: [],
      showing: "",
      iframeInteract: 0, //  watching
      typeview: {
        title: "Selectionnez",
        color: "#2251ff",
        index: "color_defaut",
      },
    };
  },

  methods: {
    show() {
      this.showing = this.showing.length === 0 ? "is-active" : "";
    },

    setView(type) {
      this.typeview = type;
      this.show(); // show or hide the dropdown

      this.dispatchAction();
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
          } 
        });
    },
    async dispatchAction() {
      this.isLoading = true;

      // callinf fisrt route
      this.CscheduleList = await this.getCalendarItem(0, false).then(
        (items) => {
          return items.flat(Infinity);
        }
      );

      // 2 route onDueDate is true
      this.CscheduleList = this.CscheduleList.concat(
        await this.getCalendarItem(0, true).then((items) => {
          return items.flat(Infinity);
        })
      );

      // calling third route
      if (this.history) {
        this.CscheduleList = this.CscheduleList.concat(
          await this.getIteractionsHistory(0).then((historyItems) => {
            return historyItems.flat(Infinity);
          })
        );
      }
      this.isLoading = false;
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
    getTemplate() {
      const th = this;
      return {
        milestone: function (schedule) {
          return (
            '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' +
            schedule.bgColor +
            '">' +
            schedule.title +
            "</span>"
          );
        },
        milestoneTitle: function () {
          return '<span class="tui-full-calendar-left-content">ETAPE</span>';
        },
        task: function (schedule) {
          return "#" + schedule.title;
        },
        taskTitle: function () {
          return '<span class="tui-full-calendar-left-content">TACHE</span>';
        },
        allday: function (schedule) {
          return th._getTimeTemplate(schedule, true);
        },
        alldayTitle: function () {
          return '<span class="tui-full-calendar-left-content"> Toute la journée</span>';
        },
        time: function (schedule) {
          return th._getTimeTemplate(schedule, false);
        },
        goingDuration: function (schedule) {
          return (
            '<span class="calendar-icon ic-travel-time"></span>' +
            schedule.goingDuration +
            "min."
          );
        },
        comingDuration: function (schedule) {
          return (
            '<span class="calendar-icon ic-travel-time"></span>' +
            schedule.comingDuration +
            "min."
          );
        },
        monthMoreTitleDate: function (date, dayname) {
          var day = date.split(".")[2];

          return (
            '<span class="tui-full-calendar-month-more-title-day">' +
            day +
            '</span> <span class="tui-full-calendar-month-more-title-day-label">' +
            dayname +
            "</span>"
          );
        },
        monthMoreClose: function () {
          return '<span class="tui-full-calendar-icon tui-full-calendar-ic-close"></span>';
        },
        monthGridHeader: function (dayModel) {
          var date = parseInt(dayModel.date.split("-")[2], 10);
          var classNames = ["tui-full-calendar-weekday-grid-date "];

          if (dayModel.isToday) {
            classNames.push("tui-full-calendar-weekday-grid-date-decorator");
          }

          return (
            '<span class="' + classNames.join(" ") + '">' + date + "</span>"
          );
        },
        monthGridHeaderExceed: function (hiddenSchedules) {
          return (
            '<span class="weekday-grid-more-schedules">+' +
            hiddenSchedules +
            "</span>"
          );
        },
        monthGridFooter: function () {
          return "";
        },
        monthGridFooterExceed: function () {
          return "";
        },
        monthDayname: function (model) {
          return model.label.toString().toLocaleUpperCase();
        },
        weekDayname: function (model) {
          return (
            '<span class="tui-full-calendar-dayname-date">' +
            model.date +
            '</span>&nbsp;&nbsp;<span class="tui-full-calendar-dayname-name">' +
            model.dayName +
            "</span>"
          );
        },
        weekGridFooterExceed: function (hiddenSchedules) {
          return "+" + hiddenSchedules;
        },
        dayGridTitle: function (viewName) {
          // use another functions instead of 'dayGridTitle'
          // milestoneTitle: function() {...}
          // taskTitle: function() {...}
          // alldayTitle: function() {...}

          var title = "";
          switch (viewName) {
            case "milestone":
              title =
                '<span class="tui-full-calendar-left-content">ETAPE</span>';
              break;
            case "task":
              title =
                '<span class="tui-full-calendar-left-content">TACHE</span>';
              break;
            case "allday":
              title =
                '<span class="tui-full-calendar-left-content">Toute la journée</span>';
              break;
            default:
              break;
          }

          return title;
        },

        collapseBtnTitle: function () {
          return '<span class="tui-full-calendar-icon tui-full-calendar-ic-arrow-solid-top"></span>';
        },

        timegridDisplayPrimayTime: function (time) {
          // will be deprecated. use 'timegridDisplayPrimaryTime'
          return time.hour.toString();
        },
        timegridCurrentTime: function (timezone) {
          var templates = [];

          if (timezone.dateDifference) {
            templates.push(
              "[" +
                timezone.dateDifferenceSign +
                timezone.dateDifference +
                "]<br>"
            );
          }

          templates.push(moment(timezone.hourmarker).format("HH:mm"));

          return templates.join("");
        },
        popupIsAllDay: function () {
          return "Toute la journée";
        },
        popupStateFree: function () {
          return "Libre";
        },
        popupStateBusy: function () {
          return "Occupé";
        },
        titlePlaceholder: function () {
          return "Sujet";
        },
        locationPlaceholder: function () {
          return "Lieu";
        },
        startDatePlaceholder: function () {
          return "Date de Début";
        },
        endDatePlaceholder: function () {
          return "Date de fin";
        },
        popupSave: function () {
          return "Valider";
        },
        popupUpdate: function () {
          return "Mettre à jour";
        },
        popupDetailDate: function (isAllDay, start, end) {
          var isSameDate = moment(start).isSame(end);
          var endFormat = (isSameDate ? "" : "YYYY/MM/DD ") + "HH:mm";

          if (isAllDay) {
            return (
              moment(start).format("YYYY/MM/DD") +
              (isSameDate ? "" : " - " + moment(end).format("YYYY/MM/DD"))
            );
          }

          return (
            moment(start.toDate()).format("YYYY/MM/DD HH:mm") +
            " - " +
            moment(end.toDate()).format(endFormat)
          );
        },
        popupDetailLocation: function (schedule) {
          return "Lieu : " + schedule.location;
        },
        // popupDetailUser: function (schedule) {
        // 	return 'Staff : ' + (schedule.attendees || []).join(', ')
        // },
        popupDetailState: function (schedule) {
          return " Statut: " + schedule.state === "Free" ? "Libre" : "Occupé";
        },
        popupDetailRepeat: function (schedule) {
          return "Repeat : " + schedule.recurrenceRule;
        },
        popupDetailBody: function (schedule) {
          return "Body : " + schedule.body;
        },
        popupEdit: function () {
          return "Modifier";
        },
        popupDelete: function () {
          return "Supprimer";
        },
      };
    },
    _getTimeTemplate(schedule, isAllDay) {
      var html = [];

      if (!isAllDay) {
        html.push(
          "<strong>" +
            moment(schedule.start.toDate()).format("HH:mm") +
            "</strong> "
        );
      }
      if (schedule.isPrivate) {
        html.push('<span class="calendar-font-icon ic-lock-b"></span>');
        html.push(" Private");
      } else {
        if (schedule.isReadOnly) {
          html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
        } else if (schedule.recurrenceRule) {
          html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
        } else if (schedule.attendees.length) {
          html.push('<span class="calendar-font-icon ic-user-b"></span>');
        } else if (schedule.location) {
          html.push('<span class="calendar-font-icon ic-location-b"></span>');
        }

        html.push(" " + schedule.title);
      }

      return html.join("");
    },

    setRenderRangeText() {
      let options = this.$refs.tuiCalendar.invoke("getOptions");
      let viewName = this.$refs.tuiCalendar.invoke("getViewName");
      let html = [];
      this.startDate = this.$refs.tuiCalendar
        .invoke("getDateRangeStart")
        .toDate()
        .toLocaleDateString("fr-CA");
      this.endDate = this.$refs.tuiCalendar
        .invoke("getDateRangeEnd")
        .toDate()
        .toLocaleDateString("fr-CA");

      if (viewName === "day") {
        html.push(this.currentCalendarDate("DD MMMM YYYY"));
      } else if (
        viewName === "month" &&
        (!options.month.visibleWeeksCount ||
          options.month.visibleWeeksCount > 4)
      ) {
        html.push(this.currentCalendarDate("MMMM YYYY"));
      } else {
        let time = moment(
          this.$refs.tuiCalendar.invoke("getDateRangeStart").getTime()
        );

        let currentdate = new Date(time);
        let oneJan = new Date(currentdate.getFullYear(), 0, 1);
        let numberOfDays = Math.floor(
          (currentdate - oneJan) / (24 * 60 * 60 * 1000)
        );
        let result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
        html.push(
          "Semaine " +
            result +
            " | " +
            moment(this.$refs.tuiCalendar.invoke("getDateRangeStart").getTime())
              .locale(this.locale)
              .format("DD MMMM YYYY")
        );
        html.push(" - ");
        html.push(
          moment(this.$refs.tuiCalendar.invoke("getDateRangeEnd").getTime())
            .locale(this.locale)
            .format("DD MMMM YYYY")
        );
      }
      this.renderRange = html.join("");
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
    getQueryParam(dateFilter = "date_action") {
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
        dateFilter +
          ":biggerthanoregal:" +
          this.startDate +
          ":AND:" +
          dateFilter +
          ":lowerthanoregal:" +
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

    async getCalendarItem(nbPage = 0, onDueDate = false) {
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
      }).then((response) => {
        if (response.data.data.length > 0) {
          let result = response.data.data.map((element) => {
            return {
              start: element.date_action.value,
              end: element.date_fin.value,
              isReadOnly: element.e_lock.value === "1",
              location: element.location.value,
              idaction: element.idaction.value,
              title: element.sujet.value,
              bgColor:
                onDueDate && this.typeview.index != "color_priorite"
                  ? "#f2a640"
                  : this.setColor(this.typeview, element),
              category: "time",
              color:'#FFF',
              dueDateClass: element.date_echeance.value,
              id: element.idaction.value.toString(),
              calendarId:
                this.getCalendarIdWithColor(element.color.value) || "0",
            };
          });
          return Promise.all([
            ...result,
            this.getCalendarItem(++nbPage, onDueDate),
          ]);
        } else {
          return [];
        }
      });
    },
    async getIteractionsHistory(nbPage = 0) {
      return axios({
        method: "get",
        url:
          this.URI_HISTORY +
          this.API_KEY +
          "/" +
          this.getQueryParam() +
          "/" +
          nbPage,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.data.data.length > 0) {
          
          let result = response.data.data.map((element) => {
            return {
              start: element.date_action.value,
              end: element.date_fin.value,
              isReadOnly: element.e_lock.value === "1",
              location: element.location.value,
              idaction: element.idaction.value,
              //   state: element.etat.value === 0 ? "Busy" : "Free",
              title: element.sujet.value,
              bgColor: "#8cbf40", // this.setColor(this.typeview, element),
              category: "time",
              color: '#FFF',
              dueDateClass: element.date_echeance.value,
              id: element.idaction.value.toString(),
              calendarId:
                this.getCalendarIdWithColor(element.color.value) || "0",
            };
          });
          return Promise.all([...result, this.getIteractionsHistory(++nbPage)]);
        } else {
          return [];
        }
      });
    },
    currentCalendarDate(format) {
      var currentDate = moment([
        this.$refs.tuiCalendar.invoke("getDate").getFullYear(),
        this.$refs.tuiCalendar.invoke("getDate").getMonth(),
        this.$refs.tuiCalendar.invoke("getDate").getDate(),
      ]);

      // first letter uppercase
      return (
        currentDate.locale(this.locale).format(format).charAt(0).toUpperCase() +
        currentDate.locale(this.locale).format(format).slice(1)
      );
    },
    getCalendarWithColor(color) {
      // get index
      let index = this.calendarList.findIndex(
        (element) => element.bgColor === color
      );
      // return calendar
      return this.calendarList[index]?.bgColor || "#FFF";
    },
    getCalendarIdWithColor(color) {
      // get index
      let index = this.calendarList.findIndex(
        (element) => element.bgColor === color
      );
      // return calendar
      return this.calendarList[index]?.id;
    },
    getToday() {
      this.$refs.tuiCalendar.invoke("today");
      this.setRenderRangeText();
      this.dispatchAction();
    },
    next() {
      this.$refs.tuiCalendar.invoke("next");
      this.setRenderRangeText();
      this.dispatchAction();
    },
    prev() {
      this.$refs.tuiCalendar.invoke("prev");
      this.setRenderRangeText();
      this.dispatchAction();
    },
    today() {
      this.$refs.tuiCalendar.invoke("today");
      this.setRenderRangeText();
      this.dispatchAction();
    },
    changeView(viewName) {
      this.$refs.tuiCalendar.invoke("changeView", viewName);
    },
    onClickSchedule(res) {
      this.selected = res;

      // set more card to display none
      let card = document.getElementsByClassName(
        "tui-full-calendar-month-more"
      );
      card[0].style.display = "none";
    },
    onClickDayname(res) {
      // view : week, day
      console.group("onClickDayname");
      console.log(res.date);
      console.groupEnd();
    },

    onBeforeCreateSchedule(e) {
      this.event = e;
      const eventDate = e.start.toDate();
      this.dateCreateEvent =
        eventDate.toLocaleDateString("fr-CA") +
        "_" +
        (eventDate.getHours() < 10 ? "0" : "") +
        eventDate.getHours() +
        "-" +
        (eventDate.getMinutes() < 10 ? "0" : "") +
        eventDate.getMinutes();
      e.guide.clearGuideElement();
      this.clickCount = this.clickCount === 0 ? 1 : 0;
      this.creating = this.clickCount === 0;

      setTimeout(() => {
        this.openIframeEditor();
      }, 50);
    },
    onBeforeUpdateSchedule(e) {
      var em = this;

      let schedule = this.CscheduleList.find(
        (element) => element.id === e.schedule.id
      );

      e.schedule.start = e.start;
      e.schedule.end = e.end;
      schedule.calendarId = e.changes.calendarId || e.schedule.calendarId;
      schedule.title = e.changes.title || e.schedule.title;
      schedule.category = e.changes.isAllDay
        ? "allday"
        : "time" || e.changes.category;

      schedule.start = e.start;
      schedule.end = e.end;
      schedule.isReadOnly = e.changes.isPrivate || e.changes.isReadOnly;
      schedule.location = e.changes.location || e.schedule.location;
      schedule.bgColor =
        this.calendarList[
          e.changes.calendarId || e.schedule.calendarId
        ].bgColor;

      var t = new Date(e.schedule.start).toISOString();
      t = String(t).replace("T", " ");
      t = String(t).replace(".000Z", "");

      const time_difference = e.end.getTime() - e.start.getTime();
      //calculate days difference by dividing total milliseconds in a day
      const hours = Math.floor(time_difference / (1000 * 60 * 60));
      const remaining_milliseconds = time_difference % (1000 * 60 * 60);
      const minutes = Math.floor(remaining_milliseconds / (1000 * 60));

      var config = {
        method: "put",
        url: this.URI_ACTION + this.API_KEY,

        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          idaction: schedule.idaction,
          sujet: schedule.title,
          all_day: schedule.category == "allday" ? 1 : 0,
          date_action: t,
          duree_heures: hours,
          duree_minutes: minutes,
          location: schedule.location,
          //    etat: schedule.state == "Busy" ? 1 : 0,
          color: "#FFFF",
          e_lock: schedule.isReadOnly ? 1 : 0,
        }),
      };

      axios(config)
        .then(() => {


          this.dispatchAction();
          em.$refs.tuiCalendar.invoke(
            "updateSchedule",
            schedule.id,
            schedule
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },

    onBeforeDeleteSchedule(e) {
      this.selected = null;

      var idaction = this.CscheduleList.find((element) => {
        return element.id === e.schedule.id;
      })?.idaction;
      var config = {
        method: "delete",
        url: this.URI_ACTION + this.API_KEY + "/" + idaction,
        headers: {},
      };

      axios(config).then(() => {
        // remove in scheduleList
        this.CscheduleList = this.CscheduleList.filter(
          (element) => element.id !== e.schedule.id
        );
        this.$refs.tuiCalendar.invoke(
          "deleteSchedule",
          e.schedule.id,
          e.schedule.calendarId
        );
      });
    },
    //Suppression des taches
    onClickTimezonesCollapseBtn(timezonesCollapsed) {
      // view : week, day
      if (timezonesCollapsed) {
        this.theme["week.timegridLeft.width"] = "100px";
        this.theme["week.daygridLeft.width"] = "100px";
      } else {
        this.theme["week.timegridLeft.width"] = "50px";
        this.theme["week.daygridLeft.width"] = "50px";
      }
    },
    getCalendar(calendarId) {
      return this.calendarList.find((calendar) => calendar.id === calendarId);
    },
    openIframeEditor() {
      // create div card by getelementbyid
      let card = document.getElementById("floating-layer-container");

      // set 2/3 width of screen to card only on desktop
      if (card != null) {
        if (window.innerWidth > 768) {
          card.style.width = "calc(100% - 250px)";
          card.style.height = "calc(100% - 250px)";
          card.style.left = "calc(50% - (calc(100% - 250px) / 2))";
          card.style.top = "calc(50% - (calc(100% - 250px) / 2))";
        } else {
          card.style.width = "calc(100% - 150px)";
          card.style.left = "calc(50% - (calc(100% - 150px) / 2))";
          card.style.top = "calc(50% - (calc(100% - 800px) / 2))";
          card.style.height = "calc(100% - 150px)";
        }
      }
    },
    checkingFrame() {
      this.iframeInteract++;
      if (this.iframeInteract > 1) {
        this.editing = false;
        this.creating = false;
        this.iframeInteract = 0;
        this.dispatchAction();
      }
    },
    edit() {
      this.editing = true;
      this.openIframeEditor();
    },
    newDateOnCreate() {
      // format date YYYY-MM-DD_HH:mm
      return moment(new Date(this.event.start)).format("YYYY-MM-DD_HH:mm");
    },

    iframeLoaded() {
      // get iframe document
      let iframe = document.getElementById("tui-full-calendar-popup-iframe");

      // check url
      if (
        iframe &&
        iframe.contentWindow.location.href.includes("/action.php")
      ) {
        this.editing = false;
        this.creating = false;
        this.selected = null;
      }
    },
  },
  watch: {
    view(value) {
      this.changeView(value);
      this.setRenderRangeText();
    },
    selected(content) {
      setTimeout(() => {
        this.editing = false;
        let event = null;
        if (content && content.event) {
          event = content.event;
          // get position from event
          const position = {
            top: event.pageY - event.target.offsetTop,
            left: event.pageX - event.target.offsetLeft,
          };

          // get div card by getelementbyid
          let card = document.getElementById("floating-layer-container");

          // set position from event mouse to card
          if (card) {
            card.style.top = `calc(${position.top}px - 80px)`;
            card.style.left = `calc(${position.left}px + 25px)`;
          }
        }
      }, 100);
    },
  },
  async mounted() {
    this.getTemplate();
    await this.loadUsers(); // loading users list*
    this.setRenderRangeText();
    this.dispatchAction(); // Load and set calendat item;

    // click outslide to close card
    document.addEventListener("click", (e) => {
      // if click outslide
      if (
        (document.getElementById("calendar").contains(e.target) === false &&
          !this.editing) ||
        (e.target.className !== "tui-full-calendar-weekday-schedule" &&
          e.target.className !== "tui-full-calendar-weekday-schedule-title" &&
          e.target.className.includes("tui-full-calendar-weekday-grid-line") &&
          e.target.className ===
            "tui-full-calendar-weekday-schedule-content") ||
        e.target.className.includes(
          "tui-full-calendar-time-date-schedule-block-wrap"
        ) ||
        ((e.target.className.includes("tui-full-calendar-weekday-schedule") ||
          e.target.className.includes(
            "tui-full-calendar-weekday-schedule-content"
          ) ||
          e.target.className.includes("tui-full-calendar-weekday-grid-line") ||
          e.target.className.includes(
            "tui-full-calendar-time-date-schedule-block-wrap"
          )) &&
          this.editing) ||
        ((e.target.className.includes("tui-full-calendar-weekday-grid-line") ||
          e.target.className.includes(
            "tui-full-calendar-time-date-schedule-block-wrap"
          )) &&
          this.editing &&
          this.creating)
      ) {
        this.editing = false;
        this.creating = false;
        this.selected = null;
      } else if (
        this.selected !== null &&
        e.target.className !== "tui-full-calendar-weekday-schedule-title" &&
        e.target.className !==
          "tui-full-calendar-time-schedule-content tui-full-calendar-time-schedule-content-time" &&
        !this.editing
      ) {
        this.selected = null;
      } else if (
        e.target.className === "tui-full-calendar-weekday-schedule-title" ||
        e.target.className ===
          "tui-full-calendar-time-schedule-content tui-full-calendar-time-schedule-content-time"
      ) {
        this.creating = false;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables.scss";
</style>
