import { BodyShort, Heading } from '@navikt/ds-react'
import React, { useContext } from 'react'

import { ArkiveringContext } from '../../../context/arkivering-context'
import { tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import { VedtakProps } from '../vedtak'
import VedtakPeriode from '../vedtak-periode/vedtak-periode'
import { spinnsynFrontendInterne } from '../../../utils/environment'
import UtbetalingPanel from '../../panel/utbetaling-panel'

import { SykepengerTrekk } from './sykepenger-trekk'
import { Kontonummer } from './kontonummer'
import { SykepengerNar } from './accordion/sykepenger-nar'

export const PersonutbetalingMedInntekt = ({ vedtak }: VedtakProps) => {
    const erArkivering = useContext(ArkiveringContext)
    const erInterne = spinnsynFrontendInterne()
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert

    const belop = ValutaFormat.format(vedtak.sykepengebelopPerson)

    return (
        <UtbetalingPanel
            sectionLabel="Utbetaling til deg"
            tittel={
                <Heading data-cy="header-sykepenger-til-deg" level="2" size="large">
                    <del className={annullertEllerRevurdert ? 'line-through' : undefined}>
                        {belop + ' kroner'}
                        {annullertEllerRevurdert && (
                            <span className="absolute w-1 h-1 overflow-hidden -m-1 p-0 border-0 clip-[rect(0,0,0,0)]">
                                (annullert eller revudert)
                            </span>
                        )}
                    </del>
                    <BodyShort as="span" className="block">
                        {tekst('utbetaling.person.systemtittel')}
                    </BodyShort>
                </Heading>
            }
            erUgyldig={vedtak.revurdert || vedtak.annullert}
            dataCy="personutbetaling"
        >
            <VedtakPeriode vedtak={vedtak} />
            <SykepengerTrekk />
            {!erInterne && !erArkivering && <Kontonummer />}
            <SykepengerNar />
        </UtbetalingPanel>
    )
}
