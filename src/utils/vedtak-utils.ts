import dayjs, { Dayjs } from 'dayjs'

import { Begrunnelse, BegrunnelseType, RSBegrunnelse, RSVedtakWrapper } from '../types/rs-types/rs-vedtak'

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

export const hentBegrunnelse = (vedtak: RSVedtakWrapper, begrunnelse: BegrunnelseType): Begrunnelse | undefined => {
    return vedtak.vedtak.begrunnelser?.find((b) => b.type === begrunnelse)
}

export const oppsumertAvslagBegrunnelser = (
    vedtak: RSVedtakWrapper,
    dager: 'dagerArbeidsgiver' | 'dagerPerson',
): Set<string> => {
    if (dager === 'dagerArbeidsgiver') {
        // Return unique begrunnelser for arbeidsgiver
        return vedtak.dagerArbeidsgiver
            .flatMap((dag) => dag.begrunnelser)
            .reduce(
                (alleBegrunnelser, begrunnelse) => alleBegrunnelser.add(finnBegrunnelseTekst(begrunnelse)),
                new Set<string>(),
            )
    } else if (dager === 'dagerPerson') {
        // Return unique begrunnelser for person
        return vedtak.dagerPerson
            .flatMap((dag) => dag.begrunnelser)
            .reduce((acc, val) => acc.add(val), new Set<string>())
    } else {
        return new Set<string>()
    }
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
            return 'Sykmeldt i for liten grad'
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
