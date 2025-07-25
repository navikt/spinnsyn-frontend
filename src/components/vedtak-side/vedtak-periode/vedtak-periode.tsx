import { BodyShort } from '@navikt/ds-react'
import React from 'react'
import cn from 'classnames'

import { erWeekendPeriode, tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { VedtakProps } from '../vedtak'

interface VedtakPeriodeProps extends VedtakProps {
    skalViseRefusjonsMottaker?: boolean
}

const VedtakPeriode = ({ vedtak, skalViseRefusjonsMottaker }: VedtakPeriodeProps) => {
    const periode = tilLesbarPeriodeMedArstall(vedtak?.vedtak.fom, vedtak?.vedtak.tom)

    return (
        <div
            className={cn(
                {
                    'mb-2': !skalViseRefusjonsMottaker,
                    'mb-8 border-b border-gray-400':
                        skalViseRefusjonsMottaker || !erWeekendPeriode(vedtak.vedtak.tom, vedtak.vedtak.fom),
                },
                'pb-2',
            )}
        >
            <BodyShort className="mb-2">
                {vedtak.vedtak.vedtakstype === 'ARBEIDSTAKER' &&
                    getLedetekst(tekst('utbetaling.person.fra'), {
                        '%ARBEIDSGIVER%': storeTilStoreOgSmå(vedtak.orgnavn),
                    })}

                {vedtak.vedtak.vedtakstype === 'NARINGSDRIVENDE' &&
                    'Gjelder sykefravær som selvstendig næringsdrivende.'}
            </BodyShort>
            <BodyShort>Periode: {periode}</BodyShort>
        </div>
    )
}

export default VedtakPeriode
