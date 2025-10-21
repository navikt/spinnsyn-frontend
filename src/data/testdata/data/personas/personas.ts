import { Persona } from '../../testperson'
import { vedtakMedFlereArbeidsgivere } from '../vedtak/vedtakMedFlereArbeidsgivere'
import {
    avslåttFraBømlo,
    delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo,
} from '../vedtak/delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo'
import { vedtakDerDetSluttesMedDelvisRefusjon } from '../vedtak/vedtakDerDetSluttesMedDelvisRefusjon'
import { alleAvvisteDager, alleAvvisteDagerFraBomlo } from '../vedtak/alleAvvisteDager'
import { skjønnsfastsattBrukerutbetaling, skjønnsfastsattFlereArbeidsgivere } from '../vedtak/skjønnsfastsatt'
import { revurdertOgAnnullertVedtak } from '../vedtak/revurdertOgAnnullert'
import { julesoknadVedtak } from '../vedtak/julesoknad'
import { skjonnsfastsattRiktigAarsinntekt } from '../vedtak/skjonnsfastsattRiktigAarsinntekt'
import { nullOmregnetAarsinntekt } from '../vedtak/nullOmregnetAarsinntekt'
import { slutterMedRefusjon } from '../vedtak/slutterMedRefusjon'
import { inntektUnder2g } from '../vedtak/inntektUnder2g'
import { vedtakMed0Utbetaling } from '../vedtak/vedtakMed0Utbetaling'
import { kunAgPeriode } from '../vedtak/kunAgPeriode'
import { vedtakMedDetMeste } from '../vedtak/medDetMeste'
import { vedtakMed40Grad } from '../vedtak/gradert40'
import { vedtakAnnullert } from '../vedtak/annullert'
import { vedtakRevurdert } from '../vedtak/revurdert'
import { vedtakRevurdertDirekte } from '../vedtak/revurdertDirekte'
import { avvistVedtak } from '../vedtak/avvistVedtak'
import { avvistVedtakMedLavInntekt } from '../vedtak/avvistMedLavInntekt'
import { vedtakRedusertTil6G } from '../vedtak/redusertTil6g'
import { kunDirekte } from '../vedtak/kunDirekte'
import { kombinertDirekteOgRefusjon } from '../vedtak/kombinert'
import { avvistVedtakMedLavInntektDirekteUtbetaling } from '../vedtak/avvistVedtakMedLavInntektDirekteUtbetaling'
import { kombinertRevurdert } from '../vedtak/kombinertRevurdert'
import { avslattMinimumInntektOver67 } from '../vedtak/avslattMinimumInntektOver67'
import { inntektHentetFraAordningen } from '../vedtak/inntektHentetFraAordningen'
import { innvilgelseMedBegrunnelseVedtak, innvilgelseMedTomBegrunnelseVedtak } from '../vedtak/innvilgelseBegrunnelse'
import { ingenUtbetalingFordiAlleDagerHelg } from '../vedtak/ingenUtbetalingFordiAlleDagerHelg'
import { innvilgelseVedtak } from '../vedtak/delvisInnvilgelse'

export const utenData: Persona = {
    vedtak: [],
    beskrivelse: 'Ingen vedtak fattet',
}

export const etVedtakFlereArbeidsgivere: Persona = {
    vedtak: [vedtakMedFlereArbeidsgivere],
    beskrivelse: 'Refusjon til arbeidsgiver og ansatt 2 steder',
}

export const diverseData: Persona = {
    vedtak: [
        vedtakMedDetMeste,
        vedtakMed40Grad,
        vedtakAnnullert,
        vedtakRevurdert,
        vedtakRevurdertDirekte,
        alleAvvisteDager,
        avvistVedtak,
        avvistVedtakMedLavInntekt,
        vedtakRedusertTil6G,
        inntektHentetFraAordningen,
        ingenUtbetalingFordiAlleDagerHelg,
    ],
    beskrivelse: 'Diverse vedtak brukt til testing',
}

export const annullert: Persona = {
    vedtak: [vedtakAnnullert],
    beskrivelse: 'Annullert vedtak',
}

export const forLavInntektPerson: Persona = {
    vedtak: [avvistVedtakMedLavInntekt, avvistVedtakMedLavInntektDirekteUtbetaling],
    beskrivelse: 'Avvist på grunn av for lav inntekt',
}

export const forLavInntektPerson67: Persona = {
    vedtak: [avslattMinimumInntektOver67],
    beskrivelse: 'Avvist på grunn av for lav inntekt over 67',
}

export const kunDirektePerson: Persona = {
    vedtak: [kunDirekte],
    kontonummer: '10011110011',
    beskrivelse: 'Utbetaling til sykmeldt',
}

export const innvilgelsePerson: Persona = {
    vedtak: [innvilgelseVedtak],
    kontonummer: '10011110011',
    beskrivelse: 'Delvis innvilgelse',
}

export const innvilgelseMedBegrunnelsePerson: Persona = {
    vedtak: [innvilgelseMedBegrunnelseVedtak],
    kontonummer: '10011110011',
    beskrivelse: 'Innvilgelse med begrunnelse',
}

export const innvilgelseMedTomBegrunnelsePerson: Persona = {
    vedtak: [innvilgelseMedTomBegrunnelseVedtak],
    kontonummer: '10011110011',
    beskrivelse: 'Innvilgelse med tom begrunnelse',
}

export const delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomloPerson: Persona = {
    vedtak: [delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo],
    kontonummer: '10011110011',
    beskrivelse: 'Delvis Innvilget og Skjønnsfastsatt vedtak med refusjon og brukerutbetaling fra Bømlo',
}

export const avslåttFraBømloPerson: Persona = {
    vedtak: [avslåttFraBømlo],
    kontonummer: '10011110011',
    beskrivelse: 'Avslått vedtak uten utbetaling fra Bømlo',
}

export const flexjarPoHelseHelsemetrikk: Persona = {
    vedtak: [kunDirekte],
    kontonummer: '10011110011',
    beskrivelse: 'Viser flexjaren PO Helse helsemetrikk',
    togglesOn: ['flexjar-spinnsyn-pohelse-helsemetrikk'],
    togglesOff: ['flexjar-spinnsyn-frontend'],
}

export const julesoknadPerson: Persona = {
    vedtak: [julesoknadVedtak],
    kontonummer: '10011110011',
    beskrivelse: 'Julesøknad med advarsel',
}

export const direkteUtenKontonummerPerson: Persona = {
    vedtak: [kunDirekte],
    beskrivelse: 'Utbetaling til sykmeldt uten kontonummer',
}

export const kombinasjonPerson: Persona = {
    vedtak: [kombinertDirekteOgRefusjon, slutterMedRefusjon],
    beskrivelse: 'Både refusjon og brukerutbetaling',
}

export const slutterMedDelvisRefusjon: Persona = {
    vedtak: [vedtakDerDetSluttesMedDelvisRefusjon],
    beskrivelse: 'Arbeidsgiver slutter med refusjon midt i perioden',
}

export const kunArbedisgiverPerioder: Persona = {
    vedtak: [kunAgPeriode],
    beskrivelse: 'Vedtak som bare gjelder innenfor arbeidsgiverperioden',
}

export const skjønnsfastsattBrukerutbetalingPerson: Persona = {
    vedtak: [skjønnsfastsattBrukerutbetaling],
    beskrivelse: 'Skjønnsfastsatt inntekt med brukerutbetaling',
}

export const alleAvvisteDagerPerson: Persona = {
    vedtak: [alleAvvisteDager, alleAvvisteDagerFraBomlo],
    beskrivelse: 'Inneholder alle avviste dager vi har støtte for',
}

export const revurdertOgAnnullert: Persona = {
    vedtak: [revurdertOgAnnullertVedtak],
    beskrivelse: 'Vedtak som både er revurdert og senere annulert',
}

export const under2gInntekt: Persona = {
    vedtak: [inntektUnder2g],
    beskrivelse: 'Vedtak for bruker under 2g i inntekt som dermed får en ekstra beskjed',
}
export const skjonnsfastsattRiktigAarsinntektPersona: Persona = {
    vedtak: skjonnsfastsattRiktigAarsinntekt,
    beskrivelse: 'Test av skjønnsfastsatt inntekt med riktig årsinntekt',
}
export const skjønnsfastsattFlereArbeidsgiverePersona: Persona = {
    vedtak: [skjønnsfastsattFlereArbeidsgivere],
    beskrivelse: 'Test av skjønnsfastsatt med flere arbeidsgivere',
}

export const vedtakMed0UtbetalingPerson: Persona = {
    vedtak: [vedtakMed0Utbetaling],
    beskrivelse: 'Vedtak for bruker med null i utbetaling',
}
export const vedtakMedNullOmregnetAarsinngtekt: Persona = {
    vedtak: [nullOmregnetAarsinntekt],
    beskrivelse: 'Vedtak for bruker med 0 i årsinntekt',
}
export const kombinertRevurdertPersona: Persona = {
    vedtak: [kombinertRevurdert],
    beskrivelse: 'Kombinert som er revurdert. Har en egen spesiell tekst',
}
