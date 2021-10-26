import parser from 'html-react-parser'
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useState } from 'react'

import PlasterIkon from '../../../../public/syk/sykepenger/static/img/ikon-plaster.svg'
import Utvidbar from '../../../components/utvidbar/utvidbar'
import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import { estimertSluttdato } from '../../../utils/vedtak-utils'

const Sykepengedager = () => {
    const { valgtVedtak } = useAppStore()
    const [ apen ] = useState<boolean>(false)

    if (!valgtVedtak) return null

    const sluttdato = estimertSluttdato(valgtVedtak)

    return (
        <Utvidbar type="integrert" className={'blokkinfo bla' + (apen ? ' apen' : '')}
            erApen={apen}
            ikon={'/syk/sykepenger/static/img/ikon-plaster.svg'}
            ikonHover={'/syk/sykepenger/static/img/ikon-plaster.svg'}
            visLukk={true}
            tittel={valgtVedtak.vedtak.utbetaling.forbrukteSykedager} ikonAltTekst=""
            systemtittel={tekst('sykepengedager.hittil')} heading="h2"
        >

            <Systemtittel tag="h3" className="tekstinfo__avsnitt">
                {valgtVedtak.vedtak.utbetaling.gjenståendeSykedager}
                <Normaltekst tag="span">
                    <br />{tekst('sykepengedager.systemtittel')}
                </Normaltekst>
            </Systemtittel>

            <Systemtittel tag="h3" className="tekstinfo__avsnitt">
                {sluttdato}
                <Normaltekst tag="span" className="">
                    <br />{tekst('sykepengedager.sluttdato')}
                </Normaltekst>
            </Systemtittel>

            <Normaltekst className="tekstinfo__avsnitt">
                {tekst('sykepengedager.sluttdato.tekst1')}
            </Normaltekst>

            <Normaltekst className="tekstinfo__avsnitt">
                {tekst('sykepengedager.sluttdato.tekst2')}
            </Normaltekst>

            <Normaltekst className="tekstinfo__avsnitt">
                {tekst('sykepengedager.sluttdato.tekst3')}
            </Normaltekst>

            <Utvidbar erApen={false} type="intern" className="tekstinfo"
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
