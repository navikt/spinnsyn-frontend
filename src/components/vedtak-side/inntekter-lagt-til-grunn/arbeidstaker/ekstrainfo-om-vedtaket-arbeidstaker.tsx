import { Alert, BodyShort, Link } from '@navikt/ds-react'
import React from 'react'

import { formaterValuta, formatOneDecimal } from '../../../../utils/valuta-utils'
import { tekst } from '../../../../utils/tekster'
import { RSVedtakArbeidstaker } from '../../../../types/rs-types/rs-vedtak-felles'
import { Under2G } from '../under-2G'
import { InfoSection } from '../info-seksjon'
import { inntektInfoTekster } from '../inntekt-info-tekster'

export const EkstrainfoOmVedtaketArbeidstaker = ({ vedtak }: { vedtak: RSVedtakArbeidstaker }) => {
    const over25prosentAvvik =
        vedtak.sykepengegrunnlagsfakta?.fastsatt === 'EtterSkjønn' && vedtak.sykepengegrunnlagsfakta?.avviksprosent > 25

    return (
        <>
            {vedtak.sykepengegrunnlagsfakta?.fastsatt === 'EtterSkjønn' && (
                <>
                    <InfoSection
                        className="mt-4 border-t border-gray-400 pt-4"
                        label="Årsinntekt rapportert til skatteetaten"
                        value={formaterValuta(vedtak.sykepengegrunnlagsfakta.innrapportertÅrsinntekt)}
                    />
                    <InfoSection
                        label="Utregnet avvik"
                        value={`${formatOneDecimal(vedtak.sykepengegrunnlagsfakta.avviksprosent)} %`}
                    />
                    {over25prosentAvvik && (
                        <Alert variant="info" className="my-2">
                            <BodyShort size="small">{inntektInfoTekster['25%avvik-skjønnsfastsatt']}</BodyShort>
                        </Alert>
                    )}
                    <InfoSection
                        label="Skjønnsfastsatt årsinntekt"
                        value={formaterValuta(vedtak.sykepengegrunnlagsfakta.skjønnsfastsatt)}
                    />
                </>
            )}
            {vedtak.sykepengegrunnlag && (
                <InfoSection
                    bold
                    className="mt-4 border-t border-gray-400 pt-4"
                    label={tekst('utbetaling.sykepengegrunnlag')}
                    value={formaterValuta(vedtak.sykepengegrunnlag)}
                />
            )}
            {vedtak.begrensning === 'ER_6G_BEGRENSET' && vedtak.sykepengegrunnlag && (
                <>
                    <BodyShort size="small" className="mt-4 pt-4" spacing>
                        Sykepengegrunnlaget ditt er begrenset til seks ganger{' '}
                        <Link href="https://www.nav.no/grunnbelopet">grunnbeløpet i folketrygden (6 G)</Link>:{' '}
                        {formaterValuta(vedtak.sykepengegrunnlag)}
                    </BodyShort>
                </>
            )}
            <Under2G tags={vedtak.tags} />
        </>
    )
}
