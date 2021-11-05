import { GetServerSideProps } from 'next'
import getConfig from 'next/config'
import React from 'react'

import { VedtakArkivering } from '../../../components/vedtak-arkivering/vedtak-arkivering'
import Vedtak from '../../../components/vedtak-side/vedtak'
import { ArkiveringContext } from '../../../context/arkivering-context'
import { vedtakMed40Grad } from '../../../data/mock/data/rs-vedtak'
import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'

const { serverRuntimeConfig } = getConfig()

export interface DevVedtakProps {
    vedtak: RSVedtakWrapper,
    enabled: boolean
}


const UtviklingArkivering = ({ vedtak, enabled }: DevVedtakProps) => {
    if (!enabled) {
        return <span>Disabled</span>
    }
    return (
        <VedtakArkivering vedtak={vedtak} fnr={'12345678910'} />
    )
}

export const getServerSideProps: GetServerSideProps<DevVedtakProps> = async(ctx) => {
    const vedtak = vedtakMed40Grad

    return {
        props: {
            enabled: serverRuntimeConfig.utviklingArkivering === 'true',
            vedtak,
        },
    }
}

export default UtviklingArkivering
