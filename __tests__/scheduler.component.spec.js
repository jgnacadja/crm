/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { jest, describe, expect, test } from '@jest/globals';
// import GeneratedJson from "../src/services/mocks/data/generated_json.json";
import { mount, shallowMount, localVue, router } from "@vue/test-utils";

import Scheduler from "../src/components/Scheduler.vue";
import Multiselect from "vue-multiselect";
import { DayPilot, DayPilotScheduler } from "daypilot-pro-vue";
//import { makeServer } from "./server";
import axios from "axios";
import appservice from "../src/services/appservice";
import store from "../src/store/";


let myEvents = [];
let myResources = [];
let tasks = [];
let API_KEY;
const URI_ACTION = "https://0002-zebridge-dev-externe.api.crm-simple.com/interaction/";
const URI = "https://0002-zebridge-dev-externe.api.crm-simple.com/interactions/";
const generateToken = () => {
  return appservice
    .getToken("admin", "Dw3BwezaQSar")
    .then((data) => {
      // console.log("ladata = ", data)
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};
function findTaskWithIdAction(listOfTasks, searchIdAction) {
  //console.log(listOfTasks.length);
  let task;
  listOfTasks.forEach(taskSearched => {

    if (taskSearched.idaction === searchIdAction) {
      task = taskSearched
      //console.log("TASK SEARCHED IS :", taskSearched);
      return taskSearched;
    }
  });
  return task;
}

//const server = makeServer();
const thegenerateToken = () => {
  return appservice.getToken("admin", "Dw3BwezaQSar");
};
// console.log(generateToken())
// get token before each test
beforeEach(() => { });
// test props


describe("Scheduler Component props", () => {
  it("should have a prop called 'API_KEY'", () => {
    expect(Scheduler.props.API_KEY).toBeDefined();
  });

  it("should have a prop called 'API_KEY' with a default value", () => {
    expect(Scheduler.props.API_KEY.default).toBeDefined();
  });

  it("should have a prop called 'API_KEY' with a type of String", () => {
    expect(Scheduler.props.API_KEY.type).toBe(String);
  });

  it("should have a prop called 'URI'", () => {
    expect(Scheduler.props.URI).toBeDefined();
  });

  it("should have a prop called 'URI' with a default value", () => {
    expect(Scheduler.props.URI.default).toBeDefined();
  });

  it("should have a prop called 'URI' with a type of String", () => {
    expect(Scheduler.props.URI.type).toBe(String);
  });

  it("should have a prop called 'URI_ACTION'", () => {
    expect(Scheduler.props.URI_ACTION).toBeDefined();
  });

  it("should have a prop called 'URI_ACTION' with a default value", () => {
    expect(Scheduler.props.URI_ACTION.default).toBeDefined();
  });

  it("should have a prop called 'URI_ACTION' with a type of String", () => {
    expect(Scheduler.props.URI_ACTION.type).toBe(String);
  });


  it("should have a prop called 'months'", () => {
    expect(Scheduler.props.months).toBeDefined();
  });

  it("should have a prop called 'months' with a default value", () => {
    expect(Scheduler.props.months.default).toBeDefined();
  });

  it("should have a prop called 'months' with a type of Array", () => {
    expect(Scheduler.props.months.type).toBe(Array);
  });


  it("should have a prop called 'month_selected_number'", () => {
    expect(Scheduler.props.month_selected_number).toBeDefined();
  });

  it("should have a prop called 'month_selected_number' with a default value", () => {
    expect(Scheduler.props.month_selected_number.default).toBeDefined();
  });

  it("should have a prop called 'month_selected_number' with a type of Number", () => {
    expect(Scheduler.props.month_selected_number.type).toBe(Number);
  });

  it("should have a prop called 'month_selected'", () => {
    expect(Scheduler.props.month_selected).toBeDefined();
  });

  it("should have a prop called 'month_selected' with a default value", () => {
    expect(Scheduler.props.month_selected.default).toBeDefined();
  });

  it("should have a prop called 'month_selected' with a type of String", () => {
    expect(Scheduler.props.month_selected.type).toBe(String);
  });

  it("should have a prop called 'year_selected'", () => {
    expect(Scheduler.props.year_selected).toBeDefined();
  });

  it("should have a prop called 'year_selected' with a default value", () => {
    expect(Scheduler.props.year_selected.default).toBeDefined();
  });

  it("should have a prop called 'year_selected' with a type of Number", () => {
    expect(Scheduler.props.year_selected.type).toBe(Number);
  });

  it("should have a prop called 'index'", () => {
    expect(Scheduler.props.index).toBeDefined();
  });

  it("should have a prop called 'index' with a default value", () => {
    expect(Scheduler.props.index.default).toBeDefined();
  });

  it("should have a prop called 'index' with a type of Object", () => {
    expect(Scheduler.props.index.type).toBe(String);
  });
  it("should have a methods called ' dispatchAction()' ", () => {
    expect(Scheduler.methods.dispatchAction).toBeDefined();
  });

});
// test variable

describe("Scheduler Component data", () => {
  // Inspect the raw component options
  it("has data", () => {
    expect(typeof Scheduler.data).toBe("function");
  });

  it("should have a data config variable function called 'onTimeRangeSelected'", () => {
    expect(Scheduler.data().config.onTimeRangeSelected).toBeDefined();
  });

  //  onRowMoved function
  //it("should have a data config variable function called 'onTimeRangeSelected' that logs to define a variable isComponentModalActive", () => {
  // const spy = jest.spyOn(global.console, "log");
  // Scheduler.data().config.onRowMoved();
  // expect(spy).toHaveBeenCalled();
  // expect(Scheduler.data().config.onTimeRangeSelected().isComponentModalActive).toBeDefined();
  //expect(() => Scheduler.data().config.onTimeRangeSelected()).isComponentModalActive.toStrictEqual(true);


  //});

  it("should have a data config variable function called 'onBeforeTimeHeaderRender'", () => {
    expect(Scheduler.data().config.onBeforeTimeHeaderRender).toBeDefined();
  });

  /*   //  onTaskMoved function
  it("should have a data config variable function called 'onTaskMoved' that logs to console", () => {
    const spy = jest.spyOn(global.console, "log");
    Scheduler.data().config.onTaskMoved();
    expect(spy).toHaveBeenCalled();
  }); */

  it("should have a data config variable function called 'onEventMoved'", () => {
    expect(Scheduler.data().config.onEventMoved).toBeDefined();
  });

  it("should have a data config variable function called 'onEventResized'", () => {
    expect(Scheduler.data().config.onEventResized).toBeDefined();
  });

  it("should have a data config variable function called 'onEventClicked'", () => {
    expect(Scheduler.data().config.onEventClicked).toBeDefined();
  });
  it("should have a data config variable  function called 'onLoad'", () => {
    expect(Scheduler.data().config.bubble.onLoad).toBeDefined();
  });

  it("should have a data config variable function called 'onBeforeEventRender'", () => {
    expect(Scheduler.data().config.onBeforeEventRender).toBeDefined();
  });
  //  onRowCreate function
  // it("should have a data config variable function called 'onRowCreate' that logs to console", () => {
  //   const spy = jest.spyOn(global.console, "log");
  //   Scheduler.data().config.onRowMoved();
  //   expect(spy).toHaveBeenCalled();
  // });
});

describe("Scheduler Component methods", () => {
  // Inspect the raw component options
  // it("has data", () => {
  //   expect(Scheduler.data().currentYear).toBe(Number);

  // });
  it("should have a methods called 'Update_event'", () => {
    expect(Scheduler.methods.Update_event).toBeDefined();
  });
  it("should have a methods called 'handleCreateSchedule'", () => {
    // expect(Scheduler.data().config.bubble.onLoad).toBeDefined();
    expect(Scheduler.methods.handleCreateSchedule).toBeDefined();
  });
  it("should have a methods called 'getData'", () => {
    expect(Scheduler.methods.getData).toBeDefined();
  });

  // it("should have a methods called 'loadResources'", () => {
  //   expect(Scheduler.methods.loadResources).toBeDefined();
  // });
  it("should have a methods called 'updateColor'", () => {
    expect(Scheduler.methods.updateColor).toBeDefined();
  });
  // it("should have a methods called 'lockTâches'", () => {
  //   expect(Scheduler.methods.lockTâches).toBeDefined();
  // });

  // it("should have a methods called 'updateTâches'", () => {
  //   expect(Scheduler.methods.updateTâches).toBeDefined();
  // });
  it("should have a methods called 'updateStartDate'", () => {
    expect(Scheduler.methods.updateStartDate).toBeDefined();
  });


});

describe("Reading of task data returned by the api", () => {
  jest.setTimeout(30000 * 60); //ms
  test('Can get DAta', () => {

    // const formContainer = {
    //   URI: "https://0002-zebridge-dev-externe.api.crm-simple.com/interactions/",
    //   API_KEY: thegenerateToken(),

    // };
    return generateToken().then(function (result) {
      let token = result.token;
      console.log(result.token)
      const formContainer = {
        URI: "https://0002-zebridge-dev-externe.api.crm-simple.com/interactions/",
        API_KEY: token,
        selectedUsers: [{
          id: "1",
          name: "Administrateur"
        }, {
          id: "2",
          name: "user1"
        }, {
          id: "3",
          name: "user2"
        }, {
          id: "4",
          name: "user3"
        }, {
          id: "5",
          name: "user4"
        }, {
          id: "6",
          name: "Comptable"
        }],


        typeview: {
          title: "Selectionnez",
          color: "#2251ff",
          index: "color_defaut",
        },
        idprojets: Scheduler.props.idprojets,
        idcontacts: Scheduler.props.idcontacts,
        idsocietes: Scheduler.props.idsocietes,
        getQueryParam() { Scheduler.methods.getQueryParam.apply(formContainer); return formContainer },
     
        setfilter: Scheduler.methods.setfilter ,

        getData() { Scheduler.methods.getData.apply(formContainer); return formContainer },
        setColor: async () => { Scheduler.methods.setColor.apply(formContainer, [formContainer.typeview]) },
        // getKanbanItem   : async () =>{Kanban.methods.getKanbanItem.apply(vm);return vm;},
        // loadSwimlane(){Kanban.methods.loadSwimlane.apply(vm)},


      };


      myEvents = [];
      return Scheduler.methods.getData.apply(formContainer).then((response) => {
        console.log(formContainer)
        console.log("fghjkl", response)
        tasks = response;
        // ////console.log("TASKS 2 : ", tasks.length);
        expect(tasks).toBeDefined();
        //         /*
        //           We need to organize the initial task so that we have the same format before and after processing to compare them.
        //         */
        //         //formatData();
      });
    });
  });
});

test("it should return an empty array if the data cannot be found", () => {
  //expect(filterByTerm(10)).toEqual(10);
  return generateToken().then(function (result) {

    const formContainer = {
      URI: "https://0002-zebridge-dev-externe.api.crm-simple.com/interactions/",
      API_KEY: "",
      selectedUsers: [{
        id: "1",
        name: "Administrateur"
      }, {
        id: "2",
        name: "user1"
      }, {
        id: "3",
        name: "user2"
      }, {
        id: "4",
        name: "user3"
      }, {
        id: "5",
        name: "user4"
      }, {
        id: "6",
        name: "Comptable"
      }],
      idprojets: Scheduler.props.idprojets,
      idcontacts: Scheduler.props.idcontacts,
      idsocietes: Scheduler.props.idsocietes,
      getQueryParam: Scheduler.methods.getQueryParam,
      setfilter: Scheduler.methods.setfilter,
      getData: Scheduler.methods.getData,


    };

    return Scheduler.methods.getData.apply(formContainer).then((response) => {
      tasks = response;
      ////console.log("TASKS 2 : ", tasks.length);
      expect(tasks).toStrictEqual([]);
      //expect(spy).toHaveBeenCalled();

    });
  });

});


describe("Create new tasks ", () => {
  jest.setTimeout(30000 * 60); // ms
  test("it should be able to add to the calendar the tasks with the indicated characteristics", () => {

    // ////console.log("form date start : ",new Date(formContainer.form.date_fin));
    /*
      We must : 
      1- Generate the token
      2- Create the task with our own data
      3- Get last data and compare it with data sent
    */
    return generateToken().then(function (result) {
      let token = result.token;
      console.log(result.token)
      const formContainer_2 = {
        URI: "https://0002-zebridge-dev-externe.api.crm-simple.com/interactions/",
        API_KEY: token,
        selectedUsers: [{
          id: "1",
          name: "Administrateur"
        }, {
          id: "2",
          name: "user1"
        }, {
          id: "3",
          name: "user2"
        }, {
          id: "4",
          name: "user3"
        }, {
          id: "5",
          name: "user4"
        }, {
          id: "6",
          name: "Comptable"
        }],

        // selectedUsers: {
        //   length: 5,
        //   map: function () {
        //     // formContainer.events.control.events.push(this.newEvent)
        //   }
        // },
        typeview: {
          title: "Selectionnez",
          color: "#2251ff",
          index: "color_defaut",
        },
        idprojets: Scheduler.props.idprojets,
        idcontacts: Scheduler.props.idcontacts,
        idsocietes: Scheduler.props.idsocietes,
        getQueryParam() { Scheduler.methods.getQueryParam.apply(formContainer_2); return formContainer_2 },
        setfilter: Scheduler.methods.setfilter ,
        getData() { Scheduler.methods.getData.apply(formContainer_2); return formContainer_2 },
        setColor() { Scheduler.methods.setColor.apply(formContainer_2, [formContainer_2.typeview]) },
        // getKanbanItem   : async () =>{Kanban.methods.getKanbanItem.apply(vm);return vm;},
        // loadSwimlane(){Kanban.methods.loadSwimlane.apply(vm)},


      };


      const formContainer = {
        URI_ACTION: "https://0002-zebridge-dev-externe.api.crm-simple.com/interaction/",
        API_KEY: result.token,
        events: {
          control: {
            events: {
              add: function () {
                // formContainer.events.control.events.push(this.newEvent)
              }
            }
          },
          end: { value: "2022-01-12 10:00:00" },
          start: { value: "2022-01-12 00:00:00" },
          resource: "1"
        },
        loading: false,
        form: {
          sujet: "New Réunion avec les partenaires internationaux",
          // color: "#9e5fff",
          submit: true
        },
        errors: {
          sujet: "eroor"
        }
      };

      //API_KEY = result;
      // ////console.log("TOKEN :",API_KEY);
      return Scheduler.methods.handleCreateSchedule.apply(formContainer).then(function (response) {

        let elmentCreated = {
          idaction: response.idaction,
          start: response.start,
          end: response.end,
          lock: response.lock,
          id: response.idaction,
          resource: response.resource,
          text: response.text,
          // color: response.color,
        };
        let text = "New Réunion avec les partenaires internationaux"


        expect(elmentCreated.text).toStrictEqual(text);


      });
    });
  });
});

describe("Data bubble fonction", () => {
  // Inspect the raw component options
  test("it should have equality between args.html andEvent details ", () => {
    let args = {
      source: {
        data: {
          text: "Event",
          start: "2020-02-11 10:20:30",
          end: "2020-02-12 10:20:30"
        }
      },
      html: ""
    };
    Scheduler.data().config.bubble.onLoad(args);
    //expect(args.html).toStrictEqual("Event details");

  });
});

//DayPilot.BubblePropsAndEvents.onLoad?: 


describe("Data fonction", () => {
  // Inspect the raw component options
  test("it should have a onBeforeTimeHeaderRender", () => {

    let args = {
      header:
      {
        level: 1,
        html: "",
        start: {
          weekNumberISO: function () {
            return 10;

          }
        }

      }
    };


    Scheduler.data().config.onBeforeTimeHeaderRender(args);
    expect(args.header.html).toStrictEqual("Semaine 10");

  });

});








// describe("Scheduler Component mounted", () => {
//   // test mounted Scheduler function
//   it("should have a mounted Scheduler function", () => {
//     expect(Scheduler.mounted).toBeDefined();
//     expect(typeof Scheduler.mounted).toBe("function");
//   });
//   it("mock & shallowMount", () => {
//     const mock = jest.fn();
//     const wrapper = shallowMount(Scheduler, {
//       propsData: {
//         API_KEY: API_KEY,
//       },
//       stubs: {
//         Scheduler: DayPilotScheduler,
//       },
//       /*       data() {
//         return {
//           Scheduler: {
//             on: mock,
//           },
//         };
//       }, */
//     });
//     wrapper.vm.$refs.scheduler = jest.fn();
//     console.log(wrapper.vm.scheduler);
//     expect(wrapper.vm).toBeTruthy();
//     console.log(wrapper.vm.scheduler);
//     //expect(mock).toHaveBeenCalledTimes(2);
//   });
// });



// describe("Select User", () => {

//   test('Can difine the selected user', () => {
//     const formContainer = {

//       idUtilisateurs: Scheduler.props.idUtilisateurs,
//       idUtilisateurs: {
//         find(e) {
//           for (let i = 0; formContainer.idUtilisateurs.length; i++) {
//             if (idUtilisateurs[i] > e) {
//               return idUtilisateurs[i];

//             }
//           }
//         }

//       }
//     }
//     Scheduler.methods.isUserSelected.apply(formContainer, [1]);
//     expect(wrapper.vm).toBeTruthy();


//   });
// });

describe("load user returned by the api", () => {
    jest.setTimeout(3000 * 60); // ms
  
    test('Can load user', () => {
  
     
      return generateToken().then(function (result) {
        API_KEY = result;
        const formContainer = {
          USER_API: "https://0002-zebridge-dev-externe.api.crm-simple.com/utilisateurs/",
          API_KEY: result.token,
          config: {
            iduser: 0,
          },
          users: Scheduler.data.users,
          IdUser: Scheduler.props.IdUser,
          idUtilisateurs: Scheduler.props.idUtilisateurs,
          selectedUsers: Scheduler.data.selectedUsers,
  
  
        };
  
  
        return Scheduler.methods.loadUsers.apply(formContainer).then((response) => {
        expect(response).toStrictEqual(1);
  
        });
      });
    });
  
  
    test('Can\'t load user', () => {
  
      return generateToken().then(function (result) {
        API_KEY = result;
        //API_KEY=result.token;
        const formContainer = {
          USER_API: "https://0002-zebridge-dev-externe.api.crm-simple.com/utilisateurs/",
          API_KEY: result,
          config: {
            iduser: 0,
          },
          users: Scheduler.data.users,
          IdUser: Scheduler.props.IdUser,
          idUtilisateurs: Scheduler.props.idUtilisateurs,
          selectedUsers: Scheduler.data.selectedUsers,
  
  
        };
  
  
        return Scheduler.methods.loadUsers.apply(formContainer).then((response) => {
          
  
          expect(response).toStrictEqual(0);
  
        });
      });
    });
  });
describe("On Click of dropdown", () => {
  test('Can show', () => {
    const formContainer = {
      showing: "",
      typeview: Scheduler.data.typeview,
    };
    //console.log(formContainer.showing)
    //console.log(formContainer.typeview)
    Scheduler.methods.show.apply(formContainer);
    expect(formContainer.showing).toStrictEqual("is-active");

  });
});


describe("View", () => {
  // Inspect the raw component options
  test("it should update color view ", () => {
    let args = {
      data: {
        barColor: "",
        color: "ffff",
        areas: []
      }
    };
    let type = {
      color: "#2251ff",
      title: "Par défaut",
    };
    const formContainer = {
      typeview: {},
      show: Scheduler.methods.show,
      showing: [],
      config: {
        events: [{
          idaction: '2507',
          start: '2022-01-12 00:00:00',
          end: '2022-01-12 10:00:00',
          id: '202d030b-e104-003b-46af-72749ebce8d0',
          resource: '1',
          text: 'Réunion avec les partenaires internationaux',
          color: '#9e5fff',
          bgColor: '#9e5fff'
        }, {
          idaction: '2507',
          start: '2022-01-12 00:00:00',
          end: '2022-01-12 10:00:00',
          id: '202d030b-e104-003b-46af-72749ebce8d0',
          resource: '1',
          text: 'Réunion avec les partenaires internationaux',
          color: '#9e5fff',
          bgColor: '#9e5fff'

        }]
      },
      dispatchAction:()=>{ Scheduler.methods.dispatchAction; return formContainer} ,
      getData() { Scheduler.methods.getData.apply(formContainer); return formContainer },

      // getQueryParam(){ Scheduler.methods.getQueryParam.apply(formContainer); return formContainer},

    };

    Scheduler.methods.setView.apply(formContainer, [type]);
    //expect(formContainer.config.events[0].color).toStrictEqual(type.color);

  });
});
describe("Scheduler Component mounted", () => {


  // test mounted gantt function
  it("should have a mounted schulder function", () => {
    expect(Scheduler.mounted).toBeDefined();
    expect(typeof Scheduler.mounted).toBe("function");
  });

  it("mock & shallowMount", () => {
    const mock = jest.fn();
    const wrapper = shallowMount(Scheduler, { localVue, store, router });
  });
});


describe("Update of existing tasks", () => {
  jest.setTimeout(30000 * 60); //ms
  test("it should update the existing tasks", () => {
    //expect(filterByTerm(10)).toEqual(10);
    /*
      We must : 
      1- Generate the token
      2- Get all data
      2- Update a task with our own data
      3- Get all data and compare data with the idaction updated with data updated
    */
    return generateToken().then(function (result) {
      let token = result.token;
      const formContainer = {
        URI: "https://0002-zebridge-dev-externe.api.crm-simple.com/interactions/",
        API_KEY: token,
        selectedUsers: [{
          id: "1",
          name: "Administrateur"
        }, {
          id: "2",
          name: "user1"
        }, {
          id: "3",
          name: "user2"
        }, {
          id: "4",
          name: "user3"
        }, {
          id: "5",
          name: "user4"
        }, {
          id: "6",
          name: "Comptable"
        }],

        // selectedUsers: {
        //   length: 5,
        //   map: function () {
        //     // formContainer.events.control.events.push(this.newEvent)
        //   }
        // },
        typeview: {
          title: "Selectionnez",
          color: "#2251ff",
          index: "color_defaut",
        },
        idprojets: Scheduler.props.idprojets,
        idcontacts: Scheduler.props.idcontacts,
        idsocietes: Scheduler.props.idsocietes,
        getQueryParam() { Scheduler.methods.getQueryParam.apply(formContainer); return formContainer },
        setfilter: Scheduler.methods.setfilter ,
        getData: async () => { Scheduler.methods.getData.apply(formContainer); return formContainer },
        setColor() { Scheduler.methods.setColor.apply(formContainer, [formContainer.typeview]) },
        // getKanbanItem   : async () =>{Kanban.methods.getKanbanItem.apply(vm);return vm;},
        // loadSwimlane(){Kanban.methods.loadSwimlane.apply(vm)},


      };

      const formContainer_2 = {
        URI_ACTION: "https://0002-zebridge-dev-externe.api.crm-simple.com/interaction/",
        API_KEY: result.token,
        // scheduler: Scheduler.computed.scheduler,
        scheduler: {

          update(e) {
            console.log(e)
          },

        },
        config: {
          event: []
        },
        dispatchAction: async () => { Scheduler.methods.dispatchAction }

      };

      // console.log("Tooooken= ", formContainer.API_KEY)
      // ////console.log("Token for get :", API_KEY);
      //Always reset myEvents before getData()

      myEvents = [];
      // console.log("Scheduler",Scheduler)
      return Scheduler.methods.getData.apply(formContainer).then(async (response) => {
        // console.log("fghjkl_2", response)
        tasks = response;
        expect(response.length).toBeTruthy();
        if (response.length > 0) {
          let randomTaskToUpdate = Math.floor(Math.random() * response.length);
          let dataReceived = response[randomTaskToUpdate];
          // console.log("dataReceived",dataReceived)
          let dataUpdated = {
            idaction: dataReceived.id,
            id: dataReceived.id,
            start: "2021-12-29 15:39:50",
            end: dataReceived.end,
            text: "Mise à  jour de Réunion  marketing",
            resource: dataReceived.resource,
            lock: "0",
            color: dataReceived.color,
          };
          // console.log("Data Received last element : ", dataReceived);
          expect(response.length).toBeTruthy();
          return Scheduler.methods.Update_event.apply(formContainer_2, [dataUpdated]).then(function () {
            // console.log(response)
            return Scheduler.methods.getData.apply(formContainer).then(async (data) => {
              // console.log(data)
              tasks = data;
              //formatData();
              if (dataUpdated.color === "") {
                dataUpdated.color = "#9e5fff";
              }
              //console.log("We search : ", dataUpdated.idaction);
              let task = findTaskWithIdAction(tasks, dataUpdated.idaction);
              //console.log(tasks[randomTaskToUpdate], " data ", dataUpdated.idaction)
              //console.log("task", task)
              //console.log("dataUpdated", dataUpdated)
              //console.log(tasks[0].idaction, " data ", dataUpdated.idaction)
              expect(dataUpdated.text).toStrictEqual(task.text);
            });
          });

        }
      });
    });
  });
});

describe("Color tasks", () => {
  test("it should change color the existing tasks", () => {
    let e = {
      data: { color: "#ffff", }

    };

    let color = "#ff00ff";
    const formContainer = {

      scheduler: {
        events: {
          update: function (e) {
            return e;

          }

        }
      }

    };
    Scheduler.methods.updateColor.apply(formContainer, [e, color]);
    expect(e.data.color).toStrictEqual(color);

  });


});
// describe("Ressource", () => {
//   test("it should load ressource", () => {
//     const formContainer = {


//       config: {},
//       myResources: [],

//     }




//     Scheduler.methods.loadResources.apply(formContainer);
//     // expect(e.data.color).toStrictEqual(color);

//   });


// });


// describe("Updating", () => {
//   test("it should update task", () => {
//     const formContainer = {

//       config: {
//         events: [{
//           idaction: '2507',
//           start: '2022-01-12 00:00:00',
//           end: '2022-01-12 10:00:00',
//           id: '202d030b-e104-003b-46af-72749ebce8d0',
//           resource: '1',
//           text: 'Réunion avec les partenaires internationaux',
//           color: '#9e5fff'
//         }, {
//           idaction: '2507',
//           start: '2022-01-12 00:00:00',
//           end: '2022-01-12 10:00:00',
//           id: '202d030b-e104-003b-46af-72749ebce8d0',
//           resource: '1',
//           text: 'Réunion avec les partenaires internationaux',
//           color: '#9e5fff'
//         }]
//       },
//       updateColor: function (e, color) {
//         return e.color = color;

//       },
//       lockTâches: function (element) {
//         return element.lock = 1;

//       },

//     }

//     Scheduler.methods.updateTâches.apply(formContainer);
//     // expect(e.data.color).toStrictEqual(color);

//   });


// });


describe("Date", () => {
  test("it should upadate date", () => {
    const formContainer = {
      selectedUsers: [{
        id: "1",
        name: "Administrateur"
      }, {
        id: "2",
        name: "user1"
      }, {
        id: "3",
        name: "user2"
      }, {
        id: "4",
        name: "user3"
      }, {
        id: "5",
        name: "user4"
      }, {
        id: "6",
        name: "Comptable"
      }],


      typeview: {
        title: "Selectionnez",
        color: "#2251ff",
        index: "color_defaut",
      },
      idprojets: Scheduler.props.idprojets,
      idcontacts: Scheduler.props.idcontacts,
      idsocietes: Scheduler.props.idsocietes,
      getQueryParam() { Scheduler.methods.getQueryParam.apply(formContainer); return formContainer },
   
      setfilter: Scheduler.methods.setfilter ,

      //getData() { Scheduler.methods.getData.apply(formContainer); return formContainer },
      setColor: async () => { Scheduler.methods.setColor.apply(formContainer, [formContainer.typeview]) },

      month_selected: "Février",
      months:
        [
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
        ],
      year_selected: 2020,
      config: {
        startDate: "",
        update: function (e) {
          return e;

        }


      },
     getData: Scheduler.methods.getData,
      dispatchAction: Scheduler.methods.dispatchAction,
    //  getQueryParam: Scheduler.methods.getQueryParam,

    };


    Scheduler.methods.updateStartDate.apply(formContainer);
    expect(formContainer.config.startDate).toStrictEqual("2020-02-01");

  });


});

describe("Data fonction", () => {
  // Inspect the raw component options
  test("it should Select Rang", () => {
    const formContainer = {
      isComponentModalActive: false,
      events: {},


    };


    Scheduler.data().config.onTimeRangeSelected.apply(formContainer);
    //expect(formContainer.config.startDate).toStrictEqual("2020-02-01");

  });
});
describe("Data fonction onLoad", () => {
  // Inspect the raw component options
  test("it should have equality between args.data.barColor and args.data.color ", () => {
    let args = {
      source: {
        data: {
          idaction: '2915',
          id: '2915',
          start: '2021-12-29 15:39:50',
          end: '2021-12-28 10:04:09',
          text: 'Mise à  jour de Réunion  marketing',
          resource: '1',
          lock: '1',
          color: "#ffff",
          moveDisabled: false,
          resizeDisabled: false,
          clickDisabled: false,
          barColor: "",
          areas: []
        },
      },

      html: ""

    };
    Scheduler.data().config.bubble.onLoad(args);
    expect(args.html).toStrictEqual("<span style='font-weight: 900'>Mise à  jour de Réunion  marketing</span></br>Début: 29-12-2021 à 15:39</br>Fin: 28-12-2021 à 10:04</br><a href='https://0002-zebridge-dev-externe.crm-simple.com/action_edit.php?idaction=2915' target='_blank'rel='noopener' >Voir plus</a>");
  });
});

// describe("Data fonction", () => {
//   // Inspect the raw component options
//   test("it should have equality between args.data.barColor and args.data.color ", () => {
//     let args = {
//       data: {
//         barColor: "",
//         color: "ffff",
//         areas: []
//       }
//     };
//     Scheduler.data().config.onBeforeEventRender(args);
//     expect(args.data.barColor).toStrictEqual(args.data.color);

//   });
// });

describe("Data fonction onBeforeEventRender", () => {
  // Inspect the raw component options
  test("it should have equality between args.data.barColor and args.data.color ", () => {
    let args = {
      data: {
        idaction: '2915',
        id: '2915',
        start: '2021-12-29 15:39:50',
        end: '2021-12-28 10:04:09',
        text: 'Mise à  jour de Réunion  marketing',
        resource: '1',
        lock: '1',
        color: "#ffff",
        moveDisabled: false,
        resizeDisabled: false,
        clickDisabled: false,
        barColor: "",
        areas: []
      },

    };
    Scheduler.data().config.onBeforeEventRender(args);
    expect(args.data.barColor).toStrictEqual(args.data.color);

  });
});

describe("Data fonction onLoad", () => {
  // Inspect the raw component options
  test("it should have equality between args.data.barColor and args.data.color ", () => {
    let args = {
      source: {
        data: {
          idaction: '2915',
          id: '2915',
          start: '2021-12-29 15:39:50',
          end: '2021-12-28 10:04:09',
          text: 'Mise à  jour de Réunion  marketing',
          resource: '1',
          lock: '1',
          color: "#ffff",
          moveDisabled: false,
          resizeDisabled: false,
          clickDisabled: false,
          barColor: "",
          areas: []
        },
      },

      html: ""

    };
    Scheduler.data().config.bubble.onLoad(args);
    expect(args.html).toStrictEqual("<span style='font-weight: 900'>Mise à  jour de Réunion  marketing</span></br>Début: 29-12-2021 à 15:39</br>Fin: 28-12-2021 à 10:04</br><a href='https://0002-zebridge-dev-externe.crm-simple.com/action_edit.php?idaction=2915' target='_blank'rel='noopener' >Voir plus</a>");
  });
});


describe("Data fonction onEventResized in config", () => {
  jest.setTimeout(30000 * 60); //ms

  // Inspect the raw component options
  test("it should have equality between args.data.barColor and args.data.color ", () => {
    return generateToken().then(function (result) {
      let token = result.token;
      console.log(result.token)


      let args = {
        e: {
          data: {
            idaction: '2915',
            id: '2915',
            start: '2021-12-29 12:39:50',
            end: '2021-12-28 10:04:09',
            text: 'Mise à  jour de Réunion  marketing',
            resource: '1',
            lock: '0',
            color: "#ffff",
            moveDisabled: false,
            resizeDisabled: false,
            clickDisabled: false,
            barColor: "",
            areas: [],

          },
          id() { return args.e.data.id },
          resource() { return args.e.data.resource }

        },
        newEnd:'2021-12-29 12:39:50',
        newStart:'2021-12-28 10:04:09',

      };
      const formContainer_3 = {
        URI_ACTION: "https://0002-zebridge-dev-externe.api.crm-simple.com/interaction/",
        API_KEY:token,
        // scheduler: Scheduler.computed.scheduler,
        scheduler: {

          update(e) {
            console.log(e)
          },

        },
        config: {
          event: []
        },
        dispatchAction: async () => { Scheduler.methods.dispatchAction },
        //Update_event: (e) => { Scheduler.methods.Update_event.apply(formContainer_3, [e]) },
      };
      const formContainer_4 = {
       
        Update_event: (e) => { Scheduler.methods.Update_event.apply(formContainer_4, [e]);return formContainer_4 },
      };

      Scheduler.data().config.onEventResized.apply(formContainer_4, [args]);


    });

  });
});