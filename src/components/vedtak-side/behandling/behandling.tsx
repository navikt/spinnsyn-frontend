import { BodyLong, Heading, Link } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import { LenkeMedAmplitude } from '../../lenke/lenke-med-amplitude'
import Vis from '../../vis'
import { VedtakProps } from '../vedtak'

export const Behandling = ({ vedtak }: VedtakProps) => {
    const automatisk = vedtak.vedtak.utbetaling.automatiskBehandling
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert

    const tittelNokkel = ()=> {
        if(automatisk){
            if (annullertEllerRevurdert) {
                return 'behandling.automatisk.tittel.preteritum'
            } else {
                return 'behandling.automatisk.tittel.presens'
            }
        }
        return 'behandling.manuell.tittel'
    }

    return (
        <div className="behandling tekstinfo">
            <Heading size="small" level="2">
                {tekst(tittelNokkel())}
            </Heading>
            <BodyLong spacing>
                {
                    tekst(annullertEllerRevurdert
                        ? 'behandling.opplysningene.preteritum'
                        : 'behandling.opplysningene.presens')
                }
                <LenkeMedAmplitude url={tekst('behandling.lenke.url')} tekst={tekst('behandling.lenke')} />
                {tekst('behandling.se-opplysningene')}
            </BodyLong>

            <Vis hvis={automatisk && annullertEllerRevurdert} render={() =>
                <BodyLong spacing>
                    {tekst('behandling.ny-behandling')}
                </BodyLong>}
            />
        </div>
    )
}
