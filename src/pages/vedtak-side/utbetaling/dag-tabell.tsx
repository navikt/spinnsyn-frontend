import 'nav-frontend-tabell-style'

import dayjs from 'dayjs'
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import Etikett from 'nav-frontend-etiketter'
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { RSDagType } from '../../../types/rs-types/rs-vedtak'
import { ValutaFormat } from '../../../utils/valuta-utils'
import { refusjonTilArbeidsgiverUtbetalingsdager } from '../../../utils/vedtak-utils'

interface DagData {
    dato: string;
    beløp: string;
    dagtype: RSDagType;
    grad: number;
}

const DagTabell = () => {
    const { valgtVedtak } = useAppStore()

    const lagDagData = () => {
        const dager: DagData[] = valgtVedtak!.vedtak.utbetaling.utbetalingsdager.map(dag => {
            return {
                dato: dag.dato,
                beløp: '-',
                dagtype: dag.type,
                grad: 0
            }
        })
        const dagerMedBeløpOgGrad = refusjonTilArbeidsgiverUtbetalingsdager(valgtVedtak)
        dagerMedBeløpOgGrad.forEach(dag => {
            const dagen = dager.find(d => d.dato === dayjs(dag.dato).format('YYYY-MM-DD'))
            if (dagen) {
                dagen.beløp = ValutaFormat.format(dag.beløp) + ' kr'
                dagen.grad = dag.grad
            }
        })
        return dager
    }

    const lagDagLabel = (dag: DagData) => {
        switch (dag.dagtype) {
            case 'NavDag': {
                if (dag.grad === 100) return <Etikett mini type="suksess">Syk</Etikett>
                else return <Etikett mini type="suksess">Delvis syk</Etikett>
            }
            case 'NavHelgDag':
                return <Etikett mini type="info">Helg</Etikett>
            case 'ArbeidsgiverperiodeDag':
                return <Etikett mini type="suksess">Arbeidsgiver</Etikett>
            case 'Arbeidsdag':
                return <Etikett mini type="info">Arbeid</Etikett>
            case 'Fridag':
                return <Etikett mini type="info">Fri</Etikett>
            case 'AvvistDag':
                return <Etikett mini type="info">Avvist</Etikett>
            case 'ForeldetDag':
                return <Etikett mini type="info">Foreldet</Etikett>
            case 'UkjentDag':
                return <Etikett mini type="info">Ukjent</Etikett>
        }
    }

    return (
        <Ekspanderbartpanel apen={false} tittel={
            <Element>Daglig utbetalingsoversikt</Element>
        }>
            <table className="tabell tabell--stripet tabell--dag">
                <thead>
                    <tr>
                        <th>Dato</th>
                        <th>Sum</th>
                        <th>Dagtype</th>
                    </tr>
                </thead>
                <tbody>
                    {lagDagData().map((dag, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{dayjs(dag.dato).format('DD/MM')}</td>
                                <td>{dag.beløp}</td>
                                <td>{lagDagLabel(dag)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div className="tekstinfo" >
                <Undertittel className="tekstinfo__avsnitt">
                    Mer om dagtyper
                </Undertittel>

                <Element tag="h2" className="tekstinfo__avsnitt">
                    Syk
                </Element>
                <Normaltekst>
                    Du har vært syk en hel dag, og du får sykepenger for denne dagen.
                </Normaltekst>

                <Element tag="h2" className="tekstinfo__avsnitt">
                    Delvis syk
                </Element>
                <Normaltekst>
                    Du får sykepenger for den delen av arbeidstiden du ikke jobber. Vi bruker opplysningene dine om hvor mye du jobbet i perioden.
                </Normaltekst>

                <Element tag="h2" className="tekstinfo__avsnitt">
                    Helg
                </Element>
                <Normaltekst>
                    Sykepenger betales alltid for dagene mandag til fredag. Det skjer uavhengig av om du eventuelt jobber lørdag og søndag.
                </Normaltekst>

                <Element tag="h2" className="tekstinfo__avsnitt">
                    Ferie
                </Element>
                <Normaltekst>
                    Man får ikke sykepenger for dager man har ferie.
                </Normaltekst>

                <Element tag="h2" className="tekstinfo__avsnitt">
                    Permisjon
                </Element>
                <Normaltekst>
                    Man får ikke sykepenger for dager man har permisjon.
                </Normaltekst>
            </div>
        </Ekspanderbartpanel>
    )
}

export default DagTabell
