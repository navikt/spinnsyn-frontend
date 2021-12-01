import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import useMerkVedtakSomLest from '../../query-hooks/useMerkVedtakSomLest'
import useVedtak from '../../query-hooks/useVedtak'
import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import { isOpplaering, isProd } from '../../utils/environment'
import { logger } from '../../utils/logger'
import { setBodyClass } from '../../utils/utils'
import { logEvent } from '../amplitude/amplitude'
import { RouteParams } from '../app'
import Vedtak from './vedtak'


const VedtakSide = () => {
    const { id } = useParams<RouteParams>()
    const { data: vedtak } = useVedtak()
    const { mutate: merkLest } = useMerkVedtakSomLest()
    const [ valgtVedtak, setValgtVedtak ] = useState<RSVedtakWrapper>()

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
        interface HotjarWindow extends Window {
            hj: (name: string, value: string) => void;
        }

        const hotJarWindow = (window as unknown as HotjarWindow)
        if (isProd() || isOpplaering()) {
            setTimeout(() => {
                if (typeof hotJarWindow.hj !== 'function') {
                    logger.info('Hotjar ble ikke lastet inn...')
                } else {
                    hotJarWindow.hj('trigger', 'SP_INNSYN')
                }
            }, 2000)
        } else {
            // eslint-disable-next-line no-console
            console.log('Skipper hotjar trigging')
        }
    }, [])

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

