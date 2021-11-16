import {
    annullert,
    avvistPerson,
    diverseData,
    eldgammelt,
    kombinasjonPerson,
    kunDirektePerson,
    Persona, utenData
} from './data/personas'

export interface StringFunctionMap {
    [ index: string ]: () => Persona;
}

export const personas: StringFunctionMap = {
    'uten-data': () => utenData,
    'diverse-data': () => diverseData,
    'annulert-og-overført-infotrygd': () => annullert,
    'veldig-gammelt-vedtak': () => eldgammelt,
    'delvis-og-helt-avviste-vedtak': () => avvistPerson,
    'kun-direkte': () => kunDirektePerson,
    'kombinasjon': () => kombinasjonPerson,
}
