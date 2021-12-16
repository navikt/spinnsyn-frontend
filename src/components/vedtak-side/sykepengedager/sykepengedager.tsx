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

            <div className="tekstinfo">
                <Systemtittel tag="h3" className="primo">
                    {vedtak.vedtak.utbetaling.gjenståendeSykedager}
                </Systemtittel>
                <Normaltekst>
                    {tekst('sykepengedager.systemtittel')}
                </Normaltekst>

                <Systemtittel tag="h3" className="segundo">
                    {sluttdato}
                </Systemtittel>
                <Normaltekst>
                    {tekst('sykepengedager.sluttdato')}
                </Normaltekst>

                <Normaltekst>{tekst('sykepengedager.sluttdato.tekst1')}</Normaltekst>
                <Normaltekst>{tekst('sykepengedager.sluttdato.tekst2')}</Normaltekst>
                <Normaltekst>{tekst('sykepengedager.sluttdato.tekst3')}</Normaltekst>
            </div>

            <EkspanderbarIntern erApen={false} className="sykepenger_slutt"
                tittel={tekst('sykepengedager.ekspanderbar')}
            >
                <Normaltekst>
                    {parser(tekst('sykepengedager.ekspanderbar.tekst'))}
                </Normaltekst>
            </EkspanderbarIntern>
        </Ekspanderbar>
    )
}

export default Sykepengedager
