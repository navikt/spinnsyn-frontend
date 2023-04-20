import { logger } from '@navikt/next-logger'
import React, { useEffect } from 'react'

import useMerkVedtakSomLest from '../../hooks/useMerkVedtakSomLest'
import useVedtak from '../../hooks/useVedtak'
import { isMockBackend, isOpplaering, isProd, spinnsynFrontendInterne } from '../../utils/environment'
import { logEvent } from '../amplitude/amplitude'

import Vedtak, { VedtakProps } from './vedtak'

interface HotjarWindow extends Window {
    hj: (name: string, value: string) => void
}

enum HotjarTriggerType {
    SPREF_SURVEY = 'SP_INNSYN',
    SP_SURVEY = 'todo',
    KOMBINASJON_SURVEY = 'todo',
    HELT_AVVIST = 'todo',
    FLEX_SPINNSYN_FEEDBACK = 'FLEX_SPINNSYN_FEEDBACK',
}

const VedtakSide = ({ vedtak }: VedtakProps) => {
    const { mutate: merkLest } = useMerkVedtakSomLest()
    const { data: vedtakene } = useVedtak()
    const brukerutbetaling = vedtak.sykepengebelopPerson > 0
    const refusjon = vedtak.sykepengebelopArbeidsgiver > 0

    useEffect(() => {
        logEvent('skjema åpnet', {
            skjemanavn: 'vedtak',
            brukerutbetaling: brukerutbetaling,
            refusjon: refusjon,
            flereVedtak: vedtakene?.length !== 1,
        })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const hotJarWindow = window as unknown as HotjarWindow
        if (isProd() || isOpplaering()) {
            setTimeout(() => {
                if (typeof hotJarWindow.hj !== 'function') {
                    if (!isMockBackend()) {
                        logger.info('Hotjar ble ikke lastet inn...')
                    }
                } else {
                    hotJarWindow.hj('trigger', HotjarTriggerType.FLEX_SPINNSYN_FEEDBACK)
                }
            }, 10000)
        } else {
            // eslint-disable-next-line no-console
            console.log('Skipper hotjar trigging')
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (!vedtak.lest && !spinnsynFrontendInterne()) {
            merkLest(vedtak.id)
        }
    }, [vedtak, merkLest])

    return <Vedtak vedtak={vedtak} />
}

export default VedtakSide
