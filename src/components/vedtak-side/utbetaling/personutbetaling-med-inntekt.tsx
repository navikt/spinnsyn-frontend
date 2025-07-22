import { BodyShort, Heading } from '@navikt/ds-react'
import React, { useContext } from 'react'

import { ArkiveringContext } from '../../../context/arkivering-context'
import { ValutaFormat } from '../../../utils/valuta-utils'
import { VedtakProps } from '../vedtak'
import VedtakPeriode from '../vedtak-periode/vedtak-periode'
import { spinnsynFrontendInterne } from '../../../utils/environment'
import UtbetalingPanel from '../../panel/utbetaling-panel'
import { finnOppsumertAvslag, hentBegrunnelse } from '../../../utils/vedtak-utils'

import { Kontonummer } from './kontonummer'
import { SykepengerNar } from './accordion/sykepenger-nar'
import { OppsumertAvslagListe, OppsumertAvslagListeProps } from './oppsumert-avslag-liste'

export const PersonutbetalingMedInntekt = ({ vedtak }: VedtakProps) => {
    const erArkivering = useContext(ArkiveringContext)
    const erInterne = spinnsynFrontendInterne()
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert

    const belop = ValutaFormat.format(vedtak.sykepengebelopPerson)
    const harBegrunnelseFraBomlo = hentBegrunnelse(vedtak, 'DelvisInnvilgelse') !== undefined
    const oppsumertAvslagObject: OppsumertAvslagListeProps = {
        ...finnOppsumertAvslag(vedtak, 'dagerPerson'),
        harBegrunnelseFraBomlo,
        vedtak,
    }
    return (
        <UtbetalingPanel
            sectionLabel="Utbetaling til deg"
            delvisInnvilgelse={oppsumertAvslagObject.oppsumertAvslag.size > 0}
            tittel={
                <div>
                    <BodyShort className="mb-4">Du får utbetalt:</BodyShort>
                    <Heading level="2" size="large">
                        {annullertEllerRevurdert ? (
                            <del>
                                {belop + ' kr'}
                                <span className="sr-only">(ikke gjeldende)</span>
                            </del>
                        ) : (
                            <span>{belop + ' kr'}</span>
                        )}
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
