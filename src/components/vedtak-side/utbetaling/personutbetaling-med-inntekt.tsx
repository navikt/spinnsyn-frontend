import { BodyShort, Heading } from '@navikt/ds-react'
import React, { useContext } from 'react'

import { ArkiveringContext } from '../../../context/arkivering-context'
import { tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import { VedtakProps } from '../vedtak'
import VedtakPeriode from '../vedtak-periode/vedtak-periode'
import { spinnsynFrontendInterne } from '../../../utils/environment'
import UtbetalingPanel from '../../panel/utbetaling-panel'
import { finnOppsumertAvslag, hentBegrunnelse } from '../../../utils/vedtak-utils'

import { SykepengerTrekk } from './sykepenger-trekk'
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
                <Heading level="2" size="large">
                    {annullertEllerRevurdert ? (
                        <del>
                            {belop + ' kroner'}
                            <span className="sr-only">(ikke gjeldende)</span>
                        </del>
                    ) : (
                        <span>{belop + ' kroner'}</span>
                    )}
                    <BodyShort as="span" className="block">
                        {tekst('utbetaling.person.systemtittel')}
                    </BodyShort>
                </Heading>
            }
            erUgyldig={vedtak.revurdert || vedtak.annullert}
            dataTestId="personutbetaling"
        >
            <VedtakPeriode vedtak={vedtak} skalViseRefusjonsMottaker={true} />
            <OppsumertAvslagListe {...oppsumertAvslagObject}></OppsumertAvslagListe>
            <SykepengerTrekk />
            {!erInterne && !erArkivering && <Kontonummer />}
            <SykepengerNar />
        </UtbetalingPanel>
    )
}
