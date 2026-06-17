import { Persona } from '../../testperson'
import { standardSelvstendig } from '../vedtak/naringsdrivende/standardSelvstendig'
import { seksGBegrensningSelvstendig } from '../vedtak/naringsdrivende/seksGBegrensningSelvstendig'
import { utenAarsinntektSelvstendig } from '../vedtak/naringsdrivende/utenAarsinntektSelvstendig'
import { ingenUtbetalingSelvstendig } from '../vedtak/naringsdrivende/ingenUtbetalingSelvstendig'
import { avslattMeldingTilNavDagSelvstendig } from '../vedtak/naringsdrivende/avslattMeldingTilNavDag'

export const standardSelvstendigPersona: Persona = {
    vedtak: [standardSelvstendig],
    kontonummer: '10011110011',
    beskrivelse: 'Standard selvstendig næringsdrivende',
}

export const seksGBegrensetSelvstendigPersona: Persona = {
    vedtak: [seksGBegrensningSelvstendig],
    kontonummer: '10011110011',
    beskrivelse: 'Selvstendig næringsdrivende med 6 G begrensning',
}

export const utenAarsinntektSelvstendigPersona: Persona = {
    vedtak: [utenAarsinntektSelvstendig],
    kontonummer: '10011110011',
    beskrivelse: 'Selvstendig næringsdrivende uten årsinntekt',
}

export const ingenUtbetalingSelvstendigPersona: Persona = {
    vedtak: [ingenUtbetalingSelvstendig],
    kontonummer: '10011110011',
    beskrivelse: 'Selvstendig næringsdrivende med ingen utbetaling',
}

export const avslattMeldingTilNavDagPersona: Persona = {
    vedtak: [avslattMeldingTilNavDagSelvstendig],
    beskrivelse: 'Selvstendig næringsdrivende — beskjed til Nav ikke registrert',
}
