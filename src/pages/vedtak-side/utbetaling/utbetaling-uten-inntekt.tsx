import './utbetaling.less'

import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import HandImg from '../../../components/teaser/hand.svg'
import Utvidbar from '../../../components/utvidbar/utvidbar'
import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import { refusjonTilArbeidsgiverBeløp } from '../../../utils/vedtak-utils'
import FeilOpplysninger from './feil-opplysninger/feil-opplysninger'
import RefusjonInfo from './refusjon-info/refusjon-info'

interface UtbetalingerProps {
    ekspandert: boolean;
}

const UtbetalingUtenInntekt = ({ ekspandert }: UtbetalingerProps) => {
    const { valgtVedtak } = useAppStore()
    const [ belop, setBelop ] = useState<string>('-')

    useEffect(() => {
        setBelop(ValutaFormat.format(refusjonTilArbeidsgiverBeløp(valgtVedtak)))
    }, [ valgtVedtak ])

    if (valgtVedtak === undefined) return null

    return (
        <Utvidbar className={'gronn' + (ekspandert ? ' apen' : '')}
            erApen={ekspandert}
            ikon={HandImg}
            ikonHover={HandImg}
            tittel={belop + ' kroner'}
            systemtittel={tekst('utbetaling.systemtittel')}
            ikonAltTekst=""
            fixedHeight={true}
        >
            <div className="utbetaling__innhold">
                <Normaltekst>
                    {tekst('utbetaling.trekk')}
                </Normaltekst>
                <Utvidbar erApen={false} tittel="Slik beregner vi sykepengene?" type="intern" className="tekstinfo">
                    <Element className="tekstinfo__avsnitt">
                        {tekst('utbetaling.beregning.manedslonn.overskrift')}
                    </Element>
                    <Normaltekst>
                        {tekst('utbetaling.beregning.manedslonn.tekst')}
                    </Normaltekst>
                    <Element className="tekstinfo__avsnitt">
                        {tekst('utbetaling.beregning.arslonn.overskrift')}
                    </Element>
                    <Normaltekst>
                        {tekst('utbetaling.beregning.arslonn.tekst')}
                    </Normaltekst>
                    <Element className="tekstinfo__avsnitt">
                        {tekst('utbetaling.beregning.daglig.overskrift')}
                    </Element>
                    <Normaltekst>
                        {tekst('utbetaling.beregning.daglig.tekst')}
                    </Normaltekst>
                    <Element className="tekstinfo__avsnitt">
                        {tekst('utbetaling.beregning.total.overskrift')}
                    </Element>
                    <Normaltekst>
                        {tekst('utbetaling.beregning.total.tekst')}
                    </Normaltekst>
                    <Element className="tekstinfo__avsnitt">
                        {tekst('utbetaling.beregning.delvis.overskrift')}
                    </Element>
                    <Normaltekst>
                        {tekst('utbetaling.beregning.delvis.tekst')}
                    </Normaltekst>
                </Utvidbar>
                <FeilOpplysninger />
                <RefusjonInfo />
            </div>
        </Utvidbar>
    )
}

export default UtbetalingUtenInntekt
