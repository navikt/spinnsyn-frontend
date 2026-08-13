import { Persona } from '../../testperson'
import { standardSelvstendig } from '../vedtak/naringsdrivende/standardSelvstendig'
import { seksGBegrensningSelvstendig } from '../vedtak/naringsdrivende/seksGBegrensningSelvstendig'
import { utenAarsinntektSelvstendig } from '../vedtak/naringsdrivende/utenAarsinntektSelvstendig'
import { ingenUtbetalingSelvstendig } from '../vedtak/naringsdrivende/ingenUtbetalingSelvstendig'
import { avslattMeldingTilNavDagSelvstendig } from '../vedtak/naringsdrivende/avslattMeldingTilNavDag'
import { selvstendigMedLavInntekt } from '../vedtak/naringsdrivende/selvstendigMedLavInntekt'
import { selvstendigMedManglerOpptjening } from '../vedtak/naringsdrivende/selvstendigMedManglerOpptjening'

import { iKategori, Scenario, Scenariokategori, tilDemovedtak } from './scenario'

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

export const selvstendigMedLavInntektPersona: Persona = {
    vedtak: [selvstendigMedLavInntekt],
    beskrivelse: 'Selvstendig næringsdrivende med lav inntekt',
}

export const selvstendigMedManglerOpptjeningPersona: Persona = {
    vedtak: [selvstendigMedManglerOpptjening],
    beskrivelse: 'Selvstendig næringsdrivende med manglende opptjening',
}

const selvstendigScenarioer: Scenario[] = [
    ['utbetaling', 'Standard vedtak', standardSelvstendig],

    ['ingen-utbetaling', 'Ingen utbetaling', ingenUtbetalingSelvstendig],

    ['avslag', 'Beskjed til Nav ikke registrert', avslattMeldingTilNavDagSelvstendig],
    ['avslag', 'Lav inntekt', selvstendigMedLavInntekt],
    ['avslag', 'Mangler opptjening', selvstendigMedManglerOpptjening],

    ['inntekt', 'Redusert til 6 G', seksGBegrensningSelvstendig],
    ['inntekt', 'Uten årsinntekt', utenAarsinntektSelvstendig],
]

export const selvstendigNaeringsdrivendePerson: Persona = {
    vedtak: tilDemovedtak(selvstendigScenarioer),
    kontonummer: '10011110011',
    beskrivelse: 'Selvstendig næringsdrivende',
}

export function selvstendigIKategori(kategori: Scenariokategori): Persona {
    return {
        vedtak: tilDemovedtak(iKategori(selvstendigScenarioer, kategori)),
        kontonummer: '10011110011',
        beskrivelse: 'Selvstendig næringsdrivende',
    }
}
