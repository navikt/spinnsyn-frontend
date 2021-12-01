import { useMutation, useQueryClient } from 'react-query'

import { flexGatewayRoot } from '../utils/environment'
import Fetch from '../utils/fetch'
import { logger } from '../utils/logger'

export default function UseMerkVedtakSomLest() {
    const queryClient = useQueryClient()

    return useMutation<unknown, Error, string>((vedtaksId) => {
        return Fetch.authenticatedPost(
            `${flexGatewayRoot()}/spinnsyn-backend/api/v2/vedtak/${vedtaksId}/les`
        )
    },
    {
        onSuccess: (_, vedtaksId) => {
            queryClient.invalidateQueries('vedtak')
            logger.info(`vedtak ${vedtaksId} ble lest`)
        },
    })
}
