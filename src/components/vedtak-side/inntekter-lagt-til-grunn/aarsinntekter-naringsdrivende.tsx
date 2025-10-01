import { BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import { formaterValuta } from '../../../utils/valuta-utils'
import { RSVedtakUnion } from '../../../types/rs-types/rs-vedtak-felles'

import { InfoSection } from './info-seksjon'

export const AarsinntekterNaringsdrivende = ({ vedtak }: { vedtak: RSVedtakUnion }) => {
    if (
        vedtak.yrkesaktivitetstype == 'SELVSTENDIG' &&
        vedtak.sykepengegrunnlagsfakta?.selvstendig.pensjonsgivendeInntekter != undefined
    ) {
        return (
            <>
                <Heading level="2" size="medium">
                    Inntekten din
                </Heading>
                <BodyShort size="small" className="mt-3 mb-4">
                    (hentet fra Skatteetaten)
                </BodyShort>

                {vedtak.sykepengegrunnlagsfakta.selvstendig.pensjonsgivendeInntekter.map((inntekt) => (
                    <InfoSection key={inntekt.årstall} label={inntekt.årstall} value={formaterValuta(inntekt.beløp)} />
                ))}
            </>
        )
    }
}
