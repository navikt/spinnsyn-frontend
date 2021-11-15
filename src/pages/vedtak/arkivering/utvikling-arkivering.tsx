import { GetServerSideProps } from 'next'
import getConfig from 'next/config'
import React from 'react'

import { VedtakArkivering } from '../../../components/vedtak-arkivering/vedtak-arkivering'
import { kombinertDirekteOgRefusjon } from '../../../data/mock/data/rs-vedtak'
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
        <VedtakArkivering vedtak={vedtak} fnr={'12345678910'} utbetalingId={'7db3a630-883f-4f9d-a545-7af13f4e3f9b'} />
    )
}

export const getServerSideProps: GetServerSideProps<DevVedtakProps> = async(ctx) => {
    const vedtak = kombinertDirekteOgRefusjon

    return {
        props: {
            enabled: serverRuntimeConfig.utviklingArkivering === 'true',
            vedtak,
        },
    }
}

export default UtviklingArkivering
