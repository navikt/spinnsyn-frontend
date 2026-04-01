import { BodyShort, Heading, Link, List, Box } from '@navikt/ds-react'

import VedtakPeriode from '../vedtak-periode/vedtak-periode'
import UtbetalingPanel from '../../panel/utbetaling-panel'
import { unikeAvslagBegrunnelser, hentBegrunnelse, finnInnvilgetMerke } from '../../../utils/vedtak-utils'
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

    const erKunArbeidsgiverPeriode = alleDager.every((dag) => dag.dagtype === 'ArbeidsgiverperiodeDag')
    const ingenUtbetalingTittel = erKunArbeidsgiverPeriode ? 'Utbetaling fra arbeidsgiver' : 'Ingen utbetaling'

    return (
        <UtbetalingPanel
            sectionLabel={ingenUtbetalingTittel}
            innvilgetMerke={finnInnvilgetMerke(!minstEnDagInnvilget, erKunArbeidsgiverPeriode, minstEnDagInnvilget)}
            tittel={
                <Heading level="2" size="large">
                    {ingenUtbetalingTittel}
                </Heading>
            }
            erUgyldig={annullertEllerRevurdert}
            dataTestId="ingen"
        >
            <VedtakPeriode vedtak={vedtak} erKunArbeidsgiverPeriode={erKunArbeidsgiverPeriode} />
            {erWeekendPeriode(vedtak.vedtak.fom, vedtak.vedtak.tom) && (
                <BodyShort as="div">
                    <div>
                        <Heading as="h3" size="small">
                            Hvorfor får jeg ingen utbetaling
                        </Heading>
                        <Box marginBlock="space-16" asChild>
                            <List data-aksel-migrated-v8 as="ul">
                                <List.Item>Helg</List.Item>
                            </List>
                        </Box>
                    </div>
                    <Link href="#mer-om-beregningen">Se nærmere begrunnelse her</Link>
                </BodyShort>
            )}
            <OppsumertAvslagListe {...oppsumertAvslagObject}></OppsumertAvslagListe>
        </UtbetalingPanel>
    )
}
