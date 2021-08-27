import { annullert, diverseData, Persona, utenData } from './data/personas'

export interface StringFunctionMap {
    [ index: string ]: () => Persona;
}

export const personas: StringFunctionMap = {
    'uten-data': () => utenData,
    'diverse-data': () => diverseData,
    'annulert-og-overført-infotrygd': () => annullert,
}
