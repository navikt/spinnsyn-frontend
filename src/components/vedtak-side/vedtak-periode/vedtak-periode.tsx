import { BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'
import cn from 'classnames'

import { antallDager, erWeekendPeriode, tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak-felles'

type VedtakPeriodeProps = {
    vedtak: RSVedtakWrapper
    skalViseRefusjonsMottaker?: boolean
    erKunArbeidsgiverPeriode?: boolean
    arbeidsgiverperiodeAvsluttetMedHelg?: boolean
}

const VedtakPeriode = ({
    vedtak,
    skalViseRefusjonsMottaker,
    erKunArbeidsgiverPeriode,
    arbeidsgiverperiodeAvsluttetMedHelg,
}: VedtakPeriodeProps) => {
    const periode = tilLesbarPeriodeMedArstall(vedtak?.vedtak.fom, vedtak?.vedtak.tom)
    const dager = antallDager(vedtak.vedtak.fom, vedtak.vedtak.tom)

    return (
        <div
            className={cn(
                {
                    'mb-2': !skalViseRefusjonsMottaker,
                    'mb-8 border-b border-ax-neutral-400':
                        skalViseRefusjonsMottaker || !erWeekendPeriode(vedtak.vedtak.tom, vedtak.vedtak.fom),
                },
                'pb-2',
            )}
        >
            <BodyShort className="mb-2">
                {vedtak.vedtak.yrkesaktivitetstype === 'ARBEIDSTAKER' &&
                    getLedetekst(tekst('utbetaling.person.fra'), {
                        '%ARBEIDSGIVER%': storeTilStoreOgSmå(vedtak.orgnavn),
                    })}

                {vedtak.vedtak.yrkesaktivitetstype === 'SELVSTENDIG' &&
                    'Gjelder sykefravær som selvstendig næringsdrivende.'}
            </BodyShort>
            <BodyShort spacing>
                Periode: {periode} ({dager} dager)
            </BodyShort>
            {(erKunArbeidsgiverPeriode || arbeidsgiverperiodeAvsluttetMedHelg) && (
                <>
                    <Heading size="small" className="border-t border-ax-neutral-400 pt-8">
                        {arbeidsgiverperiodeAvsluttetMedHelg
                            ? 'Derfor utbetaler ikke Nav sykepenger for denne perioden'
                            : 'Sykefraværet er innenfor arbeidsgiverperioden'}
                    </Heading>
                    <BodyShort className="mt-2">
                        Arbeidsgiverperioden er de første 16 dagene av et sykefravær. I denne perioden er det{' '}
                        {storeTilStoreOgSmå(vedtak.orgnavn)} som er ansvarlig for å utbetale sykepengene dine.
                        {arbeidsgiverperiodeAvsluttetMedHelg &&
                            ' Søknaden din inneholder også dager i helgen. Nav utbetaler ikke sykepenger for lørdager og søndager.'}
                    </BodyShort>
                </>
            )}
        </div>
    )
}

export default VedtakPeriode
