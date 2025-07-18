import dayjs, { Dayjs } from 'dayjs'

import {
    Begrunnelse,
    BegrunnelseType,
    RSBegrunnelse,
    RSVedtakWrapper,
    RSVedtakWrapperUtvidet,
} from '../types/rs-types/rs-vedtak-felles'

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
    return vedtak.vedtak.begrunnelser?.find((b) => b.type === begrunnelse && b.begrunnelse)
}

export const oppsumertAvslagBegrunnelser = (
    vedtak: RSVedtakWrapperUtvidet,
    dager: 'dagerArbeidsgiver' | 'dagerPerson',
): Set<string> => {
    const selectedDager = dager === 'dagerArbeidsgiver' ? vedtak.dagerArbeidsgiver : vedtak.dagerPerson

    return selectedDager
        .flatMap((dag) => dag.begrunnelser)
        .reduce(
            (alleBegrunnelser, begrunnelse) => alleBegrunnelser.add(finnBegrunnelseTekst(begrunnelse)),
            new Set<string>(),
        )
}

export const finnOppsumertAvslag = (
    vedtak: RSVedtakWrapperUtvidet,
    dager: 'dagerArbeidsgiver' | 'dagerPerson' | 'alleDager',
) => {
    let title: string
    let oppsumertAvslag: Set<string>
    if (dager === 'alleDager') {
        title = 'Søknaden er avslått fordi:'
        oppsumertAvslag = new Set<string>([
            ...oppsumertAvslagBegrunnelser(vedtak, 'dagerArbeidsgiver'),
            ...oppsumertAvslagBegrunnelser(vedtak, 'dagerPerson'),
        ])
    } else {
        title = 'Noen av dagene er ikke innvilget fordi:'
        oppsumertAvslag = oppsumertAvslagBegrunnelser(vedtak, dager)
    }

    return {
        oppsumertAvslag,
        title,
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
            return 'For mye arbeid og/eller inntekt'
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
