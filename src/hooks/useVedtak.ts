import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak-felles'
import { fetchJsonMedRequestId } from '../utils/fetch'
import { spinnsynFrontendInterne } from '../utils/environment'
import { korrigerYrkesaktivitetstype } from '../utils/korrigerYrkesaktivitetstype'

export default function UseVedtak() {
    console.log('useVedtak')
    const router = useRouter()
    const testpersonQuery = router.query['testperson']

    const query = () => {
        if (testpersonQuery) {
            return `?testperson=${testpersonQuery}`
        }
        return ''
    }
    console.log('useVedtak klar')
    const result = useQuery<VedtakOgFnr, Error>({
        queryKey: ['vedtak'],
        queryFn: async () => {
            console.log('Henter vedtak')
            if (spinnsynFrontendInterne()) {
                const vedtak: VedtakOgFnrInterneResponse = await fetchJsonMedRequestId(
                    '/syk/sykepenger/api/spinnsyn-backend-veileder/vedtak' + query(),
                )
                const utvidedeVedtak = vedtak.vedtak.map((v) => korrigerYrkesaktivitetstype(v))
                return {
                    alleVedtak: utvidedeVedtak,
                    sykmeldtFnr: vedtak.sykmeldtFnr,
                }
            }
            const alleVedtak: RSVedtakWrapper[] = await fetchJsonMedRequestId(
                '/syk/sykepenger/api/spinnsyn-backend/api/v3/vedtak' + query(),
            )
            console.log('Henter vedtak ferdig')
            return { alleVedtak: alleVedtak.map((v) => korrigerYrkesaktivitetstype(v)), sykmeldtFnr: null }
        },
    })
    console.log('[useVedtak] status:', result.status, 'fetchStatus:', result.fetchStatus)
    return result
}

interface VedtakOgFnr {
    alleVedtak: RSVedtakWrapper[]
    sykmeldtFnr: string | null
}

interface VedtakOgFnrInterneResponse {
    vedtak: RSVedtakWrapper[]
    sykmeldtFnr: string | null
}
