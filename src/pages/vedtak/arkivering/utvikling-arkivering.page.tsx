import { GetServerSideProps } from 'next'
import getConfig from 'next/config'
import React from 'react'

import { VedtakArkivering } from '../../../components/vedtak-arkivering/vedtak-arkivering'
import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak-felles'
import { skjønnsfastsattBrukerutbetaling } from '../../../data/testdata/data/vedtak/skjønnsfastsatt'
import { alleAvvisteDager } from '../../../data/testdata/data/vedtak/alleAvvisteDager'
import { delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo } from '../../../data/testdata/data/vedtak/delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo'
import { vedtakMedFlereArbeidsgivere } from '../../../data/testdata/data/vedtak/vedtakMedFlereArbeidsgivere'

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
        if (ctx.query.testperson === 'skjonnsfastsatt-brukerutbetaling') {
            return skjønnsfastsattBrukerutbetaling
        }
        if (ctx.query.testperson === 'flere-arbeidsgivere') {
            return vedtakMedFlereArbeidsgivere
        }
        if (ctx.query.testperson === 'kombinasjon-delvisInnvilgelse-og-skjønnsfastsatt-fra-bomlo') {
            return delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo
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
