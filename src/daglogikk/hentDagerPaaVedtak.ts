import { RSVedtakWrapper, RSVedtakWrapperUtvidet } from '../types/rs-types/rs-vedtak-felles'

import { hentDager } from './hentDager'
import { fjernArbeidIkkeGjenopptattDager } from './fjernArbeidIkkeGjenopptatt'
import { finnFaktiskFom } from './finnFaktiskFom'

export function hentDagerPaaVedtak(v: RSVedtakWrapper): RSVedtakWrapperUtvidet {
    const dagerPerson = fjernArbeidIkkeGjenopptattDager(
        hentDager(v.vedtak.fom, v.vedtak.tom, v.vedtak.utbetaling.personOppdrag, v.vedtak.utbetaling.utbetalingsdager),
    )
    const dagerArbeidsgiver = fjernArbeidIkkeGjenopptattDager(
        hentDager(
            v.vedtak.fom,
            v.vedtak.tom,
            v.vedtak.utbetaling.arbeidsgiverOppdrag,
            v.vedtak.utbetaling.utbetalingsdager,
        ),
    )

    const nyttVedtak: RSVedtakWrapperUtvidet = {
        ...v,
        dagerPerson: dagerPerson,
        dagerArbeidsgiver: dagerArbeidsgiver,
        sykepengebelopPerson: dagerPerson.reduce((acc, dag) => acc + dag.belop, 0),
        sykepengebelopArbeidsgiver: dagerArbeidsgiver.reduce((acc, dag) => acc + dag.belop, 0),
    }
    nyttVedtak.vedtak.fom = finnFaktiskFom({
        dagerArbeidsgiver: dagerArbeidsgiver,
        dagerPerson: dagerPerson,
        opprinneligFom: v.vedtak.fom,
    })
    nyttVedtak.vedtak.vedtakstype = v.vedtak.vedtakstype || 'ARBEIDSTAKER'

    return nyttVedtak
}
