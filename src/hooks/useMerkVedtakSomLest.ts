import { logger } from '@navikt/next-logger'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetchJsonMedRequestId } from '../utils/fetch'

export default function UseMerkVedtakSomLest() {
    const queryClient = useQueryClient()

    return useMutation<unknown, Error, string>({
        mutationKey: ['vedtak-lest'],
        mutationFn: async (vedtaksId) => {
            return await fetchJsonMedRequestId(`/syk/sykepenger/api/spinnsyn-backend/api/v3/vedtak/${vedtaksId}/les`, {
                method: 'POST',
            })
        },
        onSuccess: async (_, vedtaksId) => {
            await queryClient.invalidateQueries({
                queryKey: ['vedtak'],
            })
            logger.info(`vedtak ${vedtaksId} ble lest`)
        },
    })
}
