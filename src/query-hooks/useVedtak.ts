import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak'
import { fetchJsonMedRequestId } from '../utils/fetch'

export default function UseVedtak() {
    const router = useRouter()
    const testpersonQuery = router.query['testperson']

    const query = () => {
        if (testpersonQuery) {
            return `?testperson=${testpersonQuery}`
        }
        return ''
    }
    return useQuery<RSVedtakWrapper[], Error>('vedtak', () =>
        fetchJsonMedRequestId('/syk/sykepenger/api/spinnsyn-backend/api/v3/vedtak' + query())
    )
}
