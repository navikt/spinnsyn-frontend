import { BodyLong, Heading, Link } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { VedtakProps } from '../vedtak'

export const Behandling = ({ vedtak }: VedtakProps) => {
    const automatisk = vedtak.vedtak.utbetaling.automatiskBehandling
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert

    return (
        <div className="behandling tekstinfo">
            <Heading size="small" level="2">
                {tekst(automatisk ? 'behandling.automatisk.tittel' : 'behandling.manuell.tittel')}
            </Heading>
            <BodyLong spacing size="small">
                <Vis hvis={automatisk} render={() => <>
                    {tekst(annullertEllerRevurdert
                        ? 'behandling.behandlet.automatisk.preteritum'
                        : 'behandling.behandlet.automatisk.presens')}
                </>} />
                {
                    tekst(annullertEllerRevurdert
                        ? 'behandling.opplysningene.preteritum'
                        : 'behandling.opplysningene.presens')
                }
                <Link href={tekst('behandling.lenke.url')} target="_blank" rel="noopener noreferrer">
                    {tekst('behandling.lenke')}
                </Link>
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
