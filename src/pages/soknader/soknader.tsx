import './soknader.less'

import React, { useEffect } from 'react'

import Banner from '../../components/banner/banner'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import Teasere from '../../components/teaser/teasere'
import { useAppStore } from '../../data/stores/app-store'
import { Brodsmule  } from '../../types/types'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'


const brodsmuler: Brodsmule[] = [ {
    tittel: tekst('soknader.sidetittel'),
    sti: '/soknader',
    erKlikkbar: false
} ]

const Soknader = () => {
    const { vedtak } = useAppStore()

    useEffect(() => {
        setBodyClass('soknader')
    }, [])

    return (
        <>
            <Banner />
            <div className="limit">
                <Brodsmuler brodsmuler={brodsmuler} />
                <Teasere
                    className="soknader__teasere soknader--nye"
                    vedtak={vedtak}
                    tittel={tekst('spvedtak.teaser.nye')}
                    tomListeTekst={tekst('soknader.ingen-soknader')}
                />

            </div>
        </>
    )
}

export default Soknader
