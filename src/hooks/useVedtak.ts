import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak-felles'
import { fetchJsonMedRequestId } from '../utils/fetch'
import { spinnsynFrontendInterne, spinnsynFrontendSaksbehandler } from '../utils/environment'
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

    return useQuery<VedtakOgFnr, Error>({
        queryKey: ['vedtak', testpersonQuery, saksbehandlerVedtakId],
        retry: spinnsynFrontendSaksbehandler() ? false : undefined,
        queryFn: async () => {
            if (spinnsynFrontendSaksbehandler()) {
                if (!saksbehandlerVedtakId) {
                    return { alleVedtak: [], sykmeldtFnr: null }
                }
                const respons: VedtakSaksbehandlerResponse = await fetchJsonMedRequestId(
                    '/syk/sykepenger/api/spinnsyn-backend-saksbehandler/vedtak?id=' +
                        encodeURIComponent(saksbehandlerVedtakId),
                )
                return { alleVedtak: respons.vedtak.map((v) => korrigerYrkesaktivitetstype(v)), sykmeldtFnr: null }
            }
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

            return { alleVedtak: alleVedtak.map((v) => korrigerYrkesaktivitetstype(v)), sykmeldtFnr: null }
        },
    })
}

interface VedtakOgFnr {
    alleVedtak: RSVedtakWrapper[]
    sykmeldtFnr: string | null
}

interface VedtakSaksbehandlerResponse {
    vedtak: RSVedtakWrapper[]
}

interface VedtakOgFnrInterneResponse {
    vedtak: RSVedtakWrapper[]
    sykmeldtFnr: string | null
}
