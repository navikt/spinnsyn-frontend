import { Persona } from '../../testperson'
import { standardSelvstendig } from '../vedtak/naringsdrivende/standardSelvstendig'
import { seksGBegrensningSelvstendig } from '../vedtak/naringsdrivende/seksGBegrensningSelvstendig'

export const standardSelvstendigPersona: Persona = {
    vedtak: [standardSelvstendig],
    kontonummer: '10011110011',
    beskrivelse: 'Standard selvstendig næringsdrivende',
}

export const seksGBegrensetSelvstendigPersona: Persona = {
    vedtak: [seksGBegrensningSelvstendig],
    kontonummer: '10011110011',
    beskrivelse: 'Selvstendig næringsdrivende med 6G begrensning',
}
