import { Accordion, BodyShort, Heading } from '@navikt/ds-react'
import React, { useContext } from 'react'

import { ArkiveringContext } from '../../../context/arkivering-context'
import { tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import Vis from '../../vis'
import { VedtakProps } from '../vedtak'
import VedtakPeriode from '../vedtak-periode/vedtak-periode'
import { spinnsynFrontendInterne } from '../../../utils/environment'
import UtbetalingPanel from '../../panel/utbetaling-panel'

import BeregningInfo from './accordion/beregning-info'
import { SykepengerTrekk } from './sykepenger-trekk'
import InntektInfo from './accordion/inntekt-info/inntekt-info'
import { Kontonummer } from './kontonummer'
import { SykepengerNar } from './accordion/sykepenger-nar'
import { SykepengerPerDag } from './accordion/sykepenger-per-dag'

export const PersonutbetalingMedInntekt = ({ vedtak }: VedtakProps) => {
    const erArkivering = useContext(ArkiveringContext)
    const erInterne = spinnsynFrontendInterne()

    const belop = ValutaFormat.format(vedtak.sykepengebelopPerson)

    return (
        <UtbetalingPanel
            tittel={
                <>
                    <Heading level="2" size="large">
                        {belop + ' kroner'}
                        <BodyShort as="span">{tekst('utbetaling.person.systemtittel')}</BodyShort>
                    </Heading>
                </>
            }
            erUgyldig={vedtak.revurdert || vedtak.annullert}
            dataCy="personutbetaling"
        >
            <>
                <VedtakPeriode vedtak={vedtak} />

                <SykepengerTrekk />

                <Vis hvis={!erInterne && !erArkivering} render={() => <Kontonummer />} />

                <Accordion>
                    <SykepengerNar />

                    <InntektInfo vedtak={vedtak} />

                    <SykepengerPerDag dager={vedtak.dagerPerson} />

                    <BeregningInfo vedtak={vedtak} mottaker={'person'} />
                </Accordion>
            </>
        </UtbetalingPanel>
    )
}
