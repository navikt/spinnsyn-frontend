import { BodyShort, Heading, Link, List } from '@navikt/ds-react'

import VedtakPeriode from '../vedtak-periode/vedtak-periode'
import UtbetalingPanel from '../../panel/utbetaling-panel'
import {
    unikeAvslagBegrunnelser,
    hentBegrunnelse,
    finnInnvilgetMerke,
    erKunArbeidsgiverPeriode,
} from '../../../utils/vedtak-utils'
import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak-felles'
import { erWeekendPeriode } from '../../../utils/dato-utils'
import { dagErInnvilget } from '../vedtak'

import { OppsumertAvslagListe, OppsummertAvslagListeProps } from './oppsumert-avslag-liste'

export const IngenUtbetaling = ({ vedtak }: { vedtak: RSVedtakWrapper }) => {
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert
    const harAvslagBegrunnelseFraBomlo = hentBegrunnelse(vedtak, 'Avslag') !== undefined
    const alleDager = [...vedtak.daglisteSykmeldt, ...vedtak.daglisteArbeidsgiver]
    const minstEnDagInnvilget: boolean = alleDager.some((dag) => dagErInnvilget.includes(dag.dagtype))
    const avslagBegrunnelser = unikeAvslagBegrunnelser(alleDager)
    const oppsumertAvslagObject: OppsummertAvslagListeProps = {
        title: minstEnDagInnvilget ? 'Noen av dagene er ikke innvilget fordi:' : 'Søknaden er avslått fordi:',
        oppsummertAvslag: avslagBegrunnelser,
        harBegrunnelseFraBomlo: harAvslagBegrunnelseFraBomlo,
        vedtak,
        dagTabellScrollElementId: 'sykepenger-per-dag',
    }

    const kunArbeidsgiverPeriode = erKunArbeidsgiverPeriode(alleDager)
    const ingenUtbetalingTittel = kunArbeidsgiverPeriode ? 'Utbetaling fra arbeidsgiver' : 'Ingen utbetaling'

    return (
        <UtbetalingPanel
            sectionLabel={ingenUtbetalingTittel}
            innvilgetMerke={finnInnvilgetMerke(!minstEnDagInnvilget, kunArbeidsgiverPeriode, minstEnDagInnvilget)}
            tittel={
                <Heading level="2" size="large">
                    {ingenUtbetalingTittel}
                </Heading>
            }
            erUgyldig={annullertEllerRevurdert}
            dataTestId="ingen"
        >
            <VedtakPeriode vedtak={vedtak} erKunArbeidsgiverPeriode={kunArbeidsgiverPeriode} />

            {erWeekendPeriode(vedtak.vedtak.fom, vedtak.vedtak.tom) && (
                <BodyShort>
                    <Heading size="small">Hvorfor får jeg ingen utbetaling</Heading>
                    <List as="ul">
                        <List.Item>Helg</List.Item>
                    </List>
                </BodyShort>
            )}
            <Link href="#mer-om-beregningen">Les mer om begrunnelsen</Link>
            <OppsumertAvslagListe {...oppsumertAvslagObject}></OppsumertAvslagListe>
        </UtbetalingPanel>
    )
}
