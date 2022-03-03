<template>
  <section class="main_kanban_daypilot">
    <b-loading
      :is-full-page="isFullPage"
      v-model="isLoading"
      :can-cancel="true">
    </b-loading>
    <div class="column is-12">
      <div class="columns multiline px-6 py-2">
        <div class="column is-12-touch ">
          <div class="columns is-vcentered is-justify-content-flex-start is-left has-text-left is-desktop">
            <div class="column is-narrow">
              <div class="field is-horizontal">
                <label class="label is-flex-tablet-only is-justify-content-space-between pt-2">
                  Rubrique <span class="is-hidden-desktop">&nbsp;</span> : &nbsp;
                </label>
                <div class="control is-flex-grow-2">
                  <div class="dropdown is-block is-fullwidth" v-bind:class="showingItems">
                    <div class="dropdown-trigger">
                      <button class="button is-fullwidth is-justify-content-space-between" aria-haspopup="true" 
                              aria-controls="dropdown-menu" @click="show('items',showingItems)">
                        <span class="icon-text">
                          <span>{{itemSelected.rubrique}}</span>
                        </span>
                        <span class="icon is-small">
                          <span class="fas fa-angle-down" aria-hidden="true"></span>
                        </span>
                      </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                      <div class="dropdown-content">
                        <a class="dropdown-item" v-for="(item, i) in itemsList" :key="i" :value="item.rubrique" 
                            @click="getItemColumns(item)">
                          <span class="icon-text">
                            <span>{{ item.rubrique }}</span>
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
                <label class="label is-flex-tablet-only is-justify-content-space-between pt-2">
                  Affichage <span class="is-hidden-desktop">&nbsp;</span> : &nbsp;
                </label>
                <div class="control is-flex-grow-2">
                  <div class="dropdown is-block is-fullwidth" v-bind:class="showing">
                    <div class="dropdown-trigger">
                      <button class="button is-fullwidth is-justify-content-space-between" aria-haspopup="true" 
                              aria-controls="dropdown-menu" @click="show('users',showing)">
                        <span class="icon-text">
                          <span class="icon">
                            <span class="fas fa-circle" v-bind:style="{ color: typeview.color }"></span>
                          </span>
                          <span>{{typeview.title}}</span>
                        </span>
                        <span class="icon is-small">
                          <span class="fas fa-angle-down" aria-hidden="true"></span>
                        </span>
                      </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                      <div class="dropdown-content">
                        <a class="dropdown-item" v-for="(item, i) in arrayFilter" :key="i" :value="item.title" 
                            @click="setView(item)">
                          <span class="icon-text is-flex is-flex-wrap-nowrap">
                            <span class="icon" v-bind:style="{ color: item.color }">
                              <span class="fas fa-circle"></span>
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
                <label class="label is-flex-tablet-only is-justify-content-space-between pt-2">
                  Utilisateur <span class="is-hidden-desktop">&nbsp;</span> : &nbsp;
                </label>
                <div class="control is-flex-grow-2">
                  <div class="select is-block">
                    <Multiselect
                    v-model="user" :options="allUsers" :multiple="true"
                    :close-on-select="false" :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="Selectionnez" label="name" 
                    track-by="name" :preselect-first="true"
                    @close="onFilter">
                    <template
                      slot="selection"
                      slot-scope="{ values, isOpen }">
                      <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">
                        {{ values.length }} selections
                      </span>
                    </template>
                  </Multiselect>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <DayPilotKanban id="dp" :config="config" ref="kanban" />
  </section>
</template>
  
<script>
  import { DayPilotKanban, DayPilot } from "daypilot-pro-vue";
  import Vue from "vue";
  import Multiselect from "vue-multiselect";
  // import "vue-multiselect/dist/vue-multiselect.min.css";
  import axios from "axios";
  
  export default {
    name: "SchedulerKanban",
    props: {
      API_KEY: {
        type: String,
        default() {
          return "";
        },
      },
      ID_USER: {
        type: String,
        default() {
          return 1;
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
      URI_ITEMS: {
        type: String,
        default() {
          return "https://0002-zebridge-dev-externe.api.crm-simple.com/actionrubriques/";
        },
      },
      URI_ACTIONTYPES: {
        type: String,
        default() {
          return "https://0002-zebridge-dev-externe.api.crm-simple.com/actiontypes/";
        },
      },
      idUtilisateurs: {
        type: Array,
        default() {
          return ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        },
      },
    },
    data: function () {
      return {
        isFullPage: false,
        isLoading: true,
        itemSelected : {},
        user : [],
        lock : "alllock",
        type : "alltype",
        priority : "allpriority",
        steps: [],
        allUsers: [],
        tasks: [],
        showing: "",
        showingItems: "",
        typeview:{
          title : "Selectionnez", 
          color: "#2251ff",
          index: "color_defaut",
        },
        itemsList : [],
        columnList : [],
        arrayFilter : [
            {
              color: "#2251ff",
              title: "Défaut",
              index: "color_defaut",
            },
            {
              color: "#F54D40",
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
        ],
        config: {
          columnWidthSpec: "Auto",
          swimlaneMoveHandling: "Disabled",
          eventHoverHandling: "Bubble",
          // onSwimlaneMoved: (args) => {
          //   args.control.message("Swimlane moved: " + args.swimlane.data.name);
          // },
          cardDeleteHandling: "Disabled",
          cardMoveHandling: "Enabled",
          onCardMoved: (args) => {
            console.log("args", args);
            this.updateCalendar(args.card.data, args.card.control.cards)
            // args.control.message("Card moved: " + args.card.data.name);
          },
          onBeforeCellRender : (args) => {
            if(args.cell.swimlane.data.id === this.ID_USER){
              args.cell.areas =[ {
                right: 5,
                bottom: 5,
                width: 100,
                height: 30,
                html: "Ajouter",
                cssClass: "add-button",
                action: "JavaScript", js: async(args)=> {
                  console.log("ON BUTTON ", args);
                  this.createNewTasks(args,"add-button");
                }
              }]
            }
          },
          cardRightClickHandling: "Disabled",
          onCardClick: async (args) => {
            console.log("CARDS : ", args);
            if((args.card.data.lock!=="1") && (args.card.data.swimlane===this.ID_USER)){
              const modal = await DayPilot.Modal.prompt(
                "Modifier le titre de la tâche: ",args.card.data.text
              );
              let name=modal.result;
              if (!name) {return;}
              args.card.data.text = modal.result;
              this.updateCalendar(args.card.data, args.card.control.cards)
            }
          },
          // contextMenuCard: new DayPilot.Menu({
          //   items: [
          //     {
          //       text: "Verrouiller la tâche",
          //       icon: "fas fa-lock",
          //       onClick: (args) => {
          //         let e = args.source;
          //         e.data.lock = "1";
          //         e.data.areas[0].icon = "fas fa-lock";
          //         console.log("LOCKED : ", e.data);
          //         this.updateCalendar(e.data,e.control.cards);
          //       },
          //     },
          //     {
          //       text: "Supprimer",
          //       icon: "fas fa-trash",
          //       onClick: (args) => {
          //         const dp = args.source.control;
          //         let idaction = args.source.data.idaction;
          //         let config = {
          //           method: "delete",
          //           url: this.URI_ACTION + this.API_KEY + "/" + idaction,
          //           headers: {},
          //         };
          //         axios(config)
          //           .then(function () {
          //             dp.cards.remove(args.source);
          //           })
          //           .catch(function (error) {
          //             console.log("Error ON DELETE : ", error);
          //           });
          //       },
          //     },
          //     {
          //       text: "Private",
          //       icon: "icon icon-private",
          //       color: "#9e5fff",
          //       onClick: (args) => {
          //         let e = args.source;
          //         e.data.barColor = "#9e5fff";
          //         this.updateCalendar(e.data,e.control.cards);
          //       },
          //     },
          //     {
          //       text: "Company",
          //       icon: "icon icon-company",
          //       color: "#00a9ff",
          //       onClick:  (args) => {
          //         let e = args.source;
          //         e.data.barColor = "#00a9ff";
          //         this.updateCalendar(e.data,e.control.cards);
          //       },
          //     },
          //     {
          //       text: "DéVerrouiller la tâche",
          //       icon: "fas fa-lock-open",
          //       onClick: (args) => {
          //         let e = args.source;
          //         e.data.lock = "0";
          //         e.data.areas[0].icon = "fas fa-chevron-down";
          //         console.log("LOCKED : ", e.data);
          //         this.updateCalendar(e.data,e.control.cards);
          //       },
          //     },
          //   ],
          //   onShow: function (args) {
          //     if (parseInt(args.source.data.lock) === 1) {
          //       args.menu.items[0].hidden = true;
          //       args.menu.items[4].hidden = false;
          //       args.menu.items.forEach(element => {
          //         element.disabled = true;
          //       });
          //       args.menu.items[4].disabled = false;
          //     } 
          //     else {
          //       args.menu.items[0].hidden = false;
          //       args.menu.items.forEach(element => {
          //         element.disabled = false;
          //       });
          //       args.menu.items[4].hidden = true;
          //     }
          //   },
          // }),
        },
      };
    },
    components: {
      DayPilotKanban,
      Multiselect
    },
    computed: {
      // DayPilot.Kanban object - https://api.daypilot.org/daypilot-kanban-class/
      kanban: function () {
        return this.$refs.kanban.control;
      },
    },
    methods: {
      async getAllUsers(nombre_page=0) {
        let vm = this;
        return axios({
          method: "get",
          url: "https://0002-zebridge-dev-externe.api.crm-simple.com/utilisateurs/"+ this.API_KEY,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            let allUsers = response.data.data;
            console.log("USERS : ", response);
            // console.log("ID USER: ", vm.ID_USER);
            allUsers.forEach(element => {
              vm.allUsers.push({
                name: element.nom_utilisateur.value,
                id: element.idutilisateur.value,
              });
            });
            vm.user = vm.allUsers.filter((x) => x.id in vm.idUtilisateurs );
            nombre_page++;
            if (nombre_page >= response.data.nbpage) {
              this.getAllUsers(nombre_page);
            }
          })
          .catch(function (error) {
            console.log("Error ON GET ALL USERS: ", error);
            return [];
          });
      },
      compare( a, b ) {
        if ( a.rubrique < b.rubrique ){
          return -1;
        }
        if ( a.rubrique > b.rubrique ){
          return 1;
        }
        return 0;
      },
      async getItemsList(nombre_page=0) {
        return axios({
          method: "get",
          url: this.URI_ITEMS+ this.API_KEY,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            let items = response.data.data;
            items.forEach(element => {
              this.itemsList.push({
                id : element.idrubrique, 
                rubrique : element.rubrique, 
              });
            });
            nombre_page++;
            if(nombre_page < response.data.nbpage){
              this.getItemsList(nombre_page);
            }
            else{
              this.itemsList.sort( this.compare );
              this.getItemColumns(this.itemsList[0]);
            }
          })
          .catch(function (error) {
            console.log("Error ON GET ALL ITEMS: ", error);
            return [];
          });
      },
      async getItemColumns(item,nombre_page=0) {
        this.isLoading=true;
        this.itemSelected = item;
        this.columnList=[];
        let id = item.id
        console.log("Id :", id);
        return axios({
          method: "get",
          url: this.URI_ACTIONTYPES+this.API_KEY+"/condition:idrubrique:egal:"+id,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            let data = response.data.data;
            console.log("RESPONSE COLUMN A : ", response)
            // let newColumns = [];
            data.forEach(element => {
              this.columnList.push({
                id : element.idaction_type, 
                name : element.action_type, 
              });
            });
            nombre_page++;
            console.log("COLUMN LIST", this.columnList);
            nombre_page >= response.data.nbpage ? this.showingItems="": this.getItemColumns(item,nombre_page);
            this.isLoading=false;
            this.columnList=this.addCreateButton(this.columnList);
            this.kanban.columns.list = this.columnList;
            Vue.set(this.config, "columns", this.columnList);
            this.loadSwimlane();
            this.loadCards();
          })
          .catch(function (error) {
            console.log("Error ON GET ALL ACTIONS TYPE: ", error);
            return [];
          });
      },
      async getKanbanItem(url=this.URI + this.API_KEY, nombre_page=0) {
        let vm = this;
        vm.tasks= nombre_page===0 ? [] : vm.tasks;
        console.log("nombre_page ", nombre_page);
        return axios({
          method: "get",
          url: url+"/"+nombre_page,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            let tasks = response.data.data;
            console.log("TASK 1.0 ", response);
            let index = vm.tasks.length+1;
            let groupBy = function (xs) {
              return xs.reduce(function (rv, x) {
                (rv[x.idutilisateur.value] =
                  rv[x.idutilisateur.value] || []).push(x);
                return rv;
              }, {});
            };
            let taskByID = groupBy(tasks);
            let newEvents = [];
            for (const [key] of Object.entries(taskByID)) {
              newEvents.push({
                id: `${key}`,
                tasks: taskByID[`${key}`],
              });
            }
            newEvents.forEach((element) => {
              element.tasks.forEach((task) => {
                vm.tasks.push({
                  idaction: task.idaction.value,
                  id: index,
                  name: "",
                  text: task.sujet.value,
                  swimlane: element.id,
                  start: task.date_action.value,
                  end: task.date_fin.value,
                  column: task.idtype_action.value,
                  lock: task.e_lock.value,
                  barColor:vm.setColor(vm.typeview, task),
                  priority :task.priorite.value,
                  areas: [
                    {
                      right: 0,
                      top: 6,
                      width: 20,
                      height: 20,
                      icon: "fas fa-info-circle",
                      style: "text-align:center; color:#2251ff",
                      action :"Bubble",
                      bubble: new DayPilot.Bubble({
                        onLoad: (args) => {
                          let idaction = args.source.data.card.idaction;
                          let start = "";
                          let end = "";
                          start = args.source.data.card.start;
                          start = start.split(" ");
                          let new_date = start[0].split("-");
                          start[0] = new_date[2] + "-" + new_date[1] + "-" + new_date[0];
                          var new_end = start[1].split(":");
                          start[1] = new_end[0] + ":" + new_end[1];
                          end = args.source.data.card.end;
                          end = end.split(" ");
                          new_date = end[0].split("-");
                          end[0] = new_date[2] + "-" + new_date[1] + "-" + new_date[0];
                          new_end = end[1].split(":");
                          end[1] = new_end[0] + ":" + new_end[1];
                          // if event object doesn't specify "bubbleHtml" property
                          // this onLoad handler will be called to provide the bubble HTML
                          args.html =
                            "<span style='font-weight: 900'>" +args.source.data.card.text +"</span></br>" +
                            "Début: " +start[0] +" à " +start[1] +"</br>" +
                            "Fin: " +end[0] +" à " + end[1] +"</br>" +
                            "<a href='https://0002-zebridge-dev-externe.crm-simple.com/action_edit.php?idaction=" +
                            idaction +"'target='_blank'rel='noopener' >Voir plus</a>";
                        },
                      }),
                    },
                  ],
                });
                //CHANGE ICON FOr  LOCKED EVENTS
                // if (parseInt(vm.tasks[index-1].lock) === 1) {
                //   vm.tasks[index-1].areas[0].icon ="fas fa-lock";
                // }
                index++;
              });
            });
            console.log("TASKS 2.0 : ", vm.tasks);
            nombre_page++;
            if(nombre_page < response.data.nbpage){
              vm.getKanbanItem(vm.URI + vm.API_KEY,nombre_page);
            }
          })
          .catch(function (error) {
            console.log("Error ON GET: ", error);
            return [];
          });
      },
      loadCards() {
        Vue.set(this.config, "cards", this.tasks);
      },
      loadColumns() {
        this.columnList = this.addCreateButton(this.columnList);
        Vue.set(this.config, "columns", this.columnList);
      },
      async createNewTasks(args, type){
        console.log("RUN THROUGH", type);
        console.log("args COLUMN :", args);
        const modal = await DayPilot.Modal.prompt("Créer une nouvelle tâche: ",);
        let name=modal.result;
        if (!name) {return;}
        const addZero = (i) => i < 10 ? "0" + i :  i;
        let currentdate = new Date();
        let day = currentdate.getFullYear() + "-"  + addZero((currentdate.getMonth()+1))  + "-"
                  + addZero(currentdate.getDate());
        let tab = day +" "  + "00:00:00";
        let start = new Date(tab);
        let end = new Date(day +" "  + "23:59:59");
        const time_difference = end.getTime() - start.getTime();
        //calculate days difference by dividing total milliseconds in a day
        const hours = Math.floor(time_difference / (1000 * 60 * 60));
        const remaining_milliseconds = time_difference % (1000 * 60 * 60);
        const minutes = Math.floor(remaining_milliseconds / (1000 * 60));

        let data = JSON.stringify({
          sujet: name,
          date_action: tab,
          color: "#9e5fff",
          duree_heures: hours,
          duree_minutes: minutes,
          idutilisateur: this.ID_USER,
          idtype_action :type === "column" ? args.data.id : args.column.data.id,
          e_lock: this.lock === "alllock" ? "0" : this.lock,
          priorite : this.priority === "allpriority" ? "0" : this.priority,
        });
        let config = {
          method: "post",
          url: this.URI_ACTION + this.API_KEY,
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };
        return axios(config)
          .then((result) => {
            console.log("DONT WORRY IM FINE", result);
            this.onFilter();
          })
          .catch(function (error) {
            console.log("Error ON POST: ", error);
          });
      },
      addCreateButton(data) {
        data.forEach(element => {
          element.areas= [ 
              { right: 0, top: 0, bottom: 0, width: 18, html : "+", cssClass: "add-button", 
                action: "JavaScript", js: async(args) =>{ 
                  this.createNewTasks(args,"column");
                }
              } 
            ]
        });
        return data;
      },
      loadSwimlane() {
        Vue.set(this.config, "swimlanes", this.allUsers);
      },
      show(element,value) {
        const newValue = value.length === 0 ? "is-active" : "";
        if(element === "users"){
          (this.showing = newValue)
        }
        else{
          (this.showingItems = newValue);
        }
      },
      setView(item){
        this.typeview = item;
        this.show("users",this.showing);
        this.isLoading = true;
        this.onFilter();
      },
       setColor(type, data) {
        let  color = type.color;
        try {
          const jsondata = data.color.value;
          color = JSON.parse(jsondata)[type.index];
        } catch (error) {
          console.log("undefined color data");
        }
        return color;
      },
      getQueryParam() {
        let filter = "";
        // filtering users
        if (this.user.length > 0) {
          filter = filter.concat(
            filter.length === 0 ? "condition:" : ":separator:AND:condition:",
            this.setfilter(
              this.user.map((e) => {
                return e.id;
              }),
              "idutilisateur"
            )
          );
        }
        console.log("UTILISATEUR / ", this.filter);
        // e_lock
        if (this.lock !== "alllock") {
          filter = filter.concat(
            filter.length === 0 ? "condition:" : ":separator:AND:condition:",
            this.setfilter(this.lock, "e_lock")
          );
        }
        console.log("LOCK / ", this.filter);
        // priorite
        if (this.priority !== "allpriority") {
          filter = filter.concat(
            filter.length === 0 ? "condition:" : ":separator:AND:condition:",
            this.setfilter(this.priority, "priorite")
          );
        }
        console.log("PRIO / ", this.filter);

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
      async onFilter(){
        let url = this.URI+ this.API_KEY;
        url+="/"+this.getQueryParam();
        console.log("FILTER URL IS : ",url);
        this.isLoading=true;
        this.getKanbanItem(url).then(()=>{
          Vue.set(this.config, "swimlanes", this.allUsers.filter((x) => this.user.includes(x) ));
          this.loadColumns();
          this.loadCards();
          this.isLoading=false;
        });
      },
      async updateCalendar(events,allEvents) {
        let data = JSON.stringify({
          idaction: events.idaction,
          sujet: events.text,
          e_lock: events.lock,
          idtype_action :events.column,
          idutilisateur: events.swimlane,
          color: events.barColor === "" ? "#9e5fff" : events.barColor,
        });
        let vm= this;
        let config = {
          method: "put",
          url: this.URI_ACTION + this.API_KEY,
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };
        return axios(config)
          .then(function () {
            console.log("AllEvents : ", allEvents);
            console.log("events : ", events);
            allEvents.update(events);
            vm.onFilter();
          })
          .catch(function (error) {
            console.log("UPDATE API DATAS ERROR : ",error);
          });
      },
    },
    mounted: function () {
      this.getAllUsers().then(() =>{
        this.getKanbanItem().then(() => {
          this.loadSwimlane();
          this.loadColumns();
          this.loadCards();
          this.getItemsList();
          this.isLoading = false;
          this.kanban.cellMarginBottom=40;
        });
      });
    },
  };
</script>
<style>
  .main_kanban_daypilot {
    margin-bottom: 20px;
  }
  .add-button {
      cursor: pointer;
      border: 1px solid #ccc;
      background-color: #eee;
      color: #666;
      text-align: center;
      line-height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .add-button:hover {
      background-color: #ddd;
  }
</style>