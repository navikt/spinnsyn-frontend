import { GetServerSideProps } from 'next'
import getConfig from 'next/config'
import React from 'react'

import { VedtakArkivering } from '../../../components/vedtak-arkivering/vedtak-arkivering'
import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak-felles'
import { skjønnsfastsattBrukerutbetaling } from '../../../data/testdata/data/vedtak/skjønnsfastsatt'
import { alleAvvisteDager } from '../../../data/testdata/data/vedtak/alleAvvisteDager'
import { delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo } from '../../../data/testdata/data/vedtak/delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo'
import { vedtakMedFlereArbeidsgivere } from '../../../data/testdata/data/vedtak/vedtakMedFlereArbeidsgivere'
import { revurderingVedtak } from '../../../data/testdata/data/vedtak/revurdering'
import { revurdertOgAnnullert } from '../../../data/testdata/data/personas/personas'

const { serverRuntimeConfig } = getConfig()

type UtviklingArkiveringPageProps = {
    vedtak: RSVedtakWrapper
    enabled: boolean
    alleVedtak: RSVedtakWrapper[]
}

const UtviklingArkiveringPage = ({ vedtak, enabled, alleVedtak }: UtviklingArkiveringPageProps) => {
    if (!enabled) {
        return <span>Disabled</span>
    }
    return <VedtakArkivering vedtak={vedtak} alleVedtak={alleVedtak} />
}

export const getServerSideProps: GetServerSideProps<UtviklingArkiveringPageProps> = async (ctx) => {
    const finnVedtak = (): { vedtak: RSVedtakWrapper; alleVedtak: RSVedtakWrapper[] } => {
        if (ctx.query.testperson === 'skjonnsfastsatt-brukerutbetaling') {
            return { vedtak: skjønnsfastsattBrukerutbetaling, alleVedtak: [skjønnsfastsattBrukerutbetaling] }
        }
        if (ctx.query.testperson === 'flere-arbeidsgivere') {
            return { vedtak: vedtakMedFlereArbeidsgivere, alleVedtak: [vedtakMedFlereArbeidsgivere] }
        }
        if (ctx.query.testperson === 'kombinasjon-delvisInnvilgelse-og-skjønnsfastsatt-fra-bomlo') {
            return {
                vedtak: delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo,
                alleVedtak: [delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo],
            }
        }
        if (ctx.query.testperson === 'revurdert-og-annullert') {
            return { vedtak: revurderingVedtak, alleVedtak: revurdertOgAnnullert.vedtak }
        }
        return { vedtak: alleAvvisteDager, alleVedtak: [alleAvvisteDager] }
    }

    const { vedtak, alleVedtak } = finnVedtak()

    ctx.res.setHeader('x-nais-app-image', 'testtest')
    ctx.res.setHeader('x-vedtak-fom', vedtak.vedtak.fom)
    ctx.res.setHeader('x-vedtak-tom', vedtak.vedtak.tom)
    return {
        props: {
            enabled: serverRuntimeConfig.utviklingArkivering === 'true',
            vedtak,
            alleVedtak: alleVedtak,
        },
    }
}

export default UtviklingArkiveringPage
