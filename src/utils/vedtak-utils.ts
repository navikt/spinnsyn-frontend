import { addDays } from 'date-fns'

import { Begrunnelse, BegrunnelseType, RSDag, RSBegrunnelse, RSVedtakWrapper } from '../types/rs-types/rs-vedtak-felles'

import { erHelg, toDate } from './dato-utils'

export const fallbackEstimertSluttdato = (vedtakWrapper: RSVedtakWrapper): Date => {
    let slutt = toDate(vedtakWrapper.vedtak.tom)
    let x = 0
    while (x < vedtakWrapper.vedtak.utbetaling.gjenståendeSykedager) {
        slutt = addDays(slutt, 1)
        while (erHelg(slutt)) {
            slutt = addDays(slutt, 1)
        }
        x++
    }
    return slutt
}

export const hentBegrunnelse = (vedtak: RSVedtakWrapper, begrunnelseType: BegrunnelseType): Begrunnelse | undefined => {
    return vedtak.vedtak.begrunnelser?.find(
        (begrunnelse) => begrunnelse.type === begrunnelseType && begrunnelse.begrunnelse,
    )
}

export const unikeAvslagBegrunnelser = (dager: RSDag[]): Set<string> => {
    return new Set(dager.flatMap((dag) => dag.begrunnelser).map(finnBegrunnelseTekst))
}

export const finnBegrunnelseTekst = (begrunnelse: RSBegrunnelse): string => {
    switch (begrunnelse) {
        case 'SykepengedagerOppbrukt':
        case 'SykepengedagerOppbruktOver67':
            return 'Maks antall dager'
        case 'MinimumInntekt':
        case 'MinimumInntektOver67':
            return 'For lav inntekt'
        case 'EgenmeldingUtenforArbeidsgiverperiode':
            return 'Egenmelding'
        case 'MinimumSykdomsgrad':
            return 'Jobbet eller tjent for mye'
        case 'ManglerOpptjening':
            return 'Jobbet for kort'
        case 'ManglerMedlemskap':
            return 'Ikke medlem'
        case 'Over70':
            return 'Over 70 år'
        case 'EtterDødsdato':
            return 'Etter dødsfall'
        case 'AndreYtelserAap':
            return 'Arbeidsavklaringspenger'
        case 'AndreYtelserDagpenger':
            return 'Dagpenger'
        case 'AndreYtelserForeldrepenger':
            return 'Foreldrepenger'
        case 'AndreYtelserOmsorgspenger':
            return 'Omsorgspenger'
        case 'AndreYtelserOpplaringspenger':
            return 'Opplæringspenger'
        case 'AndreYtelserPleiepenger':
            return 'Pleiepenger'
        case 'AndreYtelserSvangerskapspenger':
            return 'Svangerskapspenger'
        case 'AvslattMeldingTilNavDag':
            return 'Beskjed til Nav ikke registrert'
        case 'UKJENT':
        default:
            return 'Ukjent'
    }
}

export const harVedtakEndringer = (nyttVedtak: RSVedtakWrapper, gammeltVedtak: RSVedtakWrapper): boolean => {
    return (
        erForskjelligBeløp(nyttVedtak, gammeltVedtak) ||
        erForskjelligVedtakType(nyttVedtak, gammeltVedtak) ||
        erForskjelligSykepengedagerIgjen(nyttVedtak, gammeltVedtak)
    )
}

const erForskjelligBeløp = (nyttVedtak: RSVedtakWrapper, gammeltVedtak: RSVedtakWrapper): boolean => {
    return (
        nyttVedtak.sykepengebelopSykmeldt !== gammeltVedtak.sykepengebelopSykmeldt ||
        nyttVedtak.sykepengebelopArbeidsgiver !== gammeltVedtak.sykepengebelopArbeidsgiver
    )
}

const erForskjelligVedtakType = (nyttVedtak: RSVedtakWrapper, gammeltVedtak: RSVedtakWrapper): boolean => {
    const nyttDirekteutbetaling = nyttVedtak.sykepengebelopSykmeldt > 0
    const nyttRefusjon = nyttVedtak.sykepengebelopArbeidsgiver > 0
    const nyttIngenUtbetaling = nyttVedtak.sykepengebelopArbeidsgiver === 0 && nyttVedtak.sykepengebelopSykmeldt === 0

    const gammelDirekteutbetaling = gammeltVedtak.sykepengebelopSykmeldt > 0
    const gammelRefusjon = gammeltVedtak.sykepengebelopArbeidsgiver > 0
    const gammelIngenUtbetaling =
        gammeltVedtak.sykepengebelopArbeidsgiver === 0 && gammeltVedtak.sykepengebelopSykmeldt === 0

    return (
        nyttDirekteutbetaling !== gammelDirekteutbetaling ||
        nyttRefusjon !== gammelRefusjon ||
        nyttIngenUtbetaling !== gammelIngenUtbetaling
    )
}

const erForskjelligSykepengedagerIgjen = (nyttVedtak: RSVedtakWrapper, gammeltVedtak: RSVedtakWrapper): boolean => {
    return nyttVedtak.vedtak.utbetaling.gjenståendeSykedager !== gammeltVedtak.vedtak.utbetaling.gjenståendeSykedager
}

export const erKunArbeidsgiverperiode = (dager: RSDag[]): boolean => {
    return dager.every((dag) => dag.dagtype === 'ArbeidsgiverperiodeDag')
}

export const erArbeidsgiverperiodeEtterfulgtAvHelg = (dager: RSDag[]): boolean => {
    if (!dager.every((dag) => dag.dagtype === 'ArbeidsgiverperiodeDag' || dag.dagtype === 'NavHelgDag')) return false

    // NavHelgDag kan kun avslutte en periode med ArbeidsgiverperiodeDag.
    const forsteNavHelgDag = dager.findIndex((dag) => dag.dagtype === 'NavHelgDag')
    return forsteNavHelgDag > 0 && dager.slice(forsteNavHelgDag).every((dag) => dag.dagtype === 'NavHelgDag')
}

export const finnInnvilgetMerke = (
    erAvslag: boolean,
    erKunArbeidsgiverperiode: boolean,
    erArbeidsgiverPeriodeMedHelg: boolean,
    erDelvisInvilgelse: boolean,
): string => {
    if (erKunArbeidsgiverperiode || erArbeidsgiverPeriodeMedHelg) return 'Søknaden er behandlet'
    if (erAvslag) return 'Søknaden er avslått'
    if (erDelvisInvilgelse) return 'Søknaden er delvis innvilget'
    return 'Søknaden er innvilget'
}
