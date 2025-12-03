import { BodyShort, Heading } from '@navikt/ds-react'
import React, { useContext } from 'react'

import { ArkiveringContext } from '../../../context/arkivering-context'
import { ValutaFormat } from '../../../utils/valuta-utils'
import { VedtakProps } from '../vedtak'
import VedtakPeriode from '../vedtak-periode/vedtak-periode'
import { spinnsynFrontendInterne } from '../../../utils/environment'
import UtbetalingPanel from '../../panel/utbetaling-panel'
import { unikeAvslagBegrunnelser, hentBegrunnelse } from '../../../utils/vedtak-utils'

import { Kontonummer } from './kontonummer'
import { SykepengerNar } from './accordion/sykepenger-nar'
import { OppsumertAvslagListe, OppsummertAvslagListeProps } from './oppsumert-avslag-liste'

export const PersonutbetalingMedInntekt = ({ vedtak }: VedtakProps) => {
    const erArkivering = useContext(ArkiveringContext)
    const erInterne = spinnsynFrontendInterne()

    const belop = ValutaFormat.format(vedtak.sykepengebelopPerson)
    const harBegrunnelseFraBomlo = hentBegrunnelse(vedtak, 'DelvisInnvilgelse') !== undefined
    const avslagBegrunnelser = unikeAvslagBegrunnelser(vedtak.dagerArbeidsgiver)
    const oppsumertAvslagObject: OppsummertAvslagListeProps = {
        title: 'Noen av dagene er ikke innvilget fordi:',
        oppsummertAvslag: avslagBegrunnelser,
        harBegrunnelseFraBomlo,
        vedtak,
        dagTabellScrollElement: 'sykepenger_per_dag',
    }

    return (
        <UtbetalingPanel
            sectionLabel="Utbetaling til deg"
            delvisInnvilgelse={oppsumertAvslagObject.oppsummertAvslag.size > 0}
            tittel={
                <div>
                    <Heading level="2" size="large">
                        {belop + ' kr'}
                        <BodyShort as="span" className="block">
                            Utbetales til deg
                        </BodyShort>
                    </Heading>
                </div>
            }
            erUgyldig={vedtak.revurdert || vedtak.annullert}
            dataTestId="personutbetaling"
        >
            <VedtakPeriode vedtak={vedtak} skalViseRefusjonsMottaker={true} />
            <OppsumertAvslagListe {...oppsumertAvslagObject}></OppsumertAvslagListe>

            {!erInterne && !erArkivering && <Kontonummer />}
            <SykepengerNar />
        </UtbetalingPanel>
    )
}
