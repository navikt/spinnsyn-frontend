import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

import { RSVedtakWrapper, RSVedtakWrapperUtvidet } from '../types/rs-types/rs-vedtak-felles'
import { fetchJsonMedRequestId } from '../utils/fetch'
import { spinnsynFrontendInterne } from '../utils/environment'
import { hentDagerPaaVedtak } from '../daglogikk/hentDagerPaaVedtak'

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
                    vedtak: utvidedeVedtak,
                    sykmeldtFnr: vedtak.sykmeldtFnr,
                }
            }
            const vedtak: RSVedtakWrapper[] = await fetchJsonMedRequestId(
                '/syk/sykepenger/api/spinnsyn-backend/api/v3/vedtak' + query(),
            )

            return { vedtak: vedtak.map((v) => hentDagerPaaVedtak(v)), sykmeldtFnr: null }
        },
    })
}

interface VedtakOgFnr {
    vedtak: RSVedtakWrapperUtvidet[]
    sykmeldtFnr: string | null
}

interface VedtakOgFnrInterneResponse {
    vedtak: RSVedtakWrapper[]
    sykmeldtFnr: string | null
}
