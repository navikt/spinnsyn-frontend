import dayjs, { Dayjs } from 'dayjs'
import parser from 'html-react-parser'
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useState } from 'react'

import { tekst } from '../../../utils/tekster'
import { fallbackEstimertSluttdato } from '../../../utils/vedtak-utils'
import Utvidbar from '../../utvidbar/utvidbar'
import { VedtakProps } from '../vedtak'

const Sykepengedager = ({ vedtak }: VedtakProps) => {
    const [ apen ] = useState<boolean>(false)


    const finnSluttdato = (): Dayjs => {
        if (vedtak.vedtak.utbetaling.foreløpigBeregnetSluttPåSykepenger) {
            return dayjs(vedtak.vedtak.utbetaling.foreløpigBeregnetSluttPåSykepenger)
        }
        return fallbackEstimertSluttdato(vedtak)
    }
    const sluttdato = finnSluttdato().format('D. MMM YYYY')

    return (
        <Utvidbar type="integrert" className={'blokkinfo bla' + (apen ? ' apen' : '')}
            erApen={apen}
            ikon={'/syk/sykepenger/static/img/ikon-plaster.svg'}
            ikonHover={'/syk/sykepenger/static/img/ikon-plaster.svg'}
            visLukk={true}
            tittel={vedtak.vedtak.utbetaling.forbrukteSykedager} ikonAltTekst=""
            systemtittel={tekst('sykepengedager.hittil')} heading="h2"
        >

            <Systemtittel tag="h3" className="tekstinfo__avsnitt">
                {vedtak.vedtak.utbetaling.gjenståendeSykedager}
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
