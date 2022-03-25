import {
    annullert,
    avvistPerson,
    diverseData,
    eldgammelt, etVedtakFlereArbeidsgivere,
    kombinasjonPerson,
    kunDirektePerson,
    Persona, utenData
} from './data/personas'
import { kunAgPeriode } from './data/rs-vedtak'

export interface StringFunctionMap {
    [ index: string ]: () => Persona;
}

export const personas: StringFunctionMap = {
    'uten-data': () => utenData,
    'diverse-data': () => diverseData,
    'et-vedtak-flere-arbeidsgivere': () => etVedtakFlereArbeidsgivere,
    'annulert-og-overført-infotrygd': () => annullert,
    'veldig-gammelt-vedtak': () => eldgammelt,
    'delvis-og-helt-avviste-vedtak': () => avvistPerson,
    'kun-direkte': () => kunDirektePerson,
    'kombinasjon': () => kombinasjonPerson,
    'kun-ag-periode': () => ({ vedtak: [ kunAgPeriode ] }),
}
