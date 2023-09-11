import { GetServerSideProps } from 'next'
import getConfig from 'next/config'
import React from 'react'

import { VedtakArkivering } from '../../../components/vedtak-arkivering/vedtak-arkivering'
import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import {
    skjønnsfastsattBrukerutbetaling,
    skjønnsfastsattFlereArbeidsgivere,
} from '../../../data/testdata/data/vedtak/skjønnsfastsatt'
import { alleAvvisteDager } from '../../../data/testdata/data/vedtak/alleAvvisteDager'

const { serverRuntimeConfig } = getConfig()

export interface DevVedtakProps {
    vedtak: RSVedtakWrapper
    enabled: boolean
}

const UtviklingArkiveringPage = ({ vedtak, enabled }: DevVedtakProps) => {
    if (!enabled) {
        return <span>Disabled</span>
    }
    return <VedtakArkivering vedtak={vedtak} />
}

export const getServerSideProps: GetServerSideProps<DevVedtakProps> = async (ctx) => {
    const finnVedtak = () => {
        if (ctx.query.testperson === 'skjønnsfastsatt-brukerutbetaling') {
            return skjønnsfastsattBrukerutbetaling
        }
        if (ctx.query.testperson === 'skjønnsfastsatt-flere-arbeidsgivere') {
            return skjønnsfastsattFlereArbeidsgivere
        }
        return alleAvvisteDager
    }

    const vedtak = finnVedtak()

    ctx.res.setHeader('x-nais-app-image', 'testtest')
    ctx.res.setHeader('x-vedtak-fom', vedtak.vedtak.fom)
    ctx.res.setHeader('x-vedtak-tom', vedtak.vedtak.tom)
    return {
        props: {
            enabled: serverRuntimeConfig.utviklingArkivering === 'true',
            vedtak,
        },
    }
}

export default UtviklingArkiveringPage
