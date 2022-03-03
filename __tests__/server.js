// src/server.js
import { createServer, Model } from "miragejs";
import mockData from "../src/services/mocks/data/mockData.json";

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      interaction: Model,
    },

    seeds(server) {
      mockData.forEach((data) => {
        server.create("interaction", {
          inter_cust1: {
            title: data.inter_cust1.title,
            value: data.inter_cust1.value,
          },
          inter_cust2: {
            title: data.inter_cust2.title,
            value: data.inter_cust2.value,
          },
          inter_cust3: {
            title: data.inter_cust3.title,
            value: data.inter_cust3.value,
          },
          inter_cust4: {
            title: data.inter_cust4.title,
            value: data.inter_cust4.value,
          },
          inter_cust5: {
            title: data.inter_cust5.title,
            value: data.inter_cust5.value,
          },
          inter_cust6: {
            title: data.inter_cust6.title,
            value: data.inter_cust6.value,
          },
          inter_cust7: {
            title: data.inter_cust7.title,
            value: data.inter_cust7.value,
          },
          inter_cust8: {
            title: data.inter_cust8.title,
            value: data.inter_cust8.value,
          },
          inter_cust9: {
            title: data.inter_cust9.title,
            value: data.inter_cust9.value,
          },
          inter_cust10: {
            title: data.inter_cust10.title,
            value: data.inter_cust10.value,
          },
          inter_cust11: {
            title: data.inter_cust11.title,
            value: data.inter_cust11.value,
          },
          inter_cust12: {
            title: data.inter_cust12.title,
            value: data.inter_cust12.value,
          },
          inter_cust13: {
            title: data.inter_cust13.title,
            value: data.inter_cust13.value,
          },
          inter_cust14: {
            title: data.inter_cust14.title,
            value: data.inter_cust14.value,
          },
          inter_cust15: {
            title: data.inter_cust15.title,
            value: data.inter_cust15.value,
          },
          inter_cust16: {
            title: data.inter_cust16.title,
            value: data.inter_cust16.value,
          },
          inter_cust17: {
            title: data.inter_cust17.title,
            value: data.inter_cust17.value,
          },
          inter_cust18: {
            title: data.inter_cust18.title,
            value: data.inter_cust18.value,
          },
          inter_cust19: {
            title: data.inter_cust19.title,
            value: data.inter_cust19.value,
          },
          inter_cust20: {
            title: data.inter_cust20.title,
            value: data.inter_cust20.value,
          },
          inter_cust21: {
            title: data.inter_cust21.title,
            value: data.inter_cust21.value,
          },
          inter_cust22: {
            title: data.inter_cust22.title,
            value: data.inter_cust22.value,
          },
          inter_cust23: {
            title: data.inter_cust23.title,
            value: data.inter_cust23.value,
          },
          inter_cust24: {
            title: data.inter_cust24.title,
            value: data.inter_cust24.value,
          },
          idaction: {
            title: data.idaction.title,
            value: data.idaction.value,
          },
          uuid_action: {
            title: data.uuid_action.title,
            value: data.uuid_action.value,
          },
          idutilisateur: {
            title: data.idutilisateur.title,
            value: data.idutilisateur.value,
          },
          uuid_utilisateur: {
            title: data.uuid_utilisateur.title,
            value: data.uuid_utilisateur.value,
          },
          idcontact: {
            title: data.idcontact.title,
            value: data.idcontact.value,
          },
          idsociete: {
            title: data.idsociete.title,
            value: data.idsociete.value,
          },
          idprojet: {
            title: data.idprojet.title,
            value: data.idprojet.value,
          },
          date_mod: {
            title: data.date_mod.title,
            value: data.date_mod.value,
          },
          date_action: {
            title: data.date_action.title,
            value: data.date_action.value,
          },
          duree_heures: {
            title: data.duree_heures.title,
            value: data.duree_heures.value,
          },
          duree_minutes: {
            title: data.duree_minutes.title,
            value: data.duree_minutes.value,
          },
          date_fin: {
            title: data.date_fin.title,
            value: data.date_fin.value,
          },
          date_echeance: {
            title: data.date_echeance.title,
            value: data.date_echeance.value,
          },
          date_stat: {
            title: data.date_stat.title,
            value: data.date_stat.value,
          },
          color: {
            title: data.color.title,
            value: data.color.value,
          },
          sujet: {
            title: data.sujet.title,
            value: data.sujet.value,
          },
          location: {
            title: data.location.title,
            value: data.location.value,
          },
          idmedia: {
            title: data.idmedia.title,
            value: data.idmedia.value,
          },
          idtype_action: {
            title: data.idtype_action.title,
            value: data.idtype_action.value,
          },
          iddocument_type: {
            title: data.iddocument_type.title,
            value: data.iddocument_type.value,
          },
          idsuivi_facture: {
            title: data.idsuivi_facture.title,
            value: data.idsuivi_facture.value,
          },
          budget: {
            title: data.budget.title,
            value: data.budget.value,
          },
          budget_pondere: {
            title: data.budget_pondere.title,
            value: data.budget_pondere.value,
          },
          source: {
            title: data.source.title,
            value: data.source.value,
          },
          ref_document: {
            title: data.ref_document.title,
            value: data.ref_document.value,
          },
          note: {
            title: data.note.title,
            value: data.note.value,
          },
          etape_suivante: {
            title: data.etape_suivante.title,
            value: data.etape_suivante.value,
          },
          etat: {
            title: data.etat.title,
            value: data.etat.value,
          },
          all_day: {
            title: data.all_day.title,
            value: data.all_day.value,
          },
          recurring_rule: {
            title: data.recurring_rule.title,
            value: data.recurring_rule.value,
          },
          priorite: {
            title: data.priorite.title,
            value: data.priorite.value,
          },
          ss_datetime: {
            title: data.ss_datetime.title,
            value: data.ss_datetime.value,
          },
          ss_status: {
            title: data.ss_status.title,
            value: data.ss_status.value,
          },
          idaction_parent: {
            title: data.idaction_parent.title,
            value: data.idaction_parent.value,
          },
          livrable: {
            title: data.livrable.title,
            value: data.livrable.value,
          },
          droits: {
            title: data.droits.title,
            value: data.droits.value,
          },
          type_id: {
            title: data.type_id.title,
            value: data.type_id.value,
          },
          gross: {
            title: data.gross.title,
            value: data.gross.value,
          },
          tax_amount: {
            title: data.tax_amount.title,
            value: data.tax_amount.value,
          },
          total: {
            title: data.total.title,
            value: data.total.value,
          },
          e_lock: {
            title: data.e_lock.title,
            value: data.e_lock.value,
          },
          e_idaction_from: {
            title: data.e_idaction_from.title,
            value: data.e_idaction_from.value,
          },
          e_modele_id: {
            title: data.e_modele_id.title,
            value: data.e_modele_id.value,
          },
          e_stock_genere: {
            title: data.e_stock_genere.title,
            value: data.e_stock_genere.value,
          },
          e_doc_genere: {
            title: data.e_doc_genere.title,
            value: data.e_doc_genere.value,
          },
          e_facture_genere: {
            title: data.e_facture_genere.title,
            value: data.e_facture_genere.value,
          },
          e_bl_genere: {
            title: data.e_bl_genere.title,
            value: data.e_bl_genere.value,
          },
          e_commande_fournisseur_genere: {
            title: data.e_commande_fournisseur_genere.title,
            value: data.e_commande_fournisseur_genere.value,
          },
          e_vente_gagnee_genere: {
            title: data.e_vente_gagnee_genere.title,
            value: data.e_vente_gagnee_genere.value,
          },
          e_biller_id: {
            title: data.e_biller_id.title,
            value: data.e_biller_id.value,
          },
          paiement_txt: {
            title: data.paiement_txt.title,
            value: data.paiement_txt.value,
          },
          e_rappel_facture_envoye: {
            title: data.e_rappel_facture_envoye.title,
            value: data.e_rappel_facture_envoye.value,
          },
          idaction_recurrence: {
            title: data.idaction_recurrence.title,
            value: data.idaction_recurrence.value,
          },
          temps_passe_heures: {
            title: data.temps_passe_heures.title,
            value: data.temps_passe_heures.value,
          },
          temps_passe_minutes: {
            title: data.temps_passe_minutes.title,
            value: data.temps_passe_minutes.value,
          },
          idfeedback: {
            title: data.idfeedback.title,
            value: data.idfeedback.value,
          },
          total_paiement: {
            title: data.total_paiement.title,
            value: data.total_paiement.value,
          },
          total_reste: {
            title: data.total_reste.title,
            value: data.total_reste.value,
          },
          e_avoir_genere: {
            title: data.e_avoir_genere.title,
            value: data.e_avoir_genere.value,
          },
          rappel_envoye: {
            title: data.rappel_envoye.title,
            value: data.rappel_envoye.value,
          },
          date_paiement: {
            title: data.date_paiement.title,
            value: data.date_paiement.value,
          },
          date_bak: {
            title: data.date_bak.title,
            value: data.date_bak.value,
          },
          note_html: {
            title: data.note_html.title,
            value: data.note_html.value,
          },
          texte_paiement: {
            title: data.texte_paiement.title,
            value: data.texte_paiement.value,
          },
          bloc_haut: {
            title: data.bloc_haut.title,
            value: data.bloc_haut.value,
          },
          bloc_bas: {
            title: data.bloc_bas.title,
            value: data.bloc_bas.value,
          },
          bloc_total: {
            title: data.bloc_total.title,
            value: data.bloc_total.value,
          },
          bloc_bis: {
            title: data.bloc_bis.title,
            value: data.bloc_bis.value,
          },
          sdoc_nomfichier: {
            title: data.sdoc_nomfichier.title,
            value: data.sdoc_nomfichier.value,
          },
          inter_cust25: {
            title: data.inter_cust25.title,
            value: data.inter_cust25.value,
          },
          inter_cust26: {
            title: data.inter_cust26.title,
            value: data.inter_cust26.value,
          },
          inter_cust27: {
            title: data.inter_cust27.title,
            value: data.inter_cust27.value,
          },
          inter_cust28: {
            title: data.inter_cust28.title,
            value: data.inter_cust28.value,
          },
          inter_cust29: {
            title: data.inter_cust29.title,
            value: data.inter_cust29.value,
          },
          inter_cust30: {
            title: data.inter_cust30.title,
            value: data.inter_cust30.value,
          },
          inter_cust31: {
            title: data.inter_cust31.title,
            value: data.inter_cust31.value,
          },
          inter_cust32: {
            title: data.inter_cust32.title,
            value: data.inter_cust32.value,
          },
          inter_cust33: {
            title: data.inter_cust33.title,
            value: data.inter_cust33.value,
          },
          inter_cust34: {
            title: data.inter_cust34.title,
            value: data.inter_cust34.value,
          },
          inter_cust35: {
            title: data.inter_cust35.title,
            value: data.inter_cust35.value,
          },
          inter_cust36: {
            title: data.inter_cust36.title,
            value: data.inter_cust36.value,
          },
          inter_cust37: {
            title: data.inter_cust37.title,
            value: data.inter_cust37.value,
          },
          inter_cust38: {
            title: data.inter_cust38.title,
            value: data.inter_cust38.value,
          },
          inter_cust39: {
            title: data.inter_cust39.title,
            value: data.inter_cust39.value,
          },
          inter_cust40: {
            title: data.inter_cust40.title,
            value: data.inter_cust40.value,
          },
          inter_cust41: {
            title: data.inter_cust41.title,
            value: data.inter_cust41.value,
          },
          inter_cust42: {
            title: data.inter_cust42.title,
            value: data.inter_cust42.value,
          },
          inter_cust43: {
            title: data.inter_cust43.title,
            value: data.inter_cust43.value,
          },
          inter_cust44: {
            title: data.inter_cust44.title,
            value: data.inter_cust44.value,
          },
          inter_cust45: {
            title: data.inter_cust45.title,
            value: data.inter_cust45.value,
          },
          inter_cust46: {
            title: data.inter_cust46.title,
            value: data.inter_cust46.value,
          },
          inter_cust47: {
            title: data.inter_cust47.title,
            value: data.inter_cust47.value,
          },
          inter_cust48: {
            title: data.inter_cust48.title,
            value: data.inter_cust48.value,
          },
          inter_cust49: {
            title: data.inter_cust49.title,
            value: data.inter_cust49.value,
          },
          inter_cust50: {
            title: data.inter_cust50.title,
            value: data.inter_cust50.value,
          },
          inter_cust51: {
            title: data.inter_cust51.title,
            value: data.inter_cust51.value,
          },
          inter_cust52: {
            title: data.inter_cust52.title,
            value: data.inter_cust52.value,
          },
          inter_cust53: {
            title: data.inter_cust53.title,
            value: data.inter_cust53.value,
          },
          inter_cust54: {
            title: data.inter_cust54.title,
            value: data.inter_cust54.value,
          },
          inter_cust55: {
            title: data.inter_cust55.title,
            value: data.inter_cust55.value,
          },
          inter_cust56: {
            title: data.inter_cust56.title,
            value: data.inter_cust56.value,
          },
          inter_cust57: {
            title: data.inter_cust57.title,
            value: data.inter_cust57.value,
          },
          inter_cust58: {
            title: data.inter_cust58.title,
            value: data.inter_cust58.value,
          },
          inter_cust59: {
            title: data.inter_cust59.title,
            value: data.inter_cust59.value,
          },
          inter_cust60: {
            title: data.inter_cust60.title,
            value: data.inter_cust60.value,
          },
          inter_cust61: {
            title: data.inter_cust61.title,
            value: data.inter_cust61.value,
          },
          inter_cust62: {
            title: data.inter_cust62.title,
            value: data.inter_cust62.value,
          },
          inter_cust63: {
            title: data.inter_cust63.title,
            value: data.inter_cust63.value,
          },
          inter_cust64: {
            title: data.inter_cust64.title,
            value: data.inter_cust64.value,
          },
          inter_cust65: {
            title: data.inter_cust65.title,
            value: data.inter_cust65.value,
          },
          inter_cust66: {
            title: data.inter_cust66.title,
            value: data.inter_cust66.value,
          },
          inter_cust67: {
            title: data.inter_cust67.title,
            value: data.inter_cust67.value,
          },
          inter_cust68: {
            title: data.inter_cust68.title,
            value: data.inter_cust68.value,
          },
          inter_cust69: {
            title: data.inter_cust69.title,
            value: data.inter_cust69.value,
          },
          inter_cust70: {
            title: data.inter_cust70.title,
            value: data.inter_cust70.value,
          },
          inter_cust71: {
            title: data.inter_cust71.title,
            value: data.inter_cust71.value,
          },
          inter_cust72: {
            title: data.inter_cust72.title,
            value: data.inter_cust72.value,
          },
          inter_cust73: {
            title: data.inter_cust73.title,
            value: data.inter_cust73.value,
          },
          inter_cust74: {
            title: data.inter_cust74.title,
            value: data.inter_cust74.value,
          },
          inter_cust75: {
            title: data.inter_cust75.title,
            value: data.inter_cust75.value,
          },
          inter_cust76: {
            title: data.inter_cust76.title,
            value: data.inter_cust76.value,
          },
          inter_cust77: {
            title: data.inter_cust77.title,
            value: data.inter_cust77.value,
          },
          inter_cust78: {
            title: data.inter_cust78.title,
            value: data.inter_cust78.value,
          },
          inter_cust79: {
            title: data.inter_cust79.title,
            value: data.inter_cust79.value,
          },
          inter_cust80: {
            title: data.inter_cust80.title,
            value: data.inter_cust80.value,
          },
          inter_cust81: {
            title: data.inter_cust81.title,
            value: data.inter_cust81.value,
          },
          inter_cust82: {
            title: data.inter_cust82.title,
            value: data.inter_cust82.value,
          },
          inter_cust83: {
            title: data.inter_cust83.title,
            value: data.inter_cust83.value,
          },
          inter_cust84: {
            title: data.inter_cust84.title,
            value: data.inter_cust84.value,
          },
          inter_cust85: {
            title: data.inter_cust85.title,
            value: data.inter_cust85.value,
          },
          inter_cust86: {
            title: data.inter_cust86.title,
            value: data.inter_cust86.value,
          },
          inter_cust87: {
            title: data.inter_cust87.title,
            value: data.inter_cust87.value,
          },
          inter_cust88: {
            title: data.inter_cust88.title,
            value: data.inter_cust88.value,
          },
          inter_cust89: {
            title: data.inter_cust89.title,
            value: data.inter_cust89.value,
          },
          inter_cust90: {
            title: data.inter_cust90.title,
            value: data.inter_cust90.value,
          },
          inter_cust91: {
            title: data.inter_cust91.title,
            value: data.inter_cust91.value,
          },
          inter_cust92: {
            title: data.inter_cust92.title,
            value: data.inter_cust92.value,
          },
          inter_cust93: {
            title: data.inter_cust93.title,
            value: data.inter_cust93.value,
          },
          inter_cust94: {
            title: data.inter_cust94.title,
            value: data.inter_cust94.value,
          },
          inter_cust95: {
            title: data.inter_cust95.title,
            value: data.inter_cust95.value,
          },
          inter_cust96: {
            title: data.inter_cust96.title,
            value: data.inter_cust96.value,
          },
          inter_cust97: {
            title: data.inter_cust97.title,
            value: data.inter_cust97.value,
          },
          inter_cust98: {
            title: data.inter_cust98.title,
            value: data.inter_cust98.value,
          },
          inter_cust99: {
            title: data.inter_cust99.title,
            value: data.inter_cust99.value,
          },
          inter_cust100: {
            title: data.inter_cust100.title,
            value: data.inter_cust100.value,
          },
        });
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/interactions", (schema) => {
        return schema.interactions.all();
      });
    },
  });

  return server;
}
