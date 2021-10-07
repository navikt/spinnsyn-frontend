import { annullert, avvistPerson, diverseData, eldgammelt, over6GPerson, Persona, utenData } from './data/personas'

export interface StringFunctionMap {
    [ index: string ]: () => Persona;
}

export const personas: StringFunctionMap = {
    'uten-data': () => utenData,
    'diverse-data': () => diverseData,
    'annulert-og-overført-infotrygd': () => annullert,
    'veldig-gammelt-vedtak': () => eldgammelt,
    'delvis-og-helt-avviste-vedtak': () => avvistPerson,
    'inntekt-over-6G': () => over6GPerson,
}
