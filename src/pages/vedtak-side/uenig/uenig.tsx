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

    const klagefrist = tilLesbarDatoMedArstall(     // TODO: Er dette godt nok? burde komme fra backend?
        dayjs(valgtVedtak?.opprettet)
            .add(30, 'day')
            .toDate()
    )

    // TODO: Sjekk om lenkene stemmer
    return (
        <div className="uenig">
            <Undertittel className="uenig__tittel">
                {tekst('uenig.tittel')}
            </Undertittel>
            <Normaltekst>
                Hvis du ikke er enig i resultatet, kan du klage.
                Les om <Lenke href="https://www.nav.no/no/nav-og-samfunn/kontakt-nav/klage-ris-og-ros/klagerettigheter">retten
                til å klage</Lenke>,
                eller gå rett til <Lenke href="https://www.nav.no/sosialhjelp/klage">klageveilederen</Lenke>
            </Normaltekst>
            <Element className="uenig__klagefrist">{'Klagefrist: ' + klagefrist}</Element>
        </div>
    )
}

export default Uenig
