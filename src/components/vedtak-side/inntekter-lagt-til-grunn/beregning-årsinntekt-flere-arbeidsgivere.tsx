import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { tekst } from '../../../utils/tekster'
import { formaterValuta } from '../../../utils/valuta-utils'
import { VedtakProps } from '../vedtak'

import { InfoSection } from './info-seksjon'

const BeregningÅrsinntektFlereArbeidsgivere = ({ vedtak }: VedtakProps) => {
    const andre = [] as { navn: string; årsinntekt: number }[]
    if (
        vedtak.vedtak.sykepengegrunnlagsfakta?.fastsatt == 'EtterHovedregel' ||
        vedtak.vedtak.sykepengegrunnlagsfakta?.fastsatt == 'EtterSkjønn'
    ) {
        vedtak.vedtak.sykepengegrunnlagsfakta.arbeidsgivere
            .filter((a) => {
                return a.arbeidsgiver != vedtak.vedtak.organisasjonsnummer
            })
            .forEach((a) => {
                andre.push({
                    navn: vedtak.organisasjoner[a.arbeidsgiver] || a.arbeidsgiver,
                    årsinntekt: a.omregnetÅrsinntekt,
                })
            })
    } else {
        Object.keys(vedtak.andreArbeidsgivere).forEach((a) => {
            andre.push({ navn: a, årsinntekt: vedtak.andreArbeidsgivere[a] })
        })
    }

    return (
        <>
            {andre.map((a, idx) => (
                <div key={idx}>
                    <BodyShort weight="semibold" data-testid={`annen-arbeidsgiver-${idx}`}>
                        {storeTilStoreOgSmå(a.navn)}
                    </BodyShort>
                    <InfoSection
                        ariaLabel={`${storeTilStoreOgSmå(a.navn)} ${tekst('utbetaling.inntekt.årsinntekt')}`}
                        label={tekst('utbetaling.inntekt.årsinntekt')}
                        value={formaterValuta(a.årsinntekt)}
                    />
                </div>
            ))}
        </>
    )
}

export default BeregningÅrsinntektFlereArbeidsgivere
