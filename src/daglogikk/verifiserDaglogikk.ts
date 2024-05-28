import { isDeepEqual } from 'remeda'
import { logger } from '@navikt/next-logger'

import { RSDag, RSVedtakWrapper } from '../types/rs-types/rs-vedtak'

import { hentDager } from './hentDager'
import { fjernArbeidIkkeGjenopptattDager } from './fjernArbeidIkkeGjenopptatt'
import { finnFaktiskFom } from './finnFaktiskFom'

export function verifiserDaglogikk(v: RSVedtakWrapper) {
    let dagerPerson = fjernArbeidIkkeGjenopptattDager(
        hentDager(v.vedtak.fom, v.vedtak.tom, v.vedtak.utbetaling.personOppdrag, v.vedtak.utbetaling.utbetalingsdager),
    )
    let dagerArbeidsgiver = fjernArbeidIkkeGjenopptattDager(
        hentDager(
            v.vedtak.fom,
            v.vedtak.tom,
            v.vedtak.utbetaling.arbeidsgiverOppdrag,
            v.vedtak.utbetaling.utbetalingsdager,
        ),
    )

    const sykepengebelopPerson = dagerPerson.reduce((acc, dag) => acc + dag.belop, 0)
    const sykepengebelopArbeidsgiver = dagerArbeidsgiver.reduce((acc, dag) => acc + dag.belop, 0)

    if (sykepengebelopPerson == 0 && sykepengebelopArbeidsgiver == 0) {
        dagerArbeidsgiver = [] // Helt avvist vedtak vises bare i dagerPerson
    } else if (sykepengebelopPerson == 0) {
        dagerPerson = [] // Refusjonutbetaling
    } else if (sykepengebelopArbeidsgiver == 0) {
        dagerArbeidsgiver = [] // Brukerutbetaling
    }

    interface sammenllikning {
        dagerPerson: RSDag[]
        dagerArbeidsgiver: RSDag[]
        sykepengebelopPerson: number
        sykepengebelopArbeidsgiver: number
        fom: string
    }

    const nyBeregning: sammenllikning = {
        dagerPerson: dagerPerson,
        dagerArbeidsgiver: dagerArbeidsgiver,
        sykepengebelopPerson: sykepengebelopPerson,
        sykepengebelopArbeidsgiver: sykepengebelopArbeidsgiver,
        fom: finnFaktiskFom({
            dagerArbeidsgiver: dagerArbeidsgiver,
            dagerPerson: dagerPerson,
            opprinneligFom: v.vedtak.fom,
        }),
    }

    const opprinneligBeregning: sammenllikning = {
        dagerPerson: v.dagerPerson,
        dagerArbeidsgiver: v.dagerArbeidsgiver,
        sykepengebelopPerson: v.sykepengebelopPerson,
        sykepengebelopArbeidsgiver: v.sykepengebelopArbeidsgiver,
        fom: v.vedtak.fom,
    }
    if (isDeepEqual(nyBeregning, opprinneligBeregning)) {
        logger.info(`Dager er lik for vedtak ${v.id}`)
    } else {
        logger.warn(`Dager er ulik for vedtak ${v.id}`)
    }
    return { nyBeregning, opprinneligBeregning }
}
