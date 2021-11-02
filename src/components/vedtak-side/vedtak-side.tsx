import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAppStore } from '../../data/stores/app-store'
import useMerkVedtakSomLest from '../../query-hooks/useMerkVedtakSomLest'
import useVedtak from '../../query-hooks/useVedtak'
import { setBodyClass } from '../../utils/utils'
import { logEvent } from '../amplitude/amplitude'
import { RouteParams } from '../app'
import Vedtak from './vedtak'


const VedtakSide = () => {
    const { id } = useParams<RouteParams>()
    const { data: vedtak } = useVedtak()
    const { valgtVedtak, setValgtVedtak } = useAppStore()
    const { mutate: merkLest } = useMerkVedtakSomLest()

    useEffect(() => {
        setBodyClass('vedtak-side')
        logEvent('skjema åpnet', { skjemanavn: 'vedtak' })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (vedtak) {
            const aktivtVedtak = vedtak.find(v => v.id === id)
            setValgtVedtak(aktivtVedtak)
        }
        // eslint-disable-next-line
    }, [vedtak])

    useEffect(() => {
        if (valgtVedtak && !valgtVedtak.lest) {
            merkLest(valgtVedtak.id)
        }
        // eslint-disable-next-line
    }, [valgtVedtak])

    if (!valgtVedtak) return null

    return (
        <Vedtak vedtak={valgtVedtak} />
    )
}

export default VedtakSide

