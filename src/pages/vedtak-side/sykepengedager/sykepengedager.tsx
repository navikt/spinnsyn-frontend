import './sykepengedager.less'

import parser from 'html-react-parser'
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useState } from 'react'

import Utvidbar from '../../../components/utvidbar/utvidbar'
import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import { estimertSluttdato } from '../../../utils/vedtak-utils'
import LedningImg from './ikon-sykefravaersoversikt.svg'

const Sykepengedager = () => {
    const { valgtVedtak } = useAppStore()
    const [ apen ] = useState<boolean>(false)
    const sluttdato = estimertSluttdato(valgtVedtak)

    if (valgtVedtak === undefined) return null

    return (
        <Utvidbar className={'blokkinfo bla' + (apen ? ' apen' : '')}
            erApen={apen} ikon={LedningImg} ikonHover={LedningImg} visLukk={true}
            tittel={valgtVedtak.vedtak.utbetaling.forbrukteSykedager} ikonAltTekst=""
            systemtittel={tekst('sykepengedager.hittil')}
        >

            <Systemtittel tag="h3" className="tekstinfo__avsnitt">
                {valgtVedtak.vedtak.utbetaling.gjenståendeSykedager}
            </Systemtittel>
            <Normaltekst className="">
                {tekst('sykepengedager.systemtittel')}
            </Normaltekst>

            <Systemtittel tag="h3" className="tekstinfo__avsnitt">
                {sluttdato}
            </Systemtittel>
            <Normaltekst className="">
                {tekst('sykepengedager.sluttdato')}
            </Normaltekst>

            <Normaltekst className="tekstinfo__avsnitt">
                {tekst('sykepengedager.sluttdato.tekst1')}
            </Normaltekst>

            <Normaltekst className="tekstinfo__avsnitt">
                {tekst('sykepengedager.sluttdato.tekst2')}
            </Normaltekst>

            <Normaltekst className="tekstinfo__avsnitt">
                {tekst('sykepengedager.sluttdato.tekst3')}
            </Normaltekst>

            <Utvidbar erApen={false} type="intern"
                tittel={tekst('sykepengedager.ekspanderbar')}
            >
                <Normaltekst className="blokkinfo__avsnitt">
                    {parser(tekst('sykepengedager.ekspanderbar.tekst'))}
                </Normaltekst>
            </Utvidbar>
        </Utvidbar>
    )
}

export default Sykepengedager
