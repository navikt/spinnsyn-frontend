import './uenig.less'

import dayjs from 'dayjs'
import Lenke from 'nav-frontend-lenker'
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { tilLesbarDatoMedArstall } from '../../../utils/dato-utils'
import { tekst } from '../../../utils/tekster'

const Uenig = () => {
    const { valgtVedtak } = useAppStore()

    const klagefrist = tilLesbarDatoMedArstall(
        dayjs(valgtVedtak?.opprettet)
            .add(30, 'day')
            .toDate()
    )

    return (
        <div className="uenig">
            <Undertittel className="uenig__tittel">
                {tekst('uenig.tittel')}
            </Undertittel>
            <Normaltekst>
                Hvis du ikke er enig i resultatet, kan du klage.
                Les om <Lenke href="https://www.nav.no/no/nav-og-samfunn/kontakt-nav/klage-ris-og-ros/klagerettigheter" target="_blank">retten
                til å klage</Lenke>,
                eller gå rett til <Lenke href="https://www.nav.no/soknader/nb/person/helse/sykepenger/NAV%2000-03.00/klage/brev" target="_blank">klageveilederen</Lenke>
            </Normaltekst>
            <Element className="uenig__klagefrist">{'Klagefrist: ' + klagefrist}</Element>
        </div>
    )
}

export default Uenig
