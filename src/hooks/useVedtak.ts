import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak'
import { fetchJsonMedRequestId } from '../utils/fetch'
import { spinnsynFrontendInterne } from '../utils/environment'

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
                const vedtak: VedtakOgFnr = await fetchJsonMedRequestId(
                    '/syk/sykepenger/api/spinnsyn-backend-veileder/api/v3/vedtak' + query(),
                )
                return vedtak
            }
            const vedtak: RSVedtakWrapper[] = await fetchJsonMedRequestId(
                '/syk/sykepenger/api/spinnsyn-backend/api/v3/vedtak' + query(),
            )
            return { vedtak, sykmeldtFnr: null }
        },
    })
}

interface VedtakOgFnr {
    vedtak: RSVedtakWrapper[]
    sykmeldtFnr: string | null
}
