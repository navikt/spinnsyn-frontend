import { BodyShort } from '@navikt/ds-react'
import React from 'react'
import cn from 'classnames';

import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { VedtakProps } from '../vedtak'


interface VedtakPeriodeProps extends VedtakProps {
    skalViseRefusjonsMottaker: boolean
}



const VedtakPeriode = ({ vedtak, skalViseRefusjonsMottaker }: VedtakPeriodeProps) => {
    const periode = tilLesbarPeriodeMedArstall(vedtak?.vedtak.fom, vedtak?.vedtak.tom)

    const erRefusjon = vedtak.sykepengebelopArbeidsgiver > 0


    // ternary her på utbetalingsmengde
    return (
        <div className={cn({'mb-2': !skalViseRefusjonsMottaker, 'mb-8': skalViseRefusjonsMottaker}, 'pb-2')}>
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
