import Gantt from "@/components/gantt.vue";
import Scheduler from "@/components/Scheduler.vue";
import SchedulerKanban from "@/components/SchedulerKanban.vue";
import agenda from "@/components/agenda.vue";

const Gant = {
    install(Vue) {
        Vue.component("Gant", Gantt);
    }
};

const Planner = {
    install(Vue) {
        Vue.component("Planner", Scheduler);
    },
};

const Kanban = {
    install(Vue) {
        Vue.component("Kanban", SchedulerKanban);
    },
};

const Agenda = {
    install(Vue) {
        Vue.component("agenda", agenda);
    },
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Gant);
    window.Vue.use(Planner);
    window.Vue.use(Kanban);
    window.Vue.use(Agenda);
}

export default Agenda;