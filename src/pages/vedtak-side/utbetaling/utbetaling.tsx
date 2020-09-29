import './utbetaling.less'

import parser from 'html-react-parser'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import HandImg from '../../../components/teaser/hand.svg'
import Utvidbar from '../../../components/utvidbar/utvidbar'
import { useAppStore } from '../../../data/stores/app-store'
import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import { tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import { refusjonTilArbeidsgiverBeløp } from '../../../utils/vedtak-utils'

interface UtbetalingerProps {
    ekspandert: boolean;
}

const Utbetaling = ({ ekspandert }: UtbetalingerProps) => {
    const { valgtVedtak, soknader } = useAppStore()

    if (valgtVedtak === undefined) return null

    const org = valgtVedtak.vedtak.utbetalinger.find(u => u.fagområde === 'SPREF')?.mottaker
    const periode = tilLesbarPeriodeMedArstall(valgtVedtak.vedtak.fom, valgtVedtak.vedtak.tom)
    const belop = ValutaFormat.format(refusjonTilArbeidsgiverBeløp(valgtVedtak))
    const arbeidsgiver = soknader.find(s => s.arbeidsgiver?.orgnummer === org)?.arbeidsgiver?.navn

    return (
        <Utvidbar className={'gronn' + (ekspandert ? ' apen' : '')}
            erApen={ekspandert}
            ikon={HandImg}
            ikonHover={HandImg}
            tittel={belop + ' kroner'}
            systemtittel={tekst('vedtak.utbetaling.systemtittel')}
            ikonAltTekst="">
            <div className="utbetaling__innhold">
                <section>
                    <Normaltekst>
                        Fra dette beløpet blir det trukket skatt og eventuelt andre trekk før utbetalingen.
                    </Normaltekst>
                </section>
                <section>
                    <Utvidbar erApen={false} tittel="Hvordan beregnes beløpet?" type="intern" className="typo-normal">
                        {parser(tekst('vedtak.utbetaling.hvordan'))}
                    </Utvidbar>
                </section>
                <section>
                    <Element tag="h2">
                        Periode
                    </Element>
                    <Normaltekst>
                        {periode}
                    </Normaltekst>
                </section>
                <section>
                    <Element tag="h2">
                        Refunderes til
                    </Element>
                    <Normaltekst>
                        {arbeidsgiver}
                    </Normaltekst>
                </section>
                <section>
                    <Element tag="h2">
                        Organisasjonsnummer
                    </Element>
                    <Normaltekst>
                        {org?.match(/\d{3}/g)?.join(' ')}
                    </Normaltekst>
                </section>
            </div>
        </Utvidbar>
    )
}

export default Utbetaling
