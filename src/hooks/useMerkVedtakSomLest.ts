import { logger } from '@navikt/next-logger'
import { useMutation, useQueryClient } from 'react-query'

import { fetchJsonMedRequestId } from '../utils/fetch'

export default function UseMerkVedtakSomLest() {
    const queryClient = useQueryClient()

    return useMutation<unknown, Error, string>(
        async (vedtaksId) => {
            return await fetchJsonMedRequestId(`/syk/sykepenger/api/spinnsyn-backend/api/v3/vedtak/${vedtaksId}/les`, {
                method: 'POST',
            })
        },
        {
            onSuccess: (_, vedtaksId) => {
                queryClient.invalidateQueries('vedtak')
                logger.info(`vedtak ${vedtaksId} ble lest`)
            },
        },
    )
}
