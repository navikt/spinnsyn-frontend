import './utbetaling.less'

import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import HandImg from '../../../components/teaser/hand.svg'
import Utvidbar from '../../../components/utvidbar/utvidbar'
import { useAppStore } from '../../../data/stores/app-store'
import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import { tekst } from '../../../utils/tekster'
import { refusjonTilArbeidsgiverBeløp } from '../../../utils/vedtak-utils'

interface UtbetalingerProps {
    ekspandert: boolean;
}

const Utbetaling = ({ ekspandert }: UtbetalingerProps) => {
    const { valgtVedtak } = useAppStore()

    if (valgtVedtak === undefined) return null

    const org = valgtVedtak.vedtak.utbetalinger[0].mottaker
    const periode = tilLesbarPeriodeMedArstall(valgtVedtak.vedtak.fom, valgtVedtak.vedtak.tom)
    const belop = refusjonTilArbeidsgiverBeløp(valgtVedtak) // TODO: Hvor mange desimaler, bruke ValutaFormat?

    return (
        <Utvidbar className={'gronn' + (ekspandert ? ' apen' : '')}
            erApen={ekspandert}
            ikon={HandImg}
            ikonHover={HandImg}
            tittel={belop + ' kroner'}
            undertittel={tekst('vedtak.utbetaling.undertittel')}
            ikonAltTekst="">
            <div className="utbetaling__innhold">
                <section>
                    <Normaltekst>
                        Fra dette beløpet blir det trukket skatt og eventuelt andre trekk før utbetalingen.
                    </Normaltekst>
                </section>
                <section>
                    <Normaltekst>
                        <Utvidbar erApen={false} tittel="Hvordan beregnes beløpet?" type="intern">
                            innhold
                        </Utvidbar>
                    </Normaltekst>
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
                        ARB - Denne kan vi ikke finne uten søknadene
                    </Normaltekst>
                </section>
                <section>
                    <Element tag="h2">
                        Organisasjonsnummer
                    </Element>
                    <Normaltekst>
                        {org}
                    </Normaltekst>
                </section>
            </div>
        </Utvidbar>
    )
}

export default Utbetaling
