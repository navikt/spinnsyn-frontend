import React, { useEffect } from 'react'

import useMerkVedtakSomLest from '../../hooks/useMerkVedtakSomLest'
import { spinnsynFrontendInterne } from '../../utils/environment'
import { logEvent } from '../umami/umami'
import { RSVedtakWrapperUtvidet } from '../../types/rs-types/rs-vedtak-felles'

import Vedtak from './vedtak'

type VedtakSideProps = {
    vedtak: RSVedtakWrapperUtvidet
    alleVedtak: RSVedtakWrapperUtvidet[]
}

const VedtakSide = ({ vedtak, alleVedtak }: VedtakSideProps) => {
    const { mutate: merkLest } = useMerkVedtakSomLest()
    const brukerutbetaling = vedtak.sykepengebelopPerson > 0
    const refusjon = vedtak.sykepengebelopArbeidsgiver > 0

    useEffect(() => {
        logEvent('skjema åpnet', {
            skjemanavn: 'vedtak',
            brukerutbetaling: brukerutbetaling,
            refusjon: refusjon,
            flereVedtak: alleVedtak?.length !== 1,
            sykepengegrunnlagFastsatt: vedtak.vedtak.sykepengegrunnlagsfakta?.fastsatt || 'ukjent',
        })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (!vedtak.lest && !spinnsynFrontendInterne()) {
            merkLest(vedtak.id)
        }
    }, [vedtak, merkLest])

    return <Vedtak vedtak={vedtak} alleVedtak={alleVedtak} />
}

export default VedtakSide
