import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { tekst } from '../../../utils/tekster'
import { formaterValuta } from '../../../utils/valuta-utils'
import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak-felles'

import { InfoSection } from './info-seksjon'

type BeregningÅrsinntektFlereArbeidsgivereProps = { vedtak: RSVedtakWrapper }

const BeregningÅrsinntektFlereArbeidsgivere = ({ vedtak }: BeregningÅrsinntektFlereArbeidsgivereProps) => {
    if (vedtak.vedtak.yrkesaktivitetstype !== 'ARBEIDSTAKER') {
        return null
    }
    const arbeidstakerVedtak = vedtak.vedtak
    const andre = [] as { navn: string; årsinntekt: number }[]
    if (
        arbeidstakerVedtak.sykepengegrunnlagsfakta?.fastsatt == 'EtterHovedregel' ||
        arbeidstakerVedtak.sykepengegrunnlagsfakta?.fastsatt == 'EtterSkjønn'
    ) {
        arbeidstakerVedtak.sykepengegrunnlagsfakta.arbeidsgivere
            .filter((a) => a.arbeidsgiver != arbeidstakerVedtak.organisasjonsnummer)
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
