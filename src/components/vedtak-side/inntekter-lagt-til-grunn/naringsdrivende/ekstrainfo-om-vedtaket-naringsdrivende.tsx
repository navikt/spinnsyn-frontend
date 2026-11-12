import { BodyShort, Link } from '@navikt/ds-react'
import React from 'react'

import { formaterValuta } from '../../../../utils/valuta-utils'
import { tekst } from '../../../../utils/tekster'
import { RSVedtakSelvstendig } from '../../../../types/rs-types/rs-vedtak-felles'
import { Under2G } from '../under-2G'
import { InfoSection } from '../info-seksjon'

export const EkstrainfoOmVedtaketNaringsdrivende = ({ vedtak }: { vedtak: RSVedtakSelvstendig }) => {
    return (
        <>
            {vedtak.sykepengegrunnlag && (
                <InfoSection
                    bold
                    size="large"
                    className="mt-4 border-t border-ax-neutral-400 pt-4"
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
