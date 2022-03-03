/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// import { mount } from "@vue/test-utils";
import Kanban from "../src/components/SchedulerKanban.vue";
import appservice from "../src/services/appservice";
import { DayPilot } from "daypilot-pro-vue";
import axios from "axios";
const DEFAULT_API_KEY = Kanban.props.API_KEY.default();
const URI_ACTION = Kanban.props.URI_ACTION.default();
let config = {
    cards : [],
    columns :  [],
    swimlanes : [],
  }
const Vue = {
  set(arg,element,newValue){
    arg[element] = newValue;
  }
}
let users=[],lock=["alllock","0","1"],priority=["allpriority","0","1"];
const generateToken = () => {
  console.log ("I am generate Token and you call me");
  return appservice.getToken("admin", "Dw3BwezaQSar");
};

// get token before each test
beforeEach(() => {
  jest.setTimeout(30000 * 60); // ms
  return generateToken().then(function(result){
    Kanban.props.API_KEY=result.token;
  })
});

test('Can get API_TOKEN ', () => {
    expect(Kanban.props.API_KEY).not.toBe(DEFAULT_API_KEY);
});

// test getAllUsers()
describe("Function getAllUsers", () => {
  jest.setTimeout(30000 * 60); // ms
  it("should be able to get all user from API'", () => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
    const vm = {
      allUsers : [],
      API_KEY : Kanban.props.API_KEY,
    }
    return Kanban.methods.getAllUsers.apply(vm).then(function () {
      vm.allUsers.forEach(element => {
        users.push(element.id);
      });
      expect(vm.allUsers.length).not.toBe(0);
      const user_one = vm.allUsers[0];
      expect(Object.keys(user_one)).toStrictEqual(["name","id"]);
    });
  });
  it("shouldn't be able to get all user from API'", () => {
    const vm = {
      allUsers : [],
      API_KEY : "bad_key",
    }
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
    return Kanban.methods.getAllUsers.apply(vm).then(function (result) {
      expect(result).toStrictEqual([]);
    });
  });
});
// test compare()
describe("Function compare", () => {
  jest.setTimeout(30000 * 60); // ms
  it("should be able to order by asc'", () => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
    const input_values = [
        {
            "id": "1",
            "rubrique": "Etude"
        },
        {
            "id": "2",
            "rubrique": "Achat"
        },
        {
            "id": "3",
            "rubrique": "Réception"
        },
        {
            "id": "4",
            "rubrique": "Vente"
        },
        {
            "id": "5",
            "rubrique": "Commande"
        },
        {
            "id": "6",
            "rubrique": "Achat"
        },
    ]
    const hope_values = [
        {
            "id": "2",
            "rubrique": "Achat"
        },
        {
            "id": "6",
            "rubrique": "Achat"
        },
        {
            "id": "5",
            "rubrique": "Commande"
        },
        {
            "id": "1",
            "rubrique": "Etude"
        },
        {
            "id": "3",
            "rubrique": "Réception"
        },
        {
            "id": "4",
            "rubrique": "Vente"
        },
    ]
    const output_values = input_values.sort(Kanban.methods.compare);
    // jest.spyOn(console, 'log').mockRestore();
    expect(output_values).toStrictEqual(hope_values);
  });
});
// test getItemsList()
describe("Function getItemsList", () => {
  jest.setTimeout(30000 * 60); // ms
  it("should be able to get all items from API'", () => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
    // jest.spyOn(console, 'log').mockRestore();
    const vm = {
        URI_ITEMS : Kanban.props.URI_ITEMS.default(),
        API_KEY : Kanban.props.API_KEY,
        itemsList : [],
        getItemsList   : async () =>{Kanban.methods.getItemsList.apply(vm);return vm;},
        compare        :( a, b )=>Kanban.methods.compare(a,b),
        getItemColumns : () =>{
            vm.getItemColumnsIsCalled = true;
            return vm;
        },
        getItemColumnsIsCalled :false,
    }
    const myMock = jest.fn(async() =>
        Kanban.methods.getItemsList.apply(vm).then(function () {
            return vm;
        })
    );
    return myMock().then(function (result) {
        expect(result.itemsList.length).not.toBe(0);
        expect(result.getItemColumnsIsCalled).toBeTruthy();
        const item_one = result.itemsList[0];
        expect(Object.keys(item_one)).toStrictEqual(["id","rubrique"]);
    });
  });
  it("shouldn't be able to get all items from API'", () => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
    const vm = {
        URI_ITEMS : Kanban.props.URI_ITEMS.default(),
        API_KEY : "BADAPI_KEY",
        itemsList : [],
        getItemsList   : async () =>{Kanban.methods.getItemsList.apply(vm);return vm;},
        compare        :( a, b )=>Kanban.methods.compare(a,b),
        getItemColumns : async () =>{
            vm.getItemColumnsIsCalled = true;
            return vm;
        },
        getItemColumnsIsCalled :false,
    }
    const myMock = jest.fn(async() =>
        Kanban.methods.getItemsList.apply(vm).then(function (result) {
            return result;
        })
    );
    return myMock().then(function (result) {
        expect(result).toStrictEqual([]);
        expect(vm.getItemColumnsIsCalled).toBeFalsy();
    });
  });
});
// test getItemColumns()
describe("Function getItemColumns", () => {
  jest.setTimeout(30000 * 60); // ms
  it("should be able to get all Columns from API'", () => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
    // jest.spyOn(console, 'log').mockRestore();
    const vm = {
        URI_ITEMS : Kanban.props.URI_ITEMS.default(),
        URI_ACTIONTYPES : Kanban.props.URI_ACTIONTYPES.default(),
        API_KEY : Kanban.props.API_KEY,
        itemsList : [],
        isLoading: true,
        itemSelected : {},
        columnList : [],
        showingItems : "is-active",
        kanban : {
            columns : {
                list: [],
            },
        },
        config : config,
        getItemsList   : async () =>{Kanban.methods.getItemsList.apply(vm);return vm;},
        compare        :( a, b )=>Kanban.methods.compare(a,b),
        getItemColumns : () =>{
            vm.getItemColumnsIsCalled = true;
            return vm;
        },
        addCreateButton : (data) =>{
            return Kanban.methods.addCreateButton.apply(vm,[data]);
            // return vm;
        },
        createNewTasks : () =>{
            vm.addCreateButtonIsCalled = true;
            return vm;
        },
        loadSwimlane : () =>{
            vm.loadSwimlaneIsCalled = true;
            return vm;
        },
        loadCards : () =>{
            vm.loadCardsIsCalled = true;
            return vm;
        },
        getItemColumnsIsCalled :false,
        addCreateButtonIsCalled :false,
        loadSwimlaneIsCalled :false,
        loadCardsIsCalled :false,
    }
    // jest.spyOn(console, 'log').mockRestore();
    const myMock = jest.fn(async() =>
        Kanban.methods.getItemsList.apply(vm).then(function () {
            return Kanban.methods.getItemColumns.apply(vm,[vm.itemsList[0]]).then(function () {
                return vm;
            })
        })
    );
    return myMock().then(function (result) {
        console.log("COLUMNLIST", result);
        const columns = result.config.columns;
        expect(columns).not.toBe(0);
        expect(result.loadSwimlaneIsCalled).toBeTruthy();
        expect(result.isLoading).toBeFalsy(); //Close loading animation
        expect(result.loadCards).toBeTruthy();
        const columnList_one =columns[0];
        expect(Object.keys(columnList_one)).toStrictEqual(["id","name", "areas"]);
        expect(result.showingItems).toBe(""); //close items select box
    });
  });
  it("shouldn't be able to get all Columns from API'", () => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
    // jest.spyOn(console, 'log').mockRestore();
    const vm = {
        URI_ITEMS : Kanban.props.URI_ITEMS.default(),
        URI_ACTIONTYPES : "Kanban.props.URI_ACTIONTYPES.default()",
        API_KEY : Kanban.props.API_KEY,
        itemsList : [
            { id: '1', rubrique: 'Achat' },
            { id: '2', rubrique: 'Administratif' },
            { id: '3', rubrique: 'Marketing' },
            { id: '4', rubrique: 'Support' },
            { id: '5', rubrique: 'Vente' },
            { id: '6', rubrique: 'Projet' },
            { id: '7', rubrique: 'Privé' },
            { id: '8', rubrique: 'Livraison' },
            { id: '9', rubrique: 'Email' },
            { id: '10', rubrique: 'Logistique' },
            { id: '100', rubrique: 'HaPPi' },
            { id: '200', rubrique: 'SimpleDoc' },
            { id: '1000', rubrique: '{res:Pointage}' }
        ],
        isLoading: true,
        itemSelected : {},
        columnList : [],
        showingItems : "is-active",
        kanban : {
            columns : {
                list: [],
            },
        },
        config : config,
        getItemsList   : async () =>{Kanban.methods.getItemsList.apply(vm);return vm;},
        compare        :( a, b )=>Kanban.methods.compare(a,b),
        getItemColumns : () =>{
            return vm;
        },
    }
    // jest.spyOn(console, 'log').mockRestore();
    const myMock = jest.fn(async() =>
        Kanban.methods.getItemColumns.apply(vm,[vm.itemsList[0]]).then(function (result) {
            return result;
        })
    );
    return myMock().then(function (result) {
        console.log("RESULT WITH BAD API", result);
        expect(result).toStrictEqual([]); //close items select box
    });
  });
});
// test setColor()
describe("Function setColor", () => {
  jest.setTimeout(30000 * 60); // ms
  it("should be return the color of corresponding request'", () => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
    let type = Kanban.data().arrayFilter;
    let data = {
      "inter_cust1": {
          "title": "",
          "value": ""
      },
      "inter_cust2": {
          "title": "",
          "value": ""
      },
      "inter_cust3": {
          "title": "",
          "value": ""
      },
      "inter_cust4": {
          "title": "",
          "value": ""
      },
      "inter_cust5": {
          "title": "",
          "value": ""
      },
      "inter_cust6": {
          "title": "",
          "value": ""
      },
      "inter_cust7": {
          "title": "",
          "value": ""
      },
      "inter_cust8": {
          "title": "",
          "value": ""
      },
      "inter_cust9": {
          "title": "",
          "value": ""
      },
      "inter_cust10": {
          "title": "",
          "value": ""
      },
      "inter_cust11": {
          "title": "",
          "value": ""
      },
      "inter_cust12": {
          "title": "",
          "value": ""
      },
      "inter_cust13": {
          "title": "",
          "value": ""
      },
      "inter_cust14": {
          "title": "",
          "value": ""
      },
      "inter_cust15": {
          "title": "",
          "value": ""
      },
      "inter_cust16": {
          "title": "",
          "value": ""
      },
      "inter_cust17": {
          "title": "",
          "value": ""
      },
      "inter_cust18": {
          "title": "",
          "value": ""
      },
      "inter_cust19": {
          "title": "",
          "value": ""
      },
      "inter_cust20": {
          "title": "",
          "value": ""
      },
      "inter_cust21": {
          "title": "",
          "value": ""
      },
      "inter_cust22": {
          "title": "",
          "value": ""
      },
      "inter_cust23": {
          "title": "",
          "value": ""
      },
      "inter_cust24": {
          "title": "",
          "value": ""
      },
      "idaction": {
          "title": "idaction",
          "value": "2816"
      },
      "uuid_action": {
          "title": "uuid_action",
          "value": ""
      },
      "idutilisateur": {
          "title": "Utilisateur",
          "value": "1"
      },
      "uuid_utilisateur": {
          "title": "uuid_utilisateur",
          "value": ""
      },
      "idcontact": {
          "title": "idcontact",
          "value": ""
      },
      "idsociete": {
          "title": "idsociete",
          "value": ""
      },
      "idprojet": {
          "title": "Projet",
          "value": ""
      },
      "date_mod": {
          "title": "date_mod",
          "value": "2022-01-24 10:58:34"
      },
      "date_action": {
          "title": "Date début",
          "value": "2022-01-16 23:00:00"
      },
      "duree_heures": {
          "title": "Durée heures",
          "value": "23"
      },
      "duree_minutes": {
          "title": "Durée minutes",
          "value": "59"
      },
      "date_fin": {
          "title": "date_fin",
          "value": "2022-01-17 22:59:00"
      },
      "date_echeance": {
          "title": "Date échéance",
          "value": ""
      },
      "date_stat": {
          "title": "date_stat",
          "value": "2022-01-16"
      },
      "color": {
          "title": "color",
          "value": "{\"color_defaut\":\"#668cd9\", \"color_etat\":\"#F54D40\", \"color_utilisateur\":\"#c93710\", \"color_priorite\":\"#52AE56\", \"color_priorite_echeance\":\"#e19400\", \"color_type\":\"#668cd9\" }"
      },
      "sujet": {
          "title": "Sujet",
          "value": "Suppression des tâches de test d'envoi des données"
      },
      "location": {
          "title": "location",
          "value": ""
      },
      "idmedia": {
          "title": "Média",
          "value": ""
      },
      "idtype_action": {
          "title": "Type interaction",
          "value": ""
      },
      "iddocument_type": {
          "title": "iddocument_type",
          "value": ""
      },
      "idsuivi_facture": {
          "title": "idsuivi_facture",
          "value": ""
      },
      "budget": {
          "title": "Budget",
          "value": ""
      },
      "budget_pondere": {
          "title": "budget_pondere",
          "value": ""
      },
      "source": {
          "title": "Source",
          "value": ""
      },
      "ref_document": {
          "title": "ref_document",
          "value": ""
      },
      "note": {
          "title": "Note",
          "value": "Administrateur, 24/01/2022 10:58:34 || Modification du champ date_fin  : 2022-01-26 23:59:00 -> 2022-01-17 22:59:00\r\n\r\nAdministrateur, 24/01/2022 10:58:34 || Modification du champ date_stat  : 2022-01-20 -> 2022-01-16  23:00:00\r\n\r\nAdministrateur, 24/01/2022 10:58:34 || Modification du champ date_mod  : 2022-01-21 09:26:32 -> 2022-01-24 10:58:34\r\n\r\nAdministrateur, 24/01/2022 10:58:34 || Modification du champ Durée minutes : 0 -> 59\r\n\r\nAdministrateur, 24/01/2022 10:58:34 || Modification du champ Durée heures : 144 -> 23\r\n\r\nAdministrateur, 24/01/2022 10:58:34 || Modification du champ Date début : 2022-01-20 23:00:00 -> 2022-01-16  23:00:00"
      },
      "etape_suivante": {
          "title": "Etape suivante",
          "value": ""
      },
      "etat": {
          "title": "Etat",
          "value": "10"
      },
      "all_day": {
          "title": "Tâche",
          "value": "1"
      },
      "recurring_rule": {
          "title": "recurring_rule",
          "value": "0"
      },
      "priorite": {
          "title": "Priorité",
          "value": "0"
      },
      "ss_datetime": {
          "title": "ss_datetime",
          "value": ""
      },
      "ss_status": {
          "title": "ss_status",
          "value": "0"
      },
      "idaction_parent": {
          "title": "idaction_parent",
          "value": ""
      },
      "livrable": {
          "title": "livrable",
          "value": "0"
      },
      "droits": {
          "title": "droits",
          "value": "000002;000003;000004;000005;000001;"
      },
      "type_id": {
          "title": "type_id",
          "value": "0"
      },
      "gross": {
          "title": "gross",
          "value": "0.000000"
      },
      "tax_amount": {
          "title": "tax_amount",
          "value": "0.000000"
      },
      "total": {
          "title": "total",
          "value": "0.000000"
      },
      "e_lock": {
          "title": "e_lock",
          "value": "1"
      },
      "e_idaction_from": {
          "title": "e_idaction_from",
          "value": ""
      },
      "e_modele_id": {
          "title": "e_modele_id",
          "value": ""
      },
      "e_stock_genere": {
          "title": "e_stock_genere",
          "value": "0"
      },
      "e_doc_genere": {
          "title": "e_doc_genere",
          "value": "0"
      },
      "e_facture_genere": {
          "title": "e_facture_genere",
          "value": "0"
      },
      "e_bl_genere": {
          "title": "e_bl_genere",
          "value": "0"
      },
      "e_commande_fournisseur_genere": {
          "title": "e_commande_fournisseur_genere",
          "value": "0"
      },
      "e_vente_gagnee_genere": {
          "title": "e_vente_gagnee_genere",
          "value": "0"
      },
      "e_biller_id": {
          "title": "e_biller_id",
          "value": ""
      },
      "paiement_txt": {
          "title": "paiement_txt",
          "value": ""
      },
      "e_rappel_facture_envoye": {
          "title": "e_rappel_facture_envoye",
          "value": "0"
      },
      "idaction_recurrence": {
          "title": "idaction_recurrence",
          "value": ""
      },
      "temps_passe_heures": {
          "title": "temps_passe_heures",
          "value": "0"
      },
      "temps_passe_minutes": {
          "title": "temps_passe_minutes",
          "value": "0.00"
      },
      "idfeedback": {
          "title": "idfeedback",
          "value": ""
      },
      "total_paiement": {
          "title": "total_paiement",
          "value": "0.000000"
      },
      "total_reste": {
          "title": "total_reste",
          "value": "0.000000"
      },
      "e_avoir_genere": {
          "title": "e_avoir_genere",
          "value": "0"
      },
      "rappel_envoye": {
          "title": "rappel_envoye",
          "value": "0"
      },
      "date_paiement": {
          "title": "date_paiement",
          "value": ""
      },
      "date_bak": {
          "title": "date_bak",
          "value": ""
      },
      "note_html": {
          "title": "note_html",
          "value": ""
      },
      "texte_paiement": {
          "title": "texte_paiement",
          "value": ""
      },
      "bloc_haut": {
          "title": "bloc_haut",
          "value": ""
      },
      "bloc_bas": {
          "title": "bloc_bas",
          "value": ""
      },
      "bloc_total": {
          "title": "bloc_total",
          "value": ""
      },
      "bloc_bis": {
          "title": "bloc_bis",
          "value": ""
      },
      "sdoc_nomfichier": {
          "title": "sdoc_nomfichier",
          "value": ""
      },
      "inter_cust25": {
          "title": "",
          "value": ""
      },
      "inter_cust26": {
          "title": "",
          "value": ""
      },
      "inter_cust27": {
          "title": "",
          "value": ""
      },
      "inter_cust28": {
          "title": "",
          "value": ""
      },
      "inter_cust29": {
          "title": "",
          "value": ""
      },
      "inter_cust30": {
          "title": "",
          "value": ""
      },
      "inter_cust31": {
          "title": "",
          "value": ""
      },
      "inter_cust32": {
          "title": "",
          "value": ""
      },
      "inter_cust33": {
          "title": "",
          "value": ""
      },
      "inter_cust34": {
          "title": "",
          "value": ""
      },
      "inter_cust35": {
          "title": "",
          "value": ""
      },
      "inter_cust36": {
          "title": "",
          "value": ""
      },
      "inter_cust37": {
          "title": "",
          "value": ""
      },
      "inter_cust38": {
          "title": "",
          "value": ""
      },
      "inter_cust39": {
          "title": "",
          "value": ""
      },
      "inter_cust40": {
          "title": "",
          "value": ""
      },
      "inter_cust41": {
          "title": "",
          "value": ""
      },
      "inter_cust42": {
          "title": "",
          "value": ""
      },
      "inter_cust43": {
          "title": "",
          "value": ""
      },
      "inter_cust44": {
          "title": "",
          "value": ""
      },
      "inter_cust45": {
          "title": "",
          "value": ""
      },
      "inter_cust46": {
          "title": "",
          "value": ""
      },
      "inter_cust47": {
          "title": "",
          "value": ""
      },
      "inter_cust48": {
          "title": "",
          "value": ""
      },
      "inter_cust49": {
          "title": "",
          "value": ""
      },
      "inter_cust50": {
          "title": "",
          "value": ""
      },
      "inter_cust51": {
          "title": "",
          "value": ""
      },
      "inter_cust52": {
          "title": "",
          "value": ""
      },
      "inter_cust53": {
          "title": "",
          "value": ""
      },
      "inter_cust54": {
          "title": "",
          "value": ""
      },
      "inter_cust55": {
          "title": "",
          "value": ""
      },
      "inter_cust56": {
          "title": "",
          "value": ""
      },
      "inter_cust57": {
          "title": "",
          "value": ""
      },
      "inter_cust58": {
          "title": "",
          "value": ""
      },
      "inter_cust59": {
          "title": "",
          "value": ""
      },
      "inter_cust60": {
          "title": "",
          "value": ""
      },
      "inter_cust61": {
          "title": "",
          "value": ""
      },
      "inter_cust62": {
          "title": "",
          "value": ""
      },
      "inter_cust63": {
          "title": "",
          "value": ""
      },
      "inter_cust64": {
          "title": "",
          "value": ""
      },
      "inter_cust65": {
          "title": "",
          "value": ""
      },
      "inter_cust66": {
          "title": "",
          "value": ""
      },
      "inter_cust67": {
          "title": "",
          "value": ""
      },
      "inter_cust68": {
          "title": "",
          "value": ""
      },
      "inter_cust69": {
          "title": "",
          "value": ""
      },
      "inter_cust70": {
          "title": "",
          "value": ""
      },
      "inter_cust71": {
          "title": "",
          "value": ""
      },
      "inter_cust72": {
          "title": "",
          "value": ""
      },
      "inter_cust73": {
          "title": "",
          "value": ""
      },
      "inter_cust74": {
          "title": "",
          "value": ""
      },
      "inter_cust75": {
          "title": "",
          "value": ""
      },
      "inter_cust76": {
          "title": "",
          "value": ""
      },
      "inter_cust77": {
          "title": "",
          "value": ""
      },
      "inter_cust78": {
          "title": "",
          "value": ""
      },
      "inter_cust79": {
          "title": "",
          "value": ""
      },
      "inter_cust80": {
          "title": "",
          "value": ""
      },
      "inter_cust81": {
          "title": "",
          "value": ""
      },
      "inter_cust82": {
          "title": "",
          "value": ""
      },
      "inter_cust83": {
          "title": "",
          "value": ""
      },
      "inter_cust84": {
          "title": "",
          "value": ""
      },
      "inter_cust85": {
          "title": "",
          "value": ""
      },
      "inter_cust86": {
          "title": "",
          "value": ""
      },
      "inter_cust87": {
          "title": "",
          "value": ""
      },
      "inter_cust88": {
          "title": "",
          "value": ""
      },
      "inter_cust89": {
          "title": "",
          "value": ""
      },
      "inter_cust90": {
          "title": "",
          "value": ""
      },
      "inter_cust91": {
          "title": "",
          "value": ""
      },
      "inter_cust92": {
          "title": "",
          "value": ""
      },
      "inter_cust93": {
          "title": "",
          "value": ""
      },
      "inter_cust94": {
          "title": "",
          "value": ""
      },
      "inter_cust95": {
          "title": "",
          "value": ""
      },
      "inter_cust96": {
          "title": "",
          "value": ""
      },
      "inter_cust97": {
          "title": "",
          "value": ""
      },
      "inter_cust98": {
          "title": "",
          "value": ""
      },
      "inter_cust99": {
          "title": "",
          "value": ""
      },
      "inter_cust100": {
          "title": "",
          "value": ""
      }
    };
    let color= Kanban.methods.setColor(type[2],data);
    expect(color).toBe(JSON.parse(data.color.value).color_priorite);
  });
  it("should return the default color when they can't find color from api'", () => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
    let type = Kanban.data().arrayFilter;
    let data = {
      "inter_cust1": {
          "title": "",
          "value": ""
      },
      "inter_cust2": {
          "title": "",
          "value": ""
      },
      "inter_cust3": {
          "title": "",
          "value": ""
      },
      "inter_cust4": {
          "title": "",
          "value": ""
      },
      "inter_cust5": {
          "title": "",
          "value": ""
      },
      "inter_cust6": {
          "title": "",
          "value": ""
      },
      "inter_cust7": {
          "title": "",
          "value": ""
      },
      "inter_cust8": {
          "title": "",
          "value": ""
      },
      "inter_cust9": {
          "title": "",
          "value": ""
      },
      "inter_cust10": {
          "title": "",
          "value": ""
      },
      "inter_cust11": {
          "title": "",
          "value": ""
      },
      "inter_cust12": {
          "title": "",
          "value": ""
      },
      "inter_cust13": {
          "title": "",
          "value": ""
      },
      "inter_cust14": {
          "title": "",
          "value": ""
      },
      "inter_cust15": {
          "title": "",
          "value": ""
      },
      "inter_cust16": {
          "title": "",
          "value": ""
      },
      "inter_cust17": {
          "title": "",
          "value": ""
      },
      "inter_cust18": {
          "title": "",
          "value": ""
      },
      "inter_cust19": {
          "title": "",
          "value": ""
      },
      "inter_cust20": {
          "title": "",
          "value": ""
      },
      "inter_cust21": {
          "title": "",
          "value": ""
      },
      "inter_cust22": {
          "title": "",
          "value": ""
      },
      "inter_cust23": {
          "title": "",
          "value": ""
      },
      "inter_cust24": {
          "title": "",
          "value": ""
      },
      "idaction": {
          "title": "idaction",
          "value": "2816"
      },
      "uuid_action": {
          "title": "uuid_action",
          "value": ""
      },
      "idutilisateur": {
          "title": "Utilisateur",
          "value": "1"
      },
      "uuid_utilisateur": {
          "title": "uuid_utilisateur",
          "value": ""
      },
      "idcontact": {
          "title": "idcontact",
          "value": ""
      },
      "idsociete": {
          "title": "idsociete",
          "value": ""
      },
      "idprojet": {
          "title": "Projet",
          "value": ""
      },
      "date_mod": {
          "title": "date_mod",
          "value": "2022-01-24 10:58:34"
      },
      "date_action": {
          "title": "Date début",
          "value": "2022-01-16 23:00:00"
      },
      "duree_heures": {
          "title": "Durée heures",
          "value": "23"
      },
      "duree_minutes": {
          "title": "Durée minutes",
          "value": "59"
      },
      "date_fin": {
          "title": "date_fin",
          "value": "2022-01-17 22:59:00"
      },
      "date_echeance": {
          "title": "Date échéance",
          "value": ""
      },
      "date_stat": {
          "title": "date_stat",
          "value": "2022-01-16"
      },
      "color": {
          "title": "color",
      },
      "sujet": {
          "title": "Sujet",
          "value": "Suppression des tâches de test d'envoi des données"
      },
      "location": {
          "title": "location",
          "value": ""
      },
      "idmedia": {
          "title": "Média",
          "value": ""
      },
      "idtype_action": {
          "title": "Type interaction",
          "value": ""
      },
      "iddocument_type": {
          "title": "iddocument_type",
          "value": ""
      },
      "idsuivi_facture": {
          "title": "idsuivi_facture",
          "value": ""
      },
      "budget": {
          "title": "Budget",
          "value": ""
      },
      "budget_pondere": {
          "title": "budget_pondere",
          "value": ""
      },
      "source": {
          "title": "Source",
          "value": ""
      },
      "ref_document": {
          "title": "ref_document",
          "value": ""
      },
      "note": {
          "title": "Note",
          "value": "Administrateur, 24/01/2022 10:58:34 || Modification du champ date_fin  : 2022-01-26 23:59:00 -> 2022-01-17 22:59:00\r\n\r\nAdministrateur, 24/01/2022 10:58:34 || Modification du champ date_stat  : 2022-01-20 -> 2022-01-16  23:00:00\r\n\r\nAdministrateur, 24/01/2022 10:58:34 || Modification du champ date_mod  : 2022-01-21 09:26:32 -> 2022-01-24 10:58:34\r\n\r\nAdministrateur, 24/01/2022 10:58:34 || Modification du champ Durée minutes : 0 -> 59\r\n\r\nAdministrateur, 24/01/2022 10:58:34 || Modification du champ Durée heures : 144 -> 23\r\n\r\nAdministrateur, 24/01/2022 10:58:34 || Modification du champ Date début : 2022-01-20 23:00:00 -> 2022-01-16  23:00:00"
      },
      "etape_suivante": {
          "title": "Etape suivante",
          "value": ""
      },
      "etat": {
          "title": "Etat",
          "value": "10"
      },
      "all_day": {
          "title": "Tâche",
          "value": "1"
      },
      "recurring_rule": {
          "title": "recurring_rule",
          "value": "0"
      },
      "priorite": {
          "title": "Priorité",
          "value": "0"
      },
      "ss_datetime": {
          "title": "ss_datetime",
          "value": ""
      },
      "ss_status": {
          "title": "ss_status",
          "value": "0"
      },
      "idaction_parent": {
          "title": "idaction_parent",
          "value": ""
      },
      "livrable": {
          "title": "livrable",
          "value": "0"
      },
      "droits": {
          "title": "droits",
          "value": "000002;000003;000004;000005;000001;"
      },
      "type_id": {
          "title": "type_id",
          "value": "0"
      },
      "gross": {
          "title": "gross",
          "value": "0.000000"
      },
      "tax_amount": {
          "title": "tax_amount",
          "value": "0.000000"
      },
      "total": {
          "title": "total",
          "value": "0.000000"
      },
      "e_lock": {
          "title": "e_lock",
          "value": "1"
      },
      "e_idaction_from": {
          "title": "e_idaction_from",
          "value": ""
      },
      "e_modele_id": {
          "title": "e_modele_id",
          "value": ""
      },
      "e_stock_genere": {
          "title": "e_stock_genere",
          "value": "0"
      },
      "e_doc_genere": {
          "title": "e_doc_genere",
          "value": "0"
      },
      "e_facture_genere": {
          "title": "e_facture_genere",
          "value": "0"
      },
      "e_bl_genere": {
          "title": "e_bl_genere",
          "value": "0"
      },
      "e_commande_fournisseur_genere": {
          "title": "e_commande_fournisseur_genere",
          "value": "0"
      },
      "e_vente_gagnee_genere": {
          "title": "e_vente_gagnee_genere",
          "value": "0"
      },
      "e_biller_id": {
          "title": "e_biller_id",
          "value": ""
      },
      "paiement_txt": {
          "title": "paiement_txt",
          "value": ""
      },
      "e_rappel_facture_envoye": {
          "title": "e_rappel_facture_envoye",
          "value": "0"
      },
      "idaction_recurrence": {
          "title": "idaction_recurrence",
          "value": ""
      },
      "temps_passe_heures": {
          "title": "temps_passe_heures",
          "value": "0"
      },
      "temps_passe_minutes": {
          "title": "temps_passe_minutes",
          "value": "0.00"
      },
      "idfeedback": {
          "title": "idfeedback",
          "value": ""
      },
      "total_paiement": {
          "title": "total_paiement",
          "value": "0.000000"
      },
      "total_reste": {
          "title": "total_reste",
          "value": "0.000000"
      },
      "e_avoir_genere": {
          "title": "e_avoir_genere",
          "value": "0"
      },
      "rappel_envoye": {
          "title": "rappel_envoye",
          "value": "0"
      },
      "date_paiement": {
          "title": "date_paiement",
          "value": ""
      },
      "date_bak": {
          "title": "date_bak",
          "value": ""
      },
      "note_html": {
          "title": "note_html",
          "value": ""
      },
      "texte_paiement": {
          "title": "texte_paiement",
          "value": ""
      },
      "bloc_haut": {
          "title": "bloc_haut",
          "value": ""
      },
      "bloc_bas": {
          "title": "bloc_bas",
          "value": ""
      },
      "bloc_total": {
          "title": "bloc_total",
          "value": ""
      },
      "bloc_bis": {
          "title": "bloc_bis",
          "value": ""
      },
      "sdoc_nomfichier": {
          "title": "sdoc_nomfichier",
          "value": ""
      },
      "inter_cust25": {
          "title": "",
          "value": ""
      },
      "inter_cust26": {
          "title": "",
          "value": ""
      },
      "inter_cust27": {
          "title": "",
          "value": ""
      },
      "inter_cust28": {
          "title": "",
          "value": ""
      },
      "inter_cust29": {
          "title": "",
          "value": ""
      },
      "inter_cust30": {
          "title": "",
          "value": ""
      },
      "inter_cust31": {
          "title": "",
          "value": ""
      },
      "inter_cust32": {
          "title": "",
          "value": ""
      },
      "inter_cust33": {
          "title": "",
          "value": ""
      },
      "inter_cust34": {
          "title": "",
          "value": ""
      },
      "inter_cust35": {
          "title": "",
          "value": ""
      },
      "inter_cust36": {
          "title": "",
          "value": ""
      },
      "inter_cust37": {
          "title": "",
          "value": ""
      },
      "inter_cust38": {
          "title": "",
          "value": ""
      },
      "inter_cust39": {
          "title": "",
          "value": ""
      },
      "inter_cust40": {
          "title": "",
          "value": ""
      },
      "inter_cust41": {
          "title": "",
          "value": ""
      },
      "inter_cust42": {
          "title": "",
          "value": ""
      },
      "inter_cust43": {
          "title": "",
          "value": ""
      },
      "inter_cust44": {
          "title": "",
          "value": ""
      },
      "inter_cust45": {
          "title": "",
          "value": ""
      },
      "inter_cust46": {
          "title": "",
          "value": ""
      },
      "inter_cust47": {
          "title": "",
          "value": ""
      },
      "inter_cust48": {
          "title": "",
          "value": ""
      },
      "inter_cust49": {
          "title": "",
          "value": ""
      },
      "inter_cust50": {
          "title": "",
          "value": ""
      },
      "inter_cust51": {
          "title": "",
          "value": ""
      },
      "inter_cust52": {
          "title": "",
          "value": ""
      },
      "inter_cust53": {
          "title": "",
          "value": ""
      },
      "inter_cust54": {
          "title": "",
          "value": ""
      },
      "inter_cust55": {
          "title": "",
          "value": ""
      },
      "inter_cust56": {
          "title": "",
          "value": ""
      },
      "inter_cust57": {
          "title": "",
          "value": ""
      },
      "inter_cust58": {
          "title": "",
          "value": ""
      },
      "inter_cust59": {
          "title": "",
          "value": ""
      },
      "inter_cust60": {
          "title": "",
          "value": ""
      },
      "inter_cust61": {
          "title": "",
          "value": ""
      },
      "inter_cust62": {
          "title": "",
          "value": ""
      },
      "inter_cust63": {
          "title": "",
          "value": ""
      },
      "inter_cust64": {
          "title": "",
          "value": ""
      },
      "inter_cust65": {
          "title": "",
          "value": ""
      },
      "inter_cust66": {
          "title": "",
          "value": ""
      },
      "inter_cust67": {
          "title": "",
          "value": ""
      },
      "inter_cust68": {
          "title": "",
          "value": ""
      },
      "inter_cust69": {
          "title": "",
          "value": ""
      },
      "inter_cust70": {
          "title": "",
          "value": ""
      },
      "inter_cust71": {
          "title": "",
          "value": ""
      },
      "inter_cust72": {
          "title": "",
          "value": ""
      },
      "inter_cust73": {
          "title": "",
          "value": ""
      },
      "inter_cust74": {
          "title": "",
          "value": ""
      },
      "inter_cust75": {
          "title": "",
          "value": ""
      },
      "inter_cust76": {
          "title": "",
          "value": ""
      },
      "inter_cust77": {
          "title": "",
          "value": ""
      },
      "inter_cust78": {
          "title": "",
          "value": ""
      },
      "inter_cust79": {
          "title": "",
          "value": ""
      },
      "inter_cust80": {
          "title": "",
          "value": ""
      },
      "inter_cust81": {
          "title": "",
          "value": ""
      },
      "inter_cust82": {
          "title": "",
          "value": ""
      },
      "inter_cust83": {
          "title": "",
          "value": ""
      },
      "inter_cust84": {
          "title": "",
          "value": ""
      },
      "inter_cust85": {
          "title": "",
          "value": ""
      },
      "inter_cust86": {
          "title": "",
          "value": ""
      },
      "inter_cust87": {
          "title": "",
          "value": ""
      },
      "inter_cust88": {
          "title": "",
          "value": ""
      },
      "inter_cust89": {
          "title": "",
          "value": ""
      },
      "inter_cust90": {
          "title": "",
          "value": ""
      },
      "inter_cust91": {
          "title": "",
          "value": ""
      },
      "inter_cust92": {
          "title": "",
          "value": ""
      },
      "inter_cust93": {
          "title": "",
          "value": ""
      },
      "inter_cust94": {
          "title": "",
          "value": ""
      },
      "inter_cust95": {
          "title": "",
          "value": ""
      },
      "inter_cust96": {
          "title": "",
          "value": ""
      },
      "inter_cust97": {
          "title": "",
          "value": ""
      },
      "inter_cust98": {
          "title": "",
          "value": ""
      },
      "inter_cust99": {
          "title": "",
          "value": ""
      },
      "inter_cust100": {
          "title": "",
          "value": ""
      }
    };
    let color= Kanban.methods.setColor(type[0],data);
    expect(color).toBe("#2251ff");
  });
});
// test getKanbanItem()
describe("Function getKanbanItem", () => {
  describe("Should be able to get Data and format them", () => {
    jest.setTimeout(30000 * 60); // ms
    it("should be able to get all tasks from API", () => {
      jest.spyOn(console, 'log').mockImplementation(jest.fn());
      const vm = {
        typeview  : Kanban.data().typeview,
        tasks : [],
        url   : Kanban.props.URI.default()+Kanban.props.API_KEY,
        setColor : (type,data) => Kanban.methods.setColor(type,data),
      }
      return Kanban.methods.getKanbanItem.apply(vm,[vm.url]).then(function () {
        expect(vm.tasks).not.toBe(0);
        expect(vm.tasks.length).not.toBe(0);
      });
    });
    it("Tasks should have the format wanted", () => {
        jest.spyOn(console, 'log').mockImplementation(jest.fn());
      const vm = {
        typeview  : Kanban.data().typeview,
        tasks : [],
        url   : Kanban.props.URI.default()+Kanban.props.API_KEY,
        setColor : (type,data) => Kanban.methods.setColor(type,data),
      }
      return Kanban.methods.getKanbanItem.apply(vm,[vm.url]).then(function () {
        const task_one = vm.tasks[0];
        expect(Object.keys(task_one)).toStrictEqual(["idaction","id","name","text","swimlane","start","end",
                                                      "column","lock","barColor","priority","areas"]);
      });
    });
  });
  it("should not be able to get all tasks from API'", () => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
    const vm = {
      typeview  : Kanban.data().typeview,
      setColor : (type,data) => Kanban.methods.setColor(type,data),
      tasks : [],
      url : "bad_url",
    }
    return Kanban.methods.getKanbanItem.apply(vm,[vm.url]).then(function (response) {
      expect(response).toStrictEqual([]);
    });
  });
});
// test createNewTasks()
describe("Function createNewTasks", () => {
    it("should be able to create a new task'", () => {
        jest.spyOn(console, 'log').mockImplementation(jest.fn());
        const vm = {
            API_KEY     : Kanban.props.API_KEY,
            URI_ACTION  : URI_ACTION,
            ID_USER     : Kanban.props.ID_USER.default(),
            lock        : lock[0],
            priority    : priority[0],
            onFilter : () =>{
                vm.onFilterIsCalled = true;
                return vm;
            },
            onFilterIsCalled : false,
        }
        let args = {
            data : {
                id : 1,
            }
        };
        let result = {
            result : "Create through test"
        }
        DayPilot.Modal.prompt = async() => { 
            return result;
        }
        // jest.spyOn(console, 'log').mockRestore();
        const myMock = jest.fn(async() =>{
            await Kanban.methods.createNewTasks.apply(vm,[args,"column"]);
            // Enabled the code below to delete tests modification
            // var config = {
            //     method: "delete",
            //     url: vm.URI_ACTION + vm.API_KEY + "/3003",
            //     headers: {},
            //   };
        
            // axios(config).then(() => {
            //     console.log("DELETED")
            // });
            return vm;
        });
        return myMock().then(function (result) {
            expect(result.onFilterIsCalled).toBeTruthy(); //close items select box
        });
    });
    it("should not be able to get all tasks from API'", () => {
        jest.spyOn(console, 'log').mockImplementation(jest.fn());
        const vm = {
            // API_KEY     : Kanban.props.API_KEY,
            // URI_ACTION  : URI_ACTION,
            ID_USER     : Kanban.props.ID_USER.default(),
            lock        : lock[0],
            priority    : priority[0],
            onFilter : () =>{
                vm.onFilterIsCalled = true;
                return vm;
            },
            onFilterIsCalled : false,
        }
        let args = {
            data : {
                id : 1,
            }
        };
        let result = {
            result : "Create through test"
        }
        DayPilot.Modal.prompt = async() => { 
            return result;
        }
        // jest.spyOn(console, 'log').mockRestore();
        const myMock = jest.fn(async() =>{
            await Kanban.methods.createNewTasks.apply(vm,[args,"column"]);
            return vm;
        });
        return myMock().then(function (result) {
            expect(result.onFilterIsCalled).toBeFalsy(); //close items select box
        });
    });
});
// loadSwimlane()
describe("Function loadSwimlane", () => {
    it("Get swimlane", () => {
      jest.spyOn(console, 'log').mockImplementation(jest.fn());
      const vm = {
        allUsers    : [
          {"name": "Administrateur","id": "1"},
          {"name": "user1","id": "2"},
          {"name": "user2","id": "3"},
          {"name": "user3","id": "4"},
          {"name": "user4","id": "5"},
          {"name": "Comptable","id": "6"}
        ],
        config      : [],
      }
      Kanban.methods.loadSwimlane.apply(vm)
      expect(vm.config.swimlanes).toBe(vm.allUsers);
    });
});
// test loadCards(), loadColumns() and loadSwimlane()
// onFilter()
describe("Function onFilter", () => {
  jest.setTimeout(30000 * 60); // ms
  describe("Should get the correct URL TO SEND", () => {
    jest.setTimeout(30000 * 60); // ms
    let allUsers= [
      {"name": "Administrateur","id": "1"},
      {"name": "user1","id": "2"},
      {"name": "user2","id": "3"},
      {"name": "user3","id": "4"},
      {"name": "user4","id": "5"},
      {"name": "Comptable","id": "6"}
    ]
    it('Case One : All default values', () => {
        jest.spyOn(console, 'log').mockImplementation(jest.fn());
      const vm = {
        URI         : Kanban.props.URI.default(),
        API_KEY     : Kanban.props.API_KEY,
        allUsers    : allUsers,
        user        : allUsers, 
        lock        : lock[0], 
        priority    : priority[0], 
        isLoading : false,
        getQueryParam(){return Kanban.methods.getQueryParam.apply(vm); },
        setfilter(listArray, param){ return Kanban.methods.setfilter.apply(vm,[listArray, param]);},
        getKanbanItem : async (url) =>{
            vm.result=url;
          Kanban.methods.getKanbanItem(url);
        },
        loadSwimlane(){Kanban.methods.loadSwimlane.apply(vm)},
        addCreateButton(data){
          Kanban.methods.addCreateButton(data);
        },
        loadColumns(){Kanban.methods.loadColumns.apply(vm)},
        loadCards(){Kanban.methods.loadCards.apply(vm);},
        config        : config,
        tasks         : [],
        columnList    : [],
        result        : "",
        kanban        : {cellMarginBottom  : 0,}
      }
      const myMock = jest.fn(async() =>
          Kanban.methods.onFilter.apply(vm).then(function () {
            return vm.result;
          })
      );
      return myMock().then(function (result) {
        let default_url = Kanban.props.URI.default()+Kanban.props.API_KEY+"/condition:idutilisateur:egal:1:OR:idutilisateur:egal:2:OR:idutilisateur:egal:3:OR:idutilisateur:egal:4:OR:idutilisateur:egal:5:OR:idutilisateur:egal:6";
        expect(result).toBe(default_url);
      });
    });
    it('Case Two : User Only', () => {
        jest.spyOn(console, 'log').mockImplementation(jest.fn());
      const vm = {
        URI         : Kanban.props.URI.default(),
        API_KEY     : Kanban.props.API_KEY,
        allUsers    : allUsers,
        user        : [allUsers[0],allUsers[1],allUsers[2]], 
        lock        : lock[0], 
        priority    : priority[0], 
        isLoading : false,
        getQueryParam(){return Kanban.methods.getQueryParam.apply(vm); },
        setfilter(listArray, param){ return Kanban.methods.setfilter.apply(vm,[listArray, param]);},
        getKanbanItem : async (url) =>{
          Kanban.methods.getKanbanItem(url);
          vm.result=url;
        },
        loadSwimlane(){Kanban.methods.loadSwimlane.apply(vm)},
        addCreateButton(data){
          Kanban.methods.addCreateButton(data);
        },
        loadColumns(){Kanban.methods.loadColumns.apply(vm)},
        loadCards(){Kanban.methods.loadCards.apply(vm);},
        config        : config,
        tasks         : [],
        columnList    : [],
        result  : "",
        kanban  :{cellMarginBottom  : 0,}
      }
      const myMock = jest.fn(async() =>
          Kanban.methods.onFilter.apply(vm).then(function () {
            return vm.result;
          })
      );
      return myMock().then(function (result) {
        let condition = "/condition:idutilisateur:egal:"+1+":OR:idutilisateur:egal:"+2+":OR:idutilisateur:egal:"+3
        let default_url = Kanban.props.URI.default()+Kanban.props.API_KEY+condition;
        expect(result).toBe(default_url);
      });
    });
    it('Case three : User and Lock', () => {
        jest.spyOn(console, 'log').mockImplementation(jest.fn());
      const vm = {
        URI         : Kanban.props.URI.default(),
        API_KEY     : Kanban.props.API_KEY,
        allUsers    : allUsers,
        user        : [allUsers[1],allUsers[2],allUsers[3]], 
        lock        : "0", 
        priority    : priority[0], 
        isLoading : false,
        getQueryParam(){return Kanban.methods.getQueryParam.apply(vm); },
        setfilter(listArray, param){ return Kanban.methods.setfilter.apply(vm,[listArray, param]);},
        getKanbanItem : async (url) =>{
          Kanban.methods.getKanbanItem(url);
          vm.result=url;
        },
        loadSwimlane(){Kanban.methods.loadSwimlane.apply(vm)},
        addCreateButton(data){
          Kanban.methods.addCreateButton(data);
        },
        loadColumns(){Kanban.methods.loadColumns.apply(vm)},
        loadCards(){Kanban.methods.loadCards.apply(vm);},
        config        : config,
        tasks         : [],
        columnList    : [],
        result      : ""
      }
      const myMock = jest.fn(async() =>
          Kanban.methods.onFilter.apply(vm).then(function () {
            return vm.result;
          })
      );
      return myMock().then(function (result) {
        let condition = "/condition:idutilisateur:egal:"+2+":OR:idutilisateur:egal:"+3+":OR:idutilisateur:egal:"+4
                        +":separator:AND:condition:e_lock:egal:"+0;
        let default_url = Kanban.props.URI.default()+Kanban.props.API_KEY+condition;
        expect(result).toBe(default_url);
      });
    });
    it('Case Four : User and Priority', () => {
        jest.spyOn(console, 'log').mockImplementation(jest.fn());
      const vm = {
        URI         : Kanban.props.URI.default(),
        API_KEY     : Kanban.props.API_KEY,
        allUsers    : allUsers,
        user        : [allUsers[1],allUsers[2],allUsers[3]], 
        lock        : lock[0], 
        priority    : "1", 
        isLoading : false,
        getQueryParam(){return Kanban.methods.getQueryParam.apply(vm); },
        setfilter(listArray, param){ return Kanban.methods.setfilter.apply(vm,[listArray, param]);},
        getKanbanItem : async (url) =>{
          Kanban.methods.getKanbanItem(url);
          vm.result=url;
        },
        loadSwimlane(){Kanban.methods.loadSwimlane.apply(vm)},
        addCreateButton(data){
          Kanban.methods.addCreateButton(data);
        },
        loadColumns(){Kanban.methods.loadColumns.apply(vm)},
        loadCards(){Kanban.methods.loadCards.apply(vm);},
        config        : config,
        tasks         : [],
        columnList    : [],
        result      : ""
      }
      const myMock = jest.fn(async() =>
          Kanban.methods.onFilter.apply(vm).then(function () {
            return vm.result;
          })
      );
      return myMock().then(function (result) {
        let condition = "/condition:idutilisateur:egal:"+2+":OR:idutilisateur:egal:"+3+":OR:idutilisateur:egal:"+4
                        +":separator:AND:condition:priorite:egal:"+1;
        let default_url = Kanban.props.URI.default()+Kanban.props.API_KEY+condition;
        expect(result).toBe(default_url);
      });
    });
    it('Case Five : Lock and Priority No user', () => {
        jest.spyOn(console, 'log').mockImplementation(jest.fn());
      const vm = {
        URI         : Kanban.props.URI.default(),
        API_KEY     : Kanban.props.API_KEY,
        allUsers    : allUsers,
        user        : [], 
        lock        : "0", 
        priority    : "1", 
        isLoading : false,
        getQueryParam(){return Kanban.methods.getQueryParam.apply(vm); },
        setfilter(listArray, param){ return Kanban.methods.setfilter.apply(vm,[listArray, param]);},
        getKanbanItem : async (url) =>{
          Kanban.methods.getKanbanItem(url);
          vm.result=url;
        },
        loadSwimlane(){Kanban.methods.loadSwimlane.apply(vm)},
        addCreateButton(data){
          Kanban.methods.addCreateButton(data);
        },
        loadColumns(){Kanban.methods.loadColumns.apply(vm)},
        loadCards(){Kanban.methods.loadCards.apply(vm);},
        config        : config,
        tasks         : [],
        columnList    : [],
        result      : ""
      }
      const myMock = jest.fn(async() =>
          Kanban.methods.onFilter.apply(vm).then(function () {
            return vm.result;
          })
      );
      return myMock().then(function (result) {
        let condition = "/condition:e_lock:egal:"+0+":separator:AND:condition:priorite:egal:"+1;
        let default_url = Kanban.props.URI.default()+Kanban.props.API_KEY+condition;
        expect(result).toBe(default_url);
      });
    });
    it('Case Six : User, Lock and Priority', () => {
        jest.spyOn(console, 'log').mockImplementation(jest.fn());
      const vm = {
        URI         : Kanban.props.URI.default(),
        API_KEY     : Kanban.props.API_KEY,
        allUsers    : allUsers,
        user        : [allUsers[1],allUsers[2],allUsers[3]], 
        lock        : "0", 
        priority    : "1", 
        isLoading : false,
        getQueryParam(){return Kanban.methods.getQueryParam.apply(vm); },
        setfilter(listArray, param){ return Kanban.methods.setfilter.apply(vm,[listArray, param]);},
        getKanbanItem : async (url) =>{
          Kanban.methods.getKanbanItem(url);
          vm.result=url;
        },
        loadSwimlane(){Kanban.methods.loadSwimlane.apply(vm)},
        addCreateButton(data){
          Kanban.methods.addCreateButton(data);
        },
        loadColumns(){Kanban.methods.loadColumns.apply(vm)},
        loadCards(){Kanban.methods.loadCards.apply(vm);},
        config        : config,
        tasks         : [],
        columnList    : [],
        result      : ""
      }
      const myMock = jest.fn(async() =>
          Kanban.methods.onFilter.apply(vm).then(function () {
            return vm.result;
          })
      );
      return myMock().then(function (result) {
        let condition = "/condition:idutilisateur:egal:"+2+":OR:idutilisateur:egal:"+3+":OR:idutilisateur:egal:"+4
                        +":separator:AND:condition:e_lock:egal:"+0+":separator:AND:condition:priorite:egal:"+1;
        let default_url = Kanban.props.URI.default()+Kanban.props.API_KEY+condition;
        expect(result).toBe(default_url);
      });
    });
  });
  describe("Should redefined the swimlane order by asc", () => {
    jest.setTimeout(30000 * 60); // ms
    it('Case Seven : User, Lock and Priority', () => {
        // expect(0).toBeFalsy();
        jest.spyOn(console, 'log').mockImplementation(jest.fn());
        let allUsers= [
            {"name": "Administrateur","id": "1"},
            {"name": "user1","id": "2"},
            {"name": "user2","id": "3"},
            {"name": "user3","id": "4"},
            {"name": "user4","id": "5"},
            {"name": "Comptable","id": "6"}
        ]
        const vm = {
            URI         : Kanban.props.URI.default(),
            API_KEY     : Kanban.props.API_KEY,
            allUsers    : allUsers,
            user        : [allUsers[3],allUsers[1],allUsers[2]], 
            lock        : "0", 
            priority    : "1", 
            isLoading : false,
            getQueryParam(){return Kanban.methods.getQueryParam.apply(vm); },
            setfilter(listArray, param){ return Kanban.methods.setfilter.apply(vm,[listArray, param]);},
            getKanbanItem : async (url) =>{
                Kanban.methods.getKanbanItem(url);
                vm.result=url;
            },
            loadSwimlane(){Kanban.methods.loadSwimlane.apply(vm)},
            addCreateButton(data){
                Kanban.methods.addCreateButton(data);
            },
            loadColumns(){Kanban.methods.loadColumns.apply(vm)},
            loadCards(){Kanban.methods.loadCards.apply(vm);},
            config        : config,
            tasks         : [],
            columnList    : [],
            result      : ""
        }
        const myMock = jest.fn(async() =>
            Kanban.methods.onFilter.apply(vm).then(function () {
                return vm.config.swimlanes;
            })
        );
        return myMock().then(function (result) {
            // jest.spyOn(console, 'log').mockRestore();
            let user = [
            {"name": "user1","id": "2"},
            {"name": "user2","id": "3"},
            {"name": "user3","id": "4"},
            ]
            expect(result).toStrictEqual(user);
        });
    });
  });
});
// mounted()
describe("Function mounted", () => {
    it("It should be able to load all function inside", () => {
      jest.setTimeout(30000 * 60); // ms
      jest.spyOn(console, 'log').mockImplementation(jest.fn());
      const vm = {
        URI             : Kanban.props.URI.default(),
        API_KEY         : Kanban.props.API_KEY,
        idUtilisateurs  : Kanban.props.idUtilisateurs.default(),
        allUsers        : [],
        user            : [], 
        lock            : lock[0], 
        priority        : priority[0], 
        isLoading       : true,
        typeview        : Kanban.data().typeview,
        config          : config,
        tasks           : [],
        columnList      : [],
        itemsList       : [],
        itemSelected    : {},
        kanban          : {
                            cellMarginBottom  : 0,
                            columns : {
                                list: [],
                            }
                          },
        getAllUsers     : async () =>{Kanban.methods.getAllUsers.apply(vm);return vm;},
        getKanbanItem   : async () =>{
            jest.spyOn(console, 'log').mockImplementation(jest.fn());
            Kanban.methods.getKanbanItem.apply(vm);
            return vm;
        },
        loadSwimlane(){Kanban.methods.loadSwimlane.apply(vm);return vm;},
        addCreateButton(data){
            Kanban.methods.addCreateButton(data);
            return vm;
        },
        loadColumns(){Kanban.methods.loadColumns.apply(vm);return vm;},
        loadCards(){Kanban.methods.loadCards.apply(vm);return vm;},
        setColor : (type,data) => {Kanban.methods.setColor(type,data); return vm;},
        getItemsList   : async () =>{Kanban.methods.getItemsList.apply(vm);return vm;},
        compare        :( a, b )=>Kanban.methods.compare(a,b),
        getItemColumns   : async () =>{Kanban.methods.getItemColumns.apply(vm);return vm;},
      }
    //   jest.spyOn(console, 'log').mockRestore();
      const myMock = jest.fn(async() =>{
        await Kanban.mounted.apply(vm);
        return vm;
      });
      return myMock().then(function (result) {
        expect(result.isLoading).toBeFalsy();
        expect(result.kanban.cellMarginBottom).toBe(40);
      });
    });
});
// updateCalendar()
describe("Function updateCalendar", () => {
  jest.setTimeout(30000 * 60); // ms
  it('Should update the correct card with indicated characteristics', () => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
    const URL = Kanban.props.URI.default() + Kanban.props.API_KEY;
    const vm = {
        API_KEY         : Kanban.props.API_KEY,
        URI_ACTION      : URI_ACTION,
        URI             : Kanban.props.URI.default(),
        idUtilisateurs  : Kanban.props.idUtilisateurs.default(),
        allUsers        : [],
        user            : [], 
        lock            : lock[1], 
        priority        : priority[1], 
        isLoading       : true,
        typeview        : Kanban.data().typeview,
        config          : config,
        tasks           : [],
        columnList      : [],
        itemsList       : [],
        itemSelected    : {},
        kanban          : {cellMarginBottom  : 0, },
        getAllUsers     : async () =>{Kanban.methods.getAllUsers.apply(vm);return vm;},
        getKanbanItem   : async (url=URL, page=0) =>{
            return Kanban.methods.getKanbanItem.apply(vm,[url,page]).then(function () {
                return vm;
            })
        },
        loadSwimlane(){Kanban.methods.loadSwimlane.apply(vm); return vm;},
        addCreateButton(data){
            Kanban.methods.addCreateButton(data);
            return vm;
        },
        loadColumns(){Kanban.methods.loadColumns.apply(vm)},
        loadCards(){Kanban.methods.loadCards.apply(vm);},
        onFilter    : async () =>{Kanban.methods.onFilter.apply(vm);},
        getQueryParam(){return Kanban.methods.getQueryParam.apply(vm); },
        setfilter(listArray, param){ return Kanban.methods.setfilter.apply(vm,[listArray, param]);},
        result : ""
    }
    let events = {
      idaction: "2909",
      text: "MODIFY TEXT",
      lock: "1",
      swimlane: "1",
      barColor: "#9e5fff",
    };
    let allEvents = {
        list: [
            {
                "idaction": "2832",
                "id": 1,
                "name": "",
                "text": "Audit externe",
                "swimlane": "1",
                "column": "",
                "lock": "1",
                "barColor": "#668cd9",
                "priority": "0"
            },
            {
                "idaction": "2833",
                "id": 2,
                "name": "",
                "text": "Mise à  jour de Réunion  marketing",
                "swimlane": "1",
                "column": "",
                "lock": "0",
                "barColor": "#668cd9",
                "priority": "1"
            },
            {
                "idaction": "2836",
                "id": 3,
                "name": "",
                "text": "Mise à  jour de Réunion  marketing",
                "swimlane": "1",
                "column": "",
                "lock": "0",
                "barColor": "#668cd9",
                "priority": "0"
            },
            {
                "idaction": "2849",
                "id": 4,
                "name": "",
                "text": "Mise à  jour de Réunion",
                "swimlane": "1",
                "column": "40",
                "lock": "0",
                "barColor": "#668cd9",
                "priority": "0"
            },
            {
                "idaction": "2865",
                "id": 5,
                "name": "",
                "text": "Réunion avec les partenaires internationaux",
                "swimlane": "1",
                "column": "",
                "lock": "0",
                "barColor": "#668cd9",
                "priority": "0"
            },
            {
                "idaction": "2866",
                "id": 6,
                "name": "",
                "text": "Réunion avec les partenaires internationaux",
                "swimlane": "1",
                "column": "",
                "lock": "0",
                "barColor": "#668cd9",
                "priority": "0"
            },
            {
                "idaction": "2867",
                "id": 7,
                "name": "",
                "text": "Mise à  jour de Réunion  marketing",
                "swimlane": "1",
                "column": "",
                "lock": "0",
                "barColor": "#668cd9",
                "priority": "0"
            },
            {
                "idaction": "2909",
                "id": 8,
                "name": "",
                "text": "Mise à  jour de Réunion  marketing",
                "swimlane": "1",
                "column": "",
                "lock": "0",
                "barColor": "#668cd9",
                "priority": "0"
            },
            {
                "idaction": "2912",
                "id": 9,
                "name": "",
                "text": "New Réunion avec les partenaires internationaux",
                "swimlane": "1",
                "column": "",
                "lock": "0",
                "barColor": "#668cd9",
                "priority": "0"
            },
            {
                "idaction": "2913",
                "id": 10,
                "name": "",
                "text": "Mise à  jour de Réunion  marketing",
                "swimlane": "1",
                "column": "",
                "lock": "0",
                "barColor": "#668cd9",
                "priority": "0"
            },
            {
                "idaction": "2915",
                "id": 11,
                "name": "",
                "text": "Mise à  jour de Réunion  marketing",
                "swimlane": "1",
                "column": "",
                "lock": "0",
                "barColor": "#668cd9",
                "priority": "0"
            },
            {
                "idaction": "2916",
                "id": 12,
                "name": "",
                "text": "planche",
                "swimlane": "1",
                "column": "",
                "lock": "0",
                "barColor": "#668cd9",
                "priority": "0"
            },
            {
                "idaction": "2917",
                "id": 13,
                "name": "",
                "text": "Mise à  jour de Réunion  marketing",
                "swimlane": "1",
                "column": "",
                "lock": "0",
                "barColor": "#668cd9",
                "priority": "0"
            },
            {
                "idaction": "2918",
                "id": 14,
                "name": "",
                "text": "New Réunion avec les partenaires internationaux",
                "swimlane": "1",
                "column": "",
                "lock": "0",
                "barColor": "#668cd9",
                "priority": "0"
            },
            {
                "idaction": "2919",
                "id": 15,
                "name": "",
                "text": "New Réunion avec les partenaires internationaux",
                "swimlane": "1",
                "column": "",
                "lock": "0",
                "barColor": "#668cd9",
                "priority": "0"
            },
            {
                "idaction": "2920",
                "id": 16,
                "name": "",
                "text": "New Réunion avec les partenaires internationaux",
                "swimlane": "1",
                "column": "",
                "lock": "0",
                "barColor": "#668cd9",
                "priority": "0"
            },
            {
                "idaction": "2921",
                "id": 17,
                "name": "",
                "text": "New Réunion avec les partenaires internationaux",
                "swimlane": "1",
                "column": "",
                "lock": "0",
                "barColor": "#668cd9",
                "priority": "0"
            }
        ],
        update(event){
            for (let index = 0; index < allEvents.list.length; index++) {
            const element = allEvents.list[index];
            if(element.idaction===event.idaction){
                let result={
                    text:event.text,
                    idaction: event.idaction,
                    lock:event.lock,
                    swimlane:event.swimlane,
                    barColor:event.barColor
                    }
                    allEvents.list[index] = result;
                    vm.result=index
                }
            }
        }
    }
    // let allEvents = Kanban.cards;
    // jest.spyOn(console, 'log').mockRestore();
    const myMock = jest.fn(async() =>
        Kanban.methods.updateCalendar.apply(vm,[events,allEvents]).then(function () {
            return allEvents.list[vm.result];
        })
    );
    return myMock().then(function (result) {
      expect(result).toStrictEqual(events);
    });
  });
  it("Shouldn't update", () => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
    const vm = {
        API_KEY         : "",
        URI_ACTION      : URI_ACTION,
        URI             : Kanban.props.URI.default(),
        idUtilisateurs  : Kanban.props.idUtilisateurs.default(),
        allUsers        : [],
        user            : [], 
        lock            : lock[1], 
        priority        : priority[1], 
        isLoading       : true,
        typeview        : Kanban.data().typeview,
        config          : config,
        tasks           : [],
        columnList      : [],
        itemsList       : [],
        itemSelected    : {},
        kanban          : {cellMarginBottom  : 0, },
        getAllUsers     : async () =>{Kanban.methods.getAllUsers.apply(vm);return vm;},
        getKanbanItem   : async () =>{Kanban.methods.getKanbanItem.apply(vm);return vm;},
        loadSwimlane(){Kanban.methods.loadSwimlane.apply(vm)},
        addCreateButton(data){
            Kanban.methods.addCreateButton(data);
            return vm;
        },
        loadColumns(){Kanban.methods.loadColumns.apply(vm)},
        loadCards(){Kanban.methods.loadCards.apply(vm);},
        onFilter    : async () =>{Kanban.methods.onFilter.apply(vm);return vm;},
        getQueryParam(){return Kanban.methods.getQueryParam.apply(vm); },
        setfilter(listArray, param){ return Kanban.methods.setfilter.apply(vm,[listArray, param]);},
        result : "Unable to fetch"
    };
    let events = {
      idaction: "2725",
      text: "Création de(s) tâche(s)",
      lock: "1",
      swimlane: "1",
      barColor: "#9e5fff",
    };
    let allEvents = {
      list: [
          {
              "idaction": "2710",
              "id": 1,
              "name": "",
              "text": "Tache modifiée a 10h25",
              "swimlane": "1",
              "column": "1",
              "lock": "0",
              "barColor": "#9e5fff",
              "priority": "0",
              "areas": [
                  {
                      "right": 0,
                      "top": 6,
                      "width": 20,
                      "height": 20,
                      "icon": "fas fa-chevron-down",
                      "style": "text-align:center"
                  }
              ]
          },
          {
              "idaction": "2725",
              "id": 2,
              "name": "",
              "text": "Création de tâches",
              "swimlane": "1",
              "column": "1",
              "lock": "0",
              "barColor": "#9e5fff",
              "priority": "0",
              "areas": [
                  {
                      "right": 0,
                      "top": 6,
                      "width": 20,
                      "height": 20,
                      "icon": "fas fa-chevron-down",
                      "style": "text-align:center"
                  }
              ]
          },
          {
              "idaction": "2726",
              "id": 3,
              "name": "",
              "text": "Planification des tâches",
              "swimlane": "1",
              "column": "1",
              "lock": "0",
              "barColor": "#00a9ff",
              "priority": "0",
              "areas": [
                  {
                      "right": 0,
                      "top": 6,
                      "width": 20,
                      "height": 20,
                      "icon": "fas fa-chevron-down",
                      "style": "text-align:center"
                  }
              ]
          },
          {
              "idaction": "2728",
              "id": 4,
              "name": "",
              "text": "test 2",
              "swimlane": "1",
              "column": "1",
              "lock": "0",
              "barColor": "#9e5fff",
              "priority": "0",
              "areas": [
                  {
                      "right": 0,
                      "top": 6,
                      "width": 20,
                      "height": 20,
                      "icon": "fas fa-chevron-down",
                      "style": "text-align:center"
                  }
              ]
          },
          {
              "idaction": "2729",
              "id": 5,
              "name": "",
              "text": "Simple CRM",
              "swimlane": "1",
              "column": "1",
              "lock": "0",
              "barColor": "#9e5fff",
              "priority": "0",
              "areas": [
                  {
                      "right": 0,
                      "top": 6,
                      "width": 20,
                      "height": 20,
                      "icon": "fas fa-chevron-down",
                      "style": "text-align:center"
                  }
              ]
          },
          {
              "idaction": "2732",
              "id": 6,
              "name": "",
              "text": "Réunion avec les partenaires internationaux",
              "swimlane": "1",
              "column": "1",
              "lock": "0",
              "barColor": "#9e5fff",
              "priority": "0",
              "areas": [
                  {
                      "right": 0,
                      "top": 6,
                      "width": 20,
                      "height": 20,
                      "icon": "fas fa-chevron-down",
                      "style": "text-align:center"
                  }
              ]
          },
          {
              "idaction": "2738",
              "id": 7,
              "name": "",
              "text": "Réunion avec les partenaires internationaux",
              "swimlane": "1",
              "column": "1",
              "lock": "0",
              "barColor": "#9e5fff",
              "priority": "0",
              "areas": [
                  {
                      "right": 0,
                      "top": 6,
                      "width": 20,
                      "height": 20,
                      "icon": "fas fa-chevron-down",
                      "style": "text-align:center"
                  }
              ]
          },
          {
              "idaction": "2763",
              "id": 8,
              "name": "",
              "text": "Réunion avec les partenaires internationaux",
              "swimlane": "1",
              "column": "1",
              "lock": "0",
              "barColor": "#9e5fff",
              "priority": "0",
              "areas": [
                  {
                      "right": 0,
                      "top": 6,
                      "width": 20,
                      "height": 20,
                      "icon": "fas fa-chevron-down",
                      "style": "text-align:center"
                  }
              ]
          },
          {
              "idaction": "2765",
              "id": 9,
              "name": "",
              "text": "Nouvelle tache ",
              "swimlane": "1",
              "column": "1",
              "lock": "0",
              "barColor": "#9e5fff",
              "priority": "0",
              "areas": [
                  {
                      "right": 0,
                      "top": 6,
                      "width": 20,
                      "height": 20,
                      "icon": "fas fa-chevron-down",
                      "style": "text-align:center"
                  }
              ]
          },
          {
              "idaction": "2767",
              "id": 10,
              "name": "",
              "text": "nouvelle tache de gantt ",
              "swimlane": "1",
              "column": "1",
              "lock": "0",
              "barColor": "#9e5fff",
              "priority": "0",
              "areas": [
                  {
                      "right": 0,
                      "top": 6,
                      "width": 20,
                      "height": 20,
                      "icon": "fas fa-chevron-down",
                      "style": "text-align:center"
                  }
              ]
          },
          {
              "idaction": "2770",
              "id": 11,
              "name": "",
              "text": "pomme",
              "swimlane": "1",
              "column": "1",
              "lock": "0",
              "barColor": "#9e5fff",
              "priority": "0",
              "areas": [
                  {
                      "right": 0,
                      "top": 6,
                      "width": 20,
                      "height": 20,
                      "icon": "fas fa-chevron-down",
                      "style": "text-align:center"
                  }
              ]
          },
          {
              "idaction": "2730",
              "id": 12,
              "name": "",
              "text": "Simple CRM",
              "swimlane": "4",
              "column": "1",
              "lock": "0",
              "barColor": "#9e5fff",
              "priority": "0",
              "areas": [
                  {
                      "right": 0,
                      "top": 6,
                      "width": 20,
                      "height": 20,
                      "icon": "fas fa-chevron-down",
                      "style": "text-align:center"
                  }
              ]
          }
      ],
      update(event){
        for (let index = 0; index < allEvents.list.length; index++) {
          const element = allEvents.list[index];
          if(element.idaction===event.idaction){
            let result={
              text:event.text,
              idaction: event.idaction,
              lock:event.lock,
              swimlane:event.swimlane,
              barColor:event.barColor
            }
            allEvents.list[index] = result;
            vm.result=index
          }
        }
      }
    }
    // let allEvents = Kanban.cards;
    // jest.spyOn(console, 'log').mockRestore();
    const myMock = jest.fn(async() =>
      Kanban.methods.updateCalendar.apply(vm,[events,allEvents]).then(function () {
        console.log("REAL RESULT IS :", vm.result);
        return vm.result;
      })
    );
    // jest.spyOn(console, 'log').mockRestore();
    console.log("BEFORE BEGIN  RESULT WAS :", vm.result);
    console.log("Unable to fetch begin");
    return myMock().then(function (result) {
      console.log("Result should be unable to fetch :", result)
      expect(result).toBe("Unable to fetch");
    });
  });
});
// show()
describe("Function show", () => {
  jest.setTimeout(30000 * 60); // ms
  it('Should return "is-active" for showing when it is "" ', () => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
    const vm = {
        showing : "",
        showingItems : "",
    };
    // let allEvents = Kanban.cards;
    const myMock = jest.fn(() =>{
        Kanban.methods.show.apply(vm,['users',vm.showing]);
        return vm;
      }
    );
    // jest.spyOn(console, 'log').mockRestore();
    let result = myMock();
    expect(result.showing).toBe("is-active");
    expect(result.showingItems).toBe("");
  });
  it('Should return "" for showingItems when it is "is-active" ', () => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
    const vm = {showingItems : "is-active",showing : ""}
    // let allEvents = Kanban.cards;
    const myMock = jest.fn(() =>{
        Kanban.methods.show.apply(vm,['items',vm.showingItems]);
        return vm;
      }
    );
    // jest.spyOn(console, 'log').mockRestore();
    let result = myMock();
    expect(result.showing).toBe("");
    expect(result.showingItems).toBe("");
  });
});
//setView(item)
describe("Function setView", (item) => {
  jest.setTimeout(30000 * 60); // ms
  it('Should set all tasks barcolor with selected item color and close the item list', () => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
    let allUsers= [
        {"name": "Administrateur","id": "1"},
        {"name": "user1","id": "2"},
        {"name": "user2","id": "3"},
        {"name": "user3","id": "4"},
        {"name": "user4","id": "5"},
        {"name": "Comptable","id": "6"}
    ];
    let arrayFilter = [
      {color: "#2251ff" ,title: "Par défaut",},
      {color: "#ffcedf0",title: "Par Etat",},
      {color: "#25ffcd" ,title: "Par priorité",},
      {color: "#de452a" ,title: "Par utilisateur",},
      {color: "#cdee00" ,title: "Par type",},
    ];
    const vm = {
        URI         : Kanban.props.URI.default(),
        API_KEY     : Kanban.props.API_KEY,
        typeview    : Kanban.data().typeview,
        isLoading   : false,
        allUsers    : allUsers,
        user        : [allUsers[0]], 
        lock        : lock[0], 
        priority    : priority[0], 
        config      : config,
        columnList  : [],
        kanban      : {
            cards : {
            list : [
                {barColor: "#ffo"},
                {barColor: "#ff1"},
                {barColor: "#ff2"},
                {barColor: "#ff3"},
                {barColor: "#ff4"},
            ]
            }
        },
        showing     : "is-active",
        getQueryParam(){
            jest.spyOn(console, 'log').mockImplementation(jest.fn());
            return Kanban.methods.getQueryParam.apply(vm); 
        },
        setfilter(listArray, param){ return Kanban.methods.setfilter.apply(vm,[listArray, param]);},
        show            : (element,value) => {Kanban.methods.show.apply(vm,[element,value]); return vm;},
        onFilter        : async () =>{Kanban.methods.onFilter.apply(vm);return vm;},
        getKanbanItem   : async () =>{Kanban.methods.getKanbanItem.apply(vm);return vm;},
        loadSwimlane(){Kanban.methods.loadSwimlane.apply(vm);return vm;},
        addCreateButton(data){
            Kanban.methods.addCreateButton(data);
            return vm;
        },
        loadColumns(){Kanban.methods.loadColumns.apply(vm);return vm;},
        loadCards(){Kanban.methods.loadCards.apply(vm);return vm;},
        setColor        : (type,data) => {Kanban.methods.setColor(type,data); return vm;},
        getItemsList    : async () =>{Kanban.methods.getItemsList.apply(vm);return vm;},
        compare        :( a, b )=>Kanban.methods.compare(a,b),
        getItemColumns  : async () =>{Kanban.methods.getItemColumns.apply(vm);return vm;},
    }
    // let allEvents = Kanban.cards;
    const myMock = jest.fn(async() =>{
        Kanban.methods.setView.apply(vm,[arrayFilter[1]]);
        return vm;
      }
    );
    // jest.spyOn(console, 'log').mockRestore();
    return myMock().then(function (results) {
        expect(results.isLoading).toBeFalsy();
    });
  });
});
describe("TEST CODE", () => {
  let index=0;
  const myObj = {
    doSomething() {
      console.log('does something');
      index++;
    }
  };
  test('spyOn .toBeCalled()', () => {
    const somethingSpy = jest.spyOn(myObj, 'doSomething');
    myObj.doSomething();
    jest.spyOn(console, 'log').mockRestore();
    console.log(`Index ${index}`);
    expect(somethingSpy).toBeCalled();
  });
});