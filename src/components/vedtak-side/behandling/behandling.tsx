import { BodyLong, Heading } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'

import { tilLesbarDatoMedArstall } from '../../../utils/dato-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { LenkeMedAmplitude } from '../../lenke/lenke-med-amplitude'
import { VedtakProps } from '../vedtak'

export const Behandling = ({ vedtak }: VedtakProps) => {
    const automatisk = vedtak.vedtak.utbetaling.automatiskBehandling
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert
    const vedtaksDato = vedtak.vedtak.vedtakFattetTidspunkt
    const fastsatt = vedtak.vedtak.sykepengegrunnlagsfakta?.fastsatt
    const vedtakFastsattMed = fastsatt ? fastsatt.toString() : ''

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

    const behandlingInfoTekst = () => {
        return (
            <>
                {vedtaksDato && (
                    <>
                        {getLedetekst(tekst('behandling.dato-fattet'), {
                            '%DATO%': tilLesbarDatoMedArstall(dayjs(vedtaksDato).toDate()),
                        })}
                    </>
                )}

                {tekst(
                    annullertEllerRevurdert
                        ? 'behandling.opplysningene.preteritum'
                        : 'behandling.opplysningene.presens',
                )}
            </>
        )
    }

    return (
        <>
            <Heading data-cy="behandling-header" size="small" level="2" className="mt-4">
                {tekst(tittelNokkel())}
            </Heading>
            <BodyLong data-cy="behandling-body" spacing>
                {behandlingInfoTekst()}
                {tekst('behandling.se-opplysningene')}
                <LenkeMedAmplitude url={tekst('behandling.lenke.url')} tekst={tekst('behandling.lenke')} vedtakFastsattMed={vedtakFastsattMed} />
            </BodyLong>
        </>
    )
}
