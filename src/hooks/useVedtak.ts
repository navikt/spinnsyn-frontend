import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak-felles'
import { fetchJsonMedRequestId } from '../utils/fetch'
import { spinnsynFrontendSaksbehandler } from '../utils/environment'
import { korrigerYrkesaktivitetstype } from '../utils/korrigerYrkesaktivitetstype'
import { testpersonFraUrl } from '../utils/testperson-fra-url'

export default function UseVedtak() {
    const router = useRouter()
    const testpersonQuery = testpersonFraUrl(router.asPath)

    const query = () => {
        if (testpersonQuery) {
            return `?testperson=${testpersonQuery}`
        }
        return ''
    }
    const saksbehandlerVedtakId =
        spinnsynFrontendSaksbehandler() && typeof router.query.id === 'string' ? router.query.id : null

    return useQuery<VedtakResultat, Error>({
        queryKey: ['vedtak', testpersonQuery, saksbehandlerVedtakId],
        retry: spinnsynFrontendSaksbehandler() ? false : undefined,
        queryFn: async () => {
            if (spinnsynFrontendSaksbehandler()) {
                if (!saksbehandlerVedtakId) {
                    return { alleVedtak: [] }
                }
                const respons: VedtakSaksbehandlerResponse = await fetchJsonMedRequestId(
                    '/syk/sykepenger/api/spinnsyn-backend-saksbehandler/vedtak?id=' +
                        encodeURIComponent(saksbehandlerVedtakId),
                )
                return { alleVedtak: respons.vedtak.map((v) => korrigerYrkesaktivitetstype(v)) }
            }
            const alleVedtak: RSVedtakWrapper[] = await fetchJsonMedRequestId(
                '/syk/sykepenger/api/spinnsyn-backend/api/v3/vedtak' + query(),
            )

            return { alleVedtak: alleVedtak.map((v) => korrigerYrkesaktivitetstype(v)) }
        },
    })
}

interface VedtakResultat {
    alleVedtak: RSVedtakWrapper[]
}

interface VedtakSaksbehandlerResponse {
    vedtak: RSVedtakWrapper[]
}
