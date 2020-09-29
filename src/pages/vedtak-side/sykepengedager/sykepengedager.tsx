import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import parser from 'html-react-parser'
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import Utvidbar from '../../../components/utvidbar/utvidbar'
import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import LedningImg from './ikon-sykefravaersoversikt.svg'

dayjs.extend(weekday)

const Sykepengedager = () => {
    const { valgtVedtak } = useAppStore()
    const [ apen ] = useState<boolean>(false)

    const kalkulerSluttdato = () => {
        let slutt = dayjs(valgtVedtak!.vedtak.tom)
        let x = 0
        while (x < valgtVedtak!.vedtak.gjenståendeSykedager) {
            slutt = slutt.add(1,'day')
            while (slutt.weekday() > 0 && slutt.weekday() < 6) {
                slutt = slutt.add(1, 'day')
            }
            x++
        }
        return slutt.format('D. MMM YYYY')
    }

    useEffect(() => {
        // console.log('hei'); // eslint-disable-line
    }, [])

    if (valgtVedtak === undefined) return null

    return (
        <Utvidbar className={'bla' + (apen ? ' apen' : '')}
            erApen={apen} ikon={LedningImg} ikonHover={LedningImg}
            tittel={valgtVedtak.vedtak.gjenståendeSykedager} ikonAltTekst=""
            systemtittel={tekst('sykepengedager.systemtittel')}
        >
            <div className="avsnitt hittil">
                <Systemtittel tag="h3">
                    {valgtVedtak.vedtak.forbrukteSykedager}
                </Systemtittel>
                <Normaltekst className="utbetaling__innhold">
                    {tekst('sykepengedager.hittil')}
                </Normaltekst>
            </div>
            <div className="avsnitt sluttdato">
                <Systemtittel tag="h3">
                    {kalkulerSluttdato()}
                </Systemtittel>
                <Normaltekst className="utbetaling__innhold">
                    {tekst('sykepengedager.sluttdato')}
                </Normaltekst>
            </div>
            <Utvidbar erApen={false} type="intern"
                tittel={tekst('sykepengedager.ekspanderbar')}
            >
                <Normaltekst className="avsnitt">
                    {tekst('sykepengedager.ekspanderbar.tekst1')}
                </Normaltekst>
                <Normaltekst className="avsnitt">
                    {parser(tekst('sykepengedager.ekspanderbar.tekst2'))}
                </Normaltekst>
            </Utvidbar>
        </Utvidbar>
    )
}

export default Sykepengedager
