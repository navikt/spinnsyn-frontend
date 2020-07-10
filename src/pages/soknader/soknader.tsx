import './soknader.less'

import React, { useEffect } from 'react'
import { Select } from 'nav-frontend-skjema'
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
    // const [ sortering, setSortering ] = useState<any>(sorterEtterPerioder)

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
                    className="soknader__teasere"
                    soknader={nyeSoknader}
                    tittel={tekst('spvedtak.teaser.nye')}
                    tomListeTekst={tekst('soknader.ingen-soknader')}
                    id="soknader-nye"
                />

                <Vis hvis={tidligereSoknader.length > 0}>
                    <div className="soknader__sortering">
                        <Select bredde="l"
                            label={tekst('soknader.sorter.etter')}
                            // onChange={() => setSortering(sorterEtterOpprettetDato)}
                        >
                            <option value="dato">Dato</option>
                            <option value="periode">Periode</option>
                        </Select>
                    </div>
                    <Teasere
                        className="soknader__teasere"
                        soknader={tidligereSoknader}
                        tittel={tekst('spvedtak.teaser.tidligere')}
                        id="soknader-tidligere"
                    />
                </Vis>
            </div>
        </>
    )
}

export default Soknader
