import { kombinasjonPerson, kunDirektePerson, Persona } from './data/personas'

export interface StringFunctionMap {
    [ index: string ]: () => Persona;
}

export const personas: StringFunctionMap = {
    'kun-direkte': () => kunDirektePerson,
    'kombinasjon': () => kombinasjonPerson,
}
