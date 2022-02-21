import { BodyLong, Heading, Link } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import { LenkeMedAmplitude } from '../../lenke/lenke-med-amplitude'
import Vis from '../../vis'
import { VedtakProps } from '../vedtak'

export const Behandling = ({ vedtak }: VedtakProps) => {
    const automatisk = vedtak.vedtak.utbetaling.automatiskBehandling
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert

    const tittelNokkel = () => {
        if (annullertEllerRevurdert) {
            if (automatisk) {
                return 'behandling.automatisk.tittel.preteritum'
            }
            return 'behandling.manuell.tittel.preteritum'
        } else {
            if (automatisk) {
                return 'behandling.automatisk.tittel.presens'
            }
            return 'behandling.manuell.tittel.presens'
        }
    }

    return (
        <div className="behandling tekstinfo">
            <Heading size="small" level="2">
                {tekst(tittelNokkel())}
            </Heading>
            <BodyLong spacing size="small">
                {
                    tekst(annullertEllerRevurdert
                        ? 'behandling.opplysningene.preteritum'
                        : 'behandling.opplysningene.presens')
                }
                <LenkeMedAmplitude url={tekst('behandling.lenke.url')} tekst={tekst('behandling.lenke')} />
                {tekst('behandling.se-opplysningene')}
            </BodyLong>

            <Vis hvis={automatisk && annullertEllerRevurdert} render={() =>
                <BodyLong spacing size="small">
                    {tekst('behandling.ny-behandling')}
                </BodyLong>}
            />
        </div>
    )
}
