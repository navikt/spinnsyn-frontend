import { useMutation } from '@tanstack/react-query'

import { basePath } from '../../../utils/environment'
import { fetchMedRequestId } from '../../../utils/fetch'

export function UseOppdaterFlexjarFeedback() {
    return useMutation<unknown, Error, OppdaterFlexjarFeedbackRequest>({
        mutationFn: async (req) => {
            return fetchMedRequestId(`${basePath()}/api/flexjar-backend/api/v2/feedback/${req.id}`, {
                method: 'PUT',
                body: JSON.stringify(req.body),

                headers: {
                    'Content-Type': 'application/json',
                },
            })
        },
        onSuccess: async (_, req) => {
            req.cb?.()
        },
    })
}

interface OppdaterFlexjarFeedbackRequest {
    id: string
    body: object
    cb?: () => void
}
