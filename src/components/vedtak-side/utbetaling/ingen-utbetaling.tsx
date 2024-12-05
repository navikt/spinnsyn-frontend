import {BodyShort, Heading, Link, List} from '@navikt/ds-react'
import React, {useEffect, useRef, useState} from 'react'

import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { getLedetekst, tekst } from '../../../utils/tekster'
import VedtakPeriode from '../vedtak-periode/vedtak-periode'
import UtbetalingPanel from '../../panel/utbetaling-panel'
import { finnOppsumertAvslag, hentBegrunnelse } from '../../../utils/vedtak-utils'
import { RSVedtakWrapperUtvidet } from '../../../types/rs-types/rs-vedtak'
import { erWeekendPeriode } from '../../../utils/dato-utils'
import { useScroll } from '../../../context/scroll-context'

import { OppsumertAvslagListe, OppsumertAvslagListeProps } from './oppsumert-avslag-liste'

const IngenUtbetaling = ({ vedtak }: { vedtak: RSVedtakWrapperUtvidet }) => {
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert
    const ingenUtbetalingTittel = 'Ingen utbetaling'
    const utbetalingsType = vedtak.sykepengebelopPerson > 0 ? 'personutbetaling' : 'refusjon'
    const harBegrunnelseFraBomlo = hentBegrunnelse(vedtak, 'Avslag') !== undefined
    const oppsumertAvslagObject: OppsumertAvslagListeProps = {
        ...finnOppsumertAvslag(vedtak, 'alleDager'),
        harBegrunnelseFraBomlo,
    }
    // const { registrerElement, apneElementMedId } = useScroll()
    //
    // const [visBeregning, setVisBeregning] = useState<boolean>(false)
    // const [visBegrunnelse, setVisBegrunnelse] = useState<boolean>(false)
    //     const elementRef = useRef<HTMLDivElement>(null)
    //
    //
    // useEffect(() => {
    //     if (apneElementMedId === 'dager_ikke_nav') {
    //         setVisBegrunnelse(true)
    //         setVisBeregning(true)
    //     }
    // }, [apneElementMedId])
    //
    // useEffect(() => {
    //     if (elementRef.current !== null) {
    //         registrerElement('dager_ikke_nav', elementRef)
    //     }
    // }, [elementRef?.current?.id, registrerElement])


    const { blaTilElement} = useScroll()

    return (
        <UtbetalingPanel
            sectionLabel="Ingen utbetaling"
            avslag={oppsumertAvslagObject.oppsumertAvslag.size > 0}
            tittel={
                <Heading level="2" size="large">
                    {annullertEllerRevurdert ? (
                        <del>
                            {ingenUtbetalingTittel}
                            <span className="sr-only">(ikke gjeldende)</span>
                        </del>
                    ) : (
                        <span>{ingenUtbetalingTittel}</span>
                    )}
                    {vedtak.sykepengebelopArbeidsgiver > 0 && (
                        <BodyShort as="span" className="block">
                            {getLedetekst(tekst('utbetaling.arbeidsgiver.systemtittel'), {
                                '%ARBEIDSGIVER%': storeTilStoreOgSmå(vedtak.orgnavn),
                            })}
                        </BodyShort>
                    )}
                </Heading>
            }
            erUgyldig={annullertEllerRevurdert}
            dataCy={utbetalingsType}
        >
            <VedtakPeriode vedtak={vedtak} />
            {/*{JSON.toString()}*/}

            {erWeekendPeriode(vedtak.vedtak.fom, vedtak.vedtak.tom) && (
                <BodyShort>
                    <List as="ul" title="Hvorfor får jeg ingen utbetaling">

                        <List.Item>
                        {/*<Link                                         onClick={async (e) => {*/}
                        {/*                    e.preventDefault()*/}

                        {/*    apneElementMedId("utbetalingsdager")}*/}
                        {/*}*/}
                        {/*>*/}
                                Helg
                        {/*</Link>*/}



                        </List.Item>
                    </List>
                        <Link
                as="button"
                type="button"
                className="cursor-pointer"
                onClick={() =>
                    blaTilElement('mer_om_beregningen')
                }
            >
                Se nærmere begrunnelse her
            </Link>
                </BodyShort>
            )}
            <OppsumertAvslagListe {...oppsumertAvslagObject}></OppsumertAvslagListe>
        </UtbetalingPanel>
    )
}

export default IngenUtbetaling
