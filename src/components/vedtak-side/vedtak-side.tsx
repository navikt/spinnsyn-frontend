import React, { useEffect } from 'react'

import useMerkVedtakSomLest from '../../query-hooks/useMerkVedtakSomLest'
import { isMockBackend, isOpplaering, isProd, spinnsynFrontendInterne } from '../../utils/environment'
import { logger } from '../../utils/logger'
import { setBodyClass } from '../../utils/utils'
import { logEvent } from '../amplitude/amplitude'
import Vedtak, { VedtakProps } from './vedtak'

const VedtakSide = ({ vedtak }: VedtakProps) => {
    const { mutate: merkLest } = useMerkVedtakSomLest()

    useEffect(() => {
        setBodyClass('vedtak-side')
        logEvent('skjema åpnet', {
            skjemanavn: 'vedtak',
            brukerutbetaling: vedtak.sykepengebelopPerson > 0,
            refusjon: vedtak.sykepengebelopArbeidsgiver > 0
        })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        interface HotjarWindow extends Window {
            hj: (name: string, value: string) => void;
        }

        const hotJarWindow = (window as unknown as HotjarWindow)
        if (isProd() || isOpplaering()) {
            setTimeout(() => {
                if (typeof hotJarWindow.hj !== 'function') {
                    if (!isMockBackend()) {
                        logger.info('Hotjar ble ikke lastet inn...')
                    }
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
        if (!vedtak.lest && !spinnsynFrontendInterne()) {
            merkLest(vedtak.id)
        }
    }, [ vedtak, merkLest ])

    return (
        <Vedtak vedtak={vedtak} />
    )
}

export default VedtakSide

