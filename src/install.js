import Gantt from "@/components/gantt.vue";
import Scheduler from "@/components/Scheduler.vue";
import SchedulerKanban from "@/components/SchedulerKanban.vue";
import agenda from "@/components/agenda.vue";

const GantSimpleCrm = {
    install(Vue) {
        Vue.component("GantSimpleCrm", Gantt);
    }
};

const PlannerSimpleCrm = {
    install(Vue) {
        Vue.component("PlannerSimpleCrm", Scheduler);
    },
};

const KanbanSimpleCrm = {
    install(Vue) {
        Vue.component("KanbanSimpleCrm", SchedulerKanban);
    },
};

const CalendarSimpleCrm = {
    install(Vue) {
        Vue.component("CalendarSimpleCrm", agenda);
    },
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(GantSimpleCrm);
    window.Vue.use(PlannerSimpleCrm);
    window.Vue.use(KanbanSimpleCrm);
    window.Vue.use(CalendarSimpleCrm);
}

export default GantSimpleCrm;