import { useMutation, useQueryClient } from 'react-query'

import { flexGatewayRoot } from '../utils/environment'
import Fetch from '../utils/fetch'

export default function() {
    const queryClient = useQueryClient()

    return useMutation<unknown, Error, string>((vedtaksId) => {
        return Fetch.authenticatedPost(
            `${flexGatewayRoot()}/spinnsyn-backend/api/v2/vedtak/${vedtaksId}/les`
        )
    },
    {
        onSuccess: () => {
            queryClient.invalidateQueries('vedtak')
        },
    })
}
