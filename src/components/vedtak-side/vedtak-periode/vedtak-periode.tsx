import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { VedtakProps } from '../vedtak'

const VedtakPeriode = ({ vedtak }: VedtakProps) => {
    const periode = tilLesbarPeriodeMedArstall(vedtak?.vedtak.fom, vedtak?.vedtak.tom)

    return (
        <div className="mb-8 pb-2">
            <BodyShort>
                {getLedetekst(tekst('utbetaling.person.fra'), {
                    '%ARBEIDSGIVER%': storeTilStoreOgSmå(vedtak.orgnavn),
                })}
            </BodyShort>
            <BodyShort>Periode: {periode}</BodyShort>
        </div>
    )
}

export default VedtakPeriode
