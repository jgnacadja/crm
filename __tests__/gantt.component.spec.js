/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { DayPilot, DayPilotGantt } from "daypilot-pro-vue";
import { mount, shallowMount, localVue, router } from "@vue/test-utils";
import Gantt from "../src/components/gantt.vue";
import appservice from "../src/services/appservice";
import { makeServer } from "./server";
import store from "../src/store/";

let API_KEY;
//const server = makeServer();
const generateToken = () => {
  return appservice.getToken("admin", "Dw3BwezaQSar");
};

describe("Gantt Component mounted", () => {
  beforeEach(() => {
    generateToken().then((res) => {
      API_KEY = res;
    });
  });

  // test mounted gantt function
  it("should have a mounted gantt function", () => {
    expect(Gantt.mounted).toBeDefined();
    expect(typeof Gantt.mounted).toBe("function");
  });

  it("mock & shallowMount", () => {
    const mock = jest.fn();
    const wrapper = shallowMount(Gantt, { localVue, store, router });
  });
});
