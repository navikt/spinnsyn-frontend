import {
    annullert,
    avvistPerson,
    direkteUtenKontonummerPerson,
    diverseData,
    eldgammelt,
    etVedtakFlereArbeidsgivere,
    kombinasjonPerson,
    kunDirektePerson,
    Persona,
    slutterMedDelvisRefusjon,
    utenData,
} from './data/personas'
import { kunAgPeriode } from './data/rs-vedtak'

export interface StringFunctionMap {
    [index: string]: () => Persona
}

export const personas: StringFunctionMap = {
    'uten-data': () => utenData,
    'diverse-data': () => diverseData,
    'et-vedtak-flere-arbeidsgivere': () => etVedtakFlereArbeidsgivere,
    'annulert-og-overført-infotrygd': () => annullert,
    'veldig-gammelt-vedtak': () => eldgammelt,
    'delvis-og-helt-avviste-vedtak': () => avvistPerson,
    'kun-direkte': () => kunDirektePerson,
    'direkte-uten-kontonummer': () => direkteUtenKontonummerPerson,
    kombinasjon: () => kombinasjonPerson,
    'kun-ag-periode': () => ({ vedtak: [kunAgPeriode] }),
    'slutter-med-delvis-refusjon': () => slutterMedDelvisRefusjon,
}
