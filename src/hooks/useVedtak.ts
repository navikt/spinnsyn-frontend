import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { logger } from '@navikt/next-logger'

import { RSVedtakWrapper, RSVedtakWrapperUtvidet } from '../types/rs-types/rs-vedtak-felles'
import { fetchJsonMedRequestId } from '../utils/fetch'
import { spinnsynFrontendInterne } from '../utils/environment'
import { hentDagerPaaVedtak, validerNyUtbetalingsdagListe } from '../daglogikk/hentDagerPaaVedtak'

export default function UseVedtak() {
    const router = useRouter()
    const testpersonQuery = router.query['testperson']

    const query = () => {
        if (testpersonQuery) {
            return `?testperson=${testpersonQuery}`
        }
        return ''
    }
    return useQuery<VedtakOgFnr, Error>({
        queryKey: ['vedtak'],
        queryFn: async () => {
            if (spinnsynFrontendInterne()) {
                const vedtak: VedtakOgFnrInterneResponse = await fetchJsonMedRequestId(
                    '/syk/sykepenger/api/spinnsyn-backend-veileder/vedtak' + query(),
                )
                const utvidedeVedtak = vedtak.vedtak.map((v) => hentDagerPaaVedtak(v))
                return {
                    alleVedtak: utvidedeVedtak,
                    sykmeldtFnr: vedtak.sykmeldtFnr,
                }
            }
            const alleVedtak: RSVedtakWrapper[] = await fetchJsonMedRequestId(
                '/syk/sykepenger/api/spinnsyn-backend/api/v3/vedtak' + query(),
            )

            return {
                alleVedtak: alleVedtak.map((v) => {
                    const nyttVedtak = hentDagerPaaVedtak(v)
                    if (nyttVedtak.vedtak.utbetaling.utbetalingsdager) {
                        const likeDagerArbeidsgiver = validerNyUtbetalingsdagListe(
                            nyttVedtak.vedtak.utbetaling.utbetalingsdager,
                            nyttVedtak.dagerArbeidsgiver,
                        )
                        const likeDagerPerson = validerNyUtbetalingsdagListe(
                            nyttVedtak.vedtak.utbetaling.utbetalingsdager,
                            nyttVedtak.dagerPerson,
                        )
                        if (!likeDagerArbeidsgiver || !likeDagerPerson) {
                            logger.warn('ny utbetalingsdager er ikke beregnet riktig på vedtak ' + nyttVedtak.id)
                        }
                    }
                    return nyttVedtak
                }),
                sykmeldtFnr: null,
            }
        },
    })
}

interface VedtakOgFnr {
    alleVedtak: RSVedtakWrapperUtvidet[]
    sykmeldtFnr: string | null
}

interface VedtakOgFnrInterneResponse {
    vedtak: RSVedtakWrapper[]
    sykmeldtFnr: string | null
}
