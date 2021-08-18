import { useParams } from 'react-router-dom'

import { RouteParams } from '../app'
import useVedtak from './useVedtak'

export default function() {
    const { id } = useParams<RouteParams>()
    const { data: vedtak } = useVedtak()
    return vedtak?.find(v => v.id === id)
}
