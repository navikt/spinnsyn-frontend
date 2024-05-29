import { AndreArbeidsgivere, RSVedtakWrapper, RSVedtak } from '../types/rs-types/rs-vedtak'
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

    oppsumertAvslagBegrunnelser(): Set<string> {
        const utbetalingsdager = () => {
            if (this.erRefusjon()) {
                return this.vedtak.utbetaling.arbeidsgiverOppdrag?.utbetalingslinjer
            } else {
                return this.vedtak.utbetaling.personOppdrag?.utbetalingslinjer
            }
        }
        const uniqueTypes = new Set<string>()

        if (this.vedtak.utbetaling && this.vedtak.utbetaling.utbetalingsdager) {
            this.vedtak.utbetaling.utbetalingsdager.forEach((utbetalingdag) => {
                if (utbetalingsdager() !== undefined) {
                    utbetalingsdager()!.forEach((linje) => {
                        if (erDatoILinje(utbetalingdag.dato, linje.fom, linje.tom)) {
                            utbetalingdag.begrunnelser.forEach((begrunnelse) => {
                                uniqueTypes.add(finnBegrunnelseTekst(begrunnelse))
                            })
                        }
                    })
                }
            })
        }

        return uniqueTypes
    }
}

function erDatoILinje(date: string | Date, startDate: string | Date, endDate: string | Date): boolean {
    const targetDate = typeof date === 'string' ? new Date(date) : date
    const start = typeof startDate === 'string' ? new Date(startDate) : startDate
    const end = typeof endDate === 'string' ? new Date(endDate) : endDate

    return targetDate >= start && targetDate <= end
}
