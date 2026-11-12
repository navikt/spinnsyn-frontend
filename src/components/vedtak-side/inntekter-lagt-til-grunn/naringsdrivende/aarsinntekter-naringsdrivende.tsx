import { BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import { formaterValuta } from '../../../../utils/valuta-utils'
import { RSVedtakUnion } from '../../../../types/rs-types/rs-vedtak-felles'
import { InfoSection } from '../info-seksjon'
import { tekst } from '../../../../utils/tekster'

export const AarsinntekterNaringsdrivende = ({ vedtak }: { vedtak: RSVedtakUnion }) => {
    if (
        vedtak.yrkesaktivitetstype == 'SELVSTENDIG' &&
        vedtak.sykepengegrunnlagsfakta?.selvstendig.pensjonsgivendeInntekter
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

                {vedtak.sykepengegrunnlagsfakta.selvstendig.beregningsgrunnlag && (
                    <>
                        <InfoSection
                            className="mt-4 mb-4"
                            bold
                            label={tekst('utbetaling.justertinntekt')}
                            value={formaterValuta(vedtak.sykepengegrunnlagsfakta.selvstendig.beregningsgrunnlag)}
                        />
                        <BodyShort size="small" spacing>
                            Vi har justert inntekten for hvert år etter grunnbeløpet (G) og regnet ut gjennomsnittet.
                        </BodyShort>
                    </>
                )}
            </>
        )
    }
}
