import React, { useEffect } from 'react'

import useMerkVedtakSomLest from '../../hooks/useMerkVedtakSomLest'
import useVedtak from '../../hooks/useVedtak'
import { spinnsynFrontendInterne } from '../../utils/environment'
import { logEvent } from '../umami/umami'

import Vedtak, { VedtakProps } from './vedtak'

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
            flereVedtak: vedtakene?.vedtak?.length !== 1,
            sykepengegrunnlagFastsatt: vedtak.vedtak.sykepengegrunnlagsfakta?.fastsatt || 'ukjent',
        })
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
