import './soknader.less'

import React, { useEffect } from 'react'

import Banner from '../../components/banner/banner'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import Teasere from '../../components/teaser/teasere'
import Vis from '../../components/vis'
import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { Brodsmule, Soknad } from '../../types/types'
import { sorterEtterOpprettetDato, sorterEtterPerioder } from '../../utils/sorter-soknader'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'

export const filtrerOgSorterNyeSoknader = (soknader: Soknad[]) => {
    return soknader.filter(soknad =>
        soknad.status === RSSoknadstatus.NY || soknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING
    ).sort(sorterEtterOpprettetDato)
}

const brodsmuler: Brodsmule[] = [ {
    tittel: tekst('soknader.sidetittel'),
    sti: '/soknader',
    erKlikkbar: false
} ]

const Soknader = () => {
    const { soknader } = useAppStore()
    const nyeSoknader = filtrerOgSorterNyeSoknader(soknader)

    const tidligereSoknader = soknader
        .filter((soknad) =>
            soknad.status === RSSoknadstatus.SENDT
            || soknad.status === RSSoknadstatus.AVBRUTT
            || soknad.status === RSSoknadstatus.UTGAATT
        ).sort(sorterEtterPerioder)

    useEffect(() => {
        setBodyClass('soknader')
    }, [])

    return (
        <>
            <Banner />
            <div className='limit'>
                <Brodsmuler brodsmuler={brodsmuler} />
                <Teasere
                    className={'mb_nye_soknader'}
                    soknader={nyeSoknader}
                    tittel={tekst('spvedtak.teaser.nye')}
                    tomListeTekst={tekst('soknader.ingen-soknader')}
                    id='soknader-list-til-behandling'
                />

                <Vis hvis={tidligereSoknader.length > 0}>
                    <Teasere
                        soknader={tidligereSoknader}
                        tittel={tekst('spvedtak.teaser.tidligere')}
                        id='soknader-sendt'
                    />
                </Vis>
            </div>
        </>
    )
}

export default Soknader
