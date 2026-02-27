import dayjs, { Dayjs } from 'dayjs'

import { Begrunnelse, BegrunnelseType, RSBegrunnelse, RSDag, RSVedtakWrapper } from '../types/rs-types/rs-vedtak-felles'

import { erHelg } from './dato-utils'

export const fallbackEstimertSluttdato = (vedtakWrapper: RSVedtakWrapper): Dayjs => {
    let slutt = dayjs(vedtakWrapper.vedtak.tom)
    let x = 0
    while (x < vedtakWrapper.vedtak.utbetaling.gjenståendeSykedager) {
        slutt = slutt.add(1, 'day')
        while (erHelg(slutt.toDate())) {
            slutt = slutt.add(1, 'day')
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
