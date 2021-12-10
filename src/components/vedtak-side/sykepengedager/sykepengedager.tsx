import dayjs, { Dayjs } from 'dayjs'
import parser from 'html-react-parser'
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useState } from 'react'

import { tekst } from '../../../utils/tekster'
import { fallbackEstimertSluttdato } from '../../../utils/vedtak-utils'
import Ekspanderbar from '../../ekspanderbar/ekspanderbar'
import EkspanderbarIntern from '../../ekspanderbar/ekspanderbar-intern'
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
        <Ekspanderbar type="bla"
            erApen={apen}
            tittel={
                <div className="ekspanderbar__tittel">
                    <Systemtittel tag="h3">
                        {vedtak.vedtak.utbetaling.forbrukteSykedager}
                    </Systemtittel>
                    <Normaltekst>
                        {tekst('sykepengedager.hittil')}
                    </Normaltekst>
                </div>
            }
        >

            <div className="tekstinfo__avsnitt">
                <Systemtittel tag="h3">
                    {vedtak.vedtak.utbetaling.gjenståendeSykedager}
                </Systemtittel>
                <Normaltekst tag="span">
                    {tekst('sykepengedager.systemtittel')}
                </Normaltekst>
            </div>

            <div className="tekstinfo__avsnitt">
                <Systemtittel tag="h3">
                    {sluttdato}
                </Systemtittel>
                <Normaltekst tag="span">
                    {tekst('sykepengedager.sluttdato')}
                </Normaltekst>
            </div>

            <div className="tekstinfo__avsnitt">
                <Normaltekst>{tekst('sykepengedager.sluttdato.tekst1')}</Normaltekst>
            </div>

            <div className="tekstinfo__avsnitt">
                <Normaltekst>{tekst('sykepengedager.sluttdato.tekst2')}</Normaltekst>
            </div>

            <div className="tekstinfo__avsnitt">
                <Normaltekst>{tekst('sykepengedager.sluttdato.tekst3')}</Normaltekst>
            </div>

            <EkspanderbarIntern erApen={false} className="blokkinfo tekstinfo"
                tittel={tekst('sykepengedager.ekspanderbar')}
            >
                <Normaltekst className="blokkinfo__avsnitt">
                    {parser(tekst('sykepengedager.ekspanderbar.tekst'))}
                </Normaltekst>
            </EkspanderbarIntern>
        </Ekspanderbar>
    )
}

export default Sykepengedager
