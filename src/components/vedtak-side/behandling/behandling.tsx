import Lenke from 'nav-frontend-lenker'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { VedtakProps } from '../vedtak'

export const Behandling = ({ vedtak }: VedtakProps) => {
    const automatisk = vedtak.vedtak.utbetaling.automatiskBehandling
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert

    return (
        <div className="tekstinfo">
            <Undertittel>
                {tekst(automatisk ? 'behandling.automatisk.tittel' : 'behandling.manuell.tittel')}
            </Undertittel>
            <Normaltekst>
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
                <Lenke href={tekst('behandling.lenke.url')} target="_blank" rel="noopener noreferrer">
                    {tekst('behandling.lenke')}
                </Lenke>
                {tekst('behandling.se-opplysningene')}
            </Normaltekst>

            <Vis hvis={automatisk && annullertEllerRevurdert} render={() =>
                <Normaltekst>
                    {tekst('behandling.ny-behandling')}
                </Normaltekst>}
            />
        </div>
    )
}
