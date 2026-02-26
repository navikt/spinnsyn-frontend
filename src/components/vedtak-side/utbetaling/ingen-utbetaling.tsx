import { BodyShort, Heading, Link, List } from '@navikt/ds-react'

import VedtakPeriode from '../vedtak-periode/vedtak-periode'
import UtbetalingPanel from '../../panel/utbetaling-panel'
import { unikeAvslagBegrunnelser, hentBegrunnelse } from '../../../utils/vedtak-utils'
import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak-felles'
import { erWeekendPeriode } from '../../../utils/dato-utils'
import { dagErInnvilget } from '../vedtak'

import { OppsumertAvslagListe, OppsummertAvslagListeProps } from './oppsumert-avslag-liste'

export const IngenUtbetaling = ({ vedtak }: { vedtak: RSVedtakWrapper }) => {
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert
    const ingenUtbetalingTittel = 'Ingen utbetaling'
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

    return (
        <UtbetalingPanel
            sectionLabel={ingenUtbetalingTittel}
            avslag={!minstEnDagInnvilget}
            tittel={
                <Heading level="2" size="large">
                    {ingenUtbetalingTittel}
                </Heading>
            }
            erUgyldig={annullertEllerRevurdert}
            dataTestId="ingen"
        >
            <VedtakPeriode vedtak={vedtak} />

            {erWeekendPeriode(vedtak.vedtak.fom, vedtak.vedtak.tom) && (
                <BodyShort>
                    <List as="ul" title="Hvorfor får jeg ingen utbetaling">
                        <List.Item>Helg</List.Item>
                    </List>
                    <Link href="#mer-om-beregningen">Se nærmere begrunnelse her</Link>
                </BodyShort>
            )}
            <OppsumertAvslagListe {...oppsumertAvslagObject}></OppsumertAvslagListe>
        </UtbetalingPanel>
    )
}
