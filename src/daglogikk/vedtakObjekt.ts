import { logger } from '@navikt/next-logger'
import dayjs from 'dayjs'
import minMax from 'dayjs/plugin/minMax'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
dayjs.extend(minMax)
dayjs.extend(isBetween)
dayjs.extend(isSameOrAfter)

import { AndreArbeidsgivere, RSVedtakWrapper, RSVedtak, RSUtbetalingslinje } from '../types/rs-types/rs-vedtak'
import { finnBegrunnelseTekst } from '../utils/vedtak-utils'

export class VedtakObjekt {
    id: string
    lest: boolean
    lestDato?: string | null
    vedtak: RSVedtak
    opprettetTimestamp: string
    orgnavn: string
    andreArbeidsgivere: AndreArbeidsgivere
    annullert: boolean
    revurdert: boolean
    organisasjoner: Record<string, string>

    constructor(data: RSVedtakWrapper) {
        this.id = data.id
        this.lest = data.lest
        this.lestDato = data.lestDato
        this.vedtak = data.vedtak
        this.opprettetTimestamp = data.opprettetTimestamp
        this.orgnavn = data.orgnavn
        this.andreArbeidsgivere = data.andreArbeidsgivere
        this.annullert = data.annullert
        this.revurdert = data.revurdert
        this.organisasjoner = data.organisasjoner
    }

    erRefusjon = (): boolean => {
        const utbetalingslinjer = this.vedtak?.utbetaling?.arbeidsgiverOppdrag?.utbetalingslinjer
        return !!utbetalingslinjer && utbetalingslinjer.length > 0
    }

    erPersonUtbetaling = (): boolean => {
        const utbetalingslinjer = this.vedtak?.utbetaling?.personOppdrag?.utbetalingslinjer
        return !!utbetalingslinjer && utbetalingslinjer.length > 0
    }

    erDelvisInnvilgelse = (): boolean => {
        //TODO legg inn logikk for å finne delvis innvilgelse i automatisk behandlet vedtak
        return this.vedtak.begrunnelser?.find((begrunnelse) => begrunnelse.type === 'DelvisInnvilgelse') !== undefined
    }

    erAvslag = (): boolean => {
        //TODO legg inn logikk for å finne avslag i automatisk behandlet vedtak
        return this.vedtak.begrunnelser?.find((begrunnelse) => begrunnelse.type === 'Avslag') !== undefined
    }

    /**
     * @param ubetalingsType
     * @returns et Set med unike begrunnelser som skal vises i oppsummeringsboksen for utbetaling
     */
    oppsumertAvslagBegrunnelser(ubetalingsType: 'refusjon' | 'personutbetaling' | 'ingen'): Set<string> {
        const uniqueTypes = new Set<string>()

        if (this.vedtak.utbetaling && this.vedtak.utbetaling.utbetalingsdager) {
            this.vedtak.utbetaling.utbetalingsdager.forEach((utbetalingdag) => {
                const dagType = finnDagType(
                    utbetalingdag.dato,
                    this.vedtak.utbetaling.arbeidsgiverOppdrag?.utbetalingslinjer,
                    this.vedtak.utbetaling.personOppdrag?.utbetalingslinjer,
                )
                if (ubetalingsType !== dagType && ubetalingsType !== 'ingen') {
                    return
                }

                if (
                    (this.erRefusjon() && dagType === 'refusjon') ||
                    (this.erPersonUtbetaling() && dagType === 'personutbetaling') ||
                    ubetalingsType === 'ingen'
                ) {
                    utbetalingdag.begrunnelser.forEach((begrunnelse) => {
                        uniqueTypes.add(finnBegrunnelseTekst(begrunnelse))
                    })
                }
            })
        }

        return uniqueTypes
    }
}

function finnDagType(
    gittDato: string,
    arbeidsgiverOppdrag: RSUtbetalingslinje[] | undefined,
    personOppdrag: RSUtbetalingslinje[] | undefined,
): 'refusjon' | 'personutbetaling' | undefined {
    const dato = dayjs(gittDato)

    if (!arbeidsgiverOppdrag && !personOppdrag) {
        logger.info('Ingen utbetalinger og dermed helt avslått')
        return undefined
    }

    const arbeidsgiverPerioder =
        arbeidsgiverOppdrag?.map((line) => ({
            start: dayjs(line.fom),
            slutt: dayjs(line.tom),
        })) ?? []

    const personPerioder = personOppdrag?.map((linje) => dayjs(linje.fom)) ?? []

    const arbeidsgiverStart =
        arbeidsgiverPerioder.length > 0 ? dayjs.min(arbeidsgiverPerioder.map((p) => p.start)) : null
    const arbeidsgiverSlutt =
        arbeidsgiverPerioder.length > 0 ? dayjs.max(arbeidsgiverPerioder.map((p) => p.slutt)) : null
    const personStart = personPerioder.length > 0 ? dayjs.min(personPerioder) : null

    if (arbeidsgiverStart && dato.isBefore(arbeidsgiverStart)) {
        return 'refusjon'
    }

    if (arbeidsgiverStart && arbeidsgiverSlutt && dato.isBetween(arbeidsgiverStart, arbeidsgiverSlutt, 'day', '[]')) {
        return 'refusjon'
    }

    if (personStart && dato.isSameOrAfter(personStart)) {
        return 'personutbetaling'
    }

    if (!personOppdrag && arbeidsgiverSlutt && dato.isAfter(arbeidsgiverSlutt)) {
        return 'refusjon'
    }

    if (arbeidsgiverSlutt && personStart) {
        if (dato.isAfter(arbeidsgiverSlutt) && dato.isBefore(personStart)) {
            return undefined
        } else if (dato.isAfter(arbeidsgiverSlutt) && dato.isSameOrAfter(personStart)) {
            return 'personutbetaling'
        }
    }

    logger.warn('Fant ikke noen matchende oppdrag for dato: ' + dato.format('YYYY-MM-DD'))
    return undefined
}
