import 'nav-frontend-tabell-style'

import dayjs from 'dayjs'
import Etikett from 'nav-frontend-etiketter'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import Utvidbar from '../../../components/utvidbar/utvidbar'
import { useAppStore } from '../../../data/stores/app-store'
import { RSDagType } from '../../../types/rs-types/rs-vedtak'
import { tekst } from '../../../utils/tekster'
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
        // TODO: Legg inn permisjon og ferie når vi mottar denne dataen
        switch (dag.dagtype) {
            case 'NavDag': {
                if (dag.grad === 100) return <Etikett mini type="suksess">Syk</Etikett>
                else return <Etikett mini type="suksess">Delvis syk</Etikett>
            }
            case 'NavHelgDag':
                return <Etikett mini type="info">Helg</Etikett>
            case 'ArbeidsgiverperiodeDag':
                return <Etikett mini type="info">Arbeidsgiver betaler</Etikett>
            case 'Arbeidsdag':
                return <Etikett mini type="info">Arbeidsdag</Etikett>
            case 'Fridag':
                return <Etikett mini type="info">FRI</Etikett>
            case 'AvvistDag':
            case 'ForeldetDag':
                return <Etikett mini type="fokus">Avslått</Etikett>
            case 'UkjentDag':
                return <Etikett mini type="info">Ukjent</Etikett>
        }
    }

    return (
        <Utvidbar erApen={false} visLukk={true} type="intern" className=""
            tittel={'Daglig utbetalingsoversikt'}
        >
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

                <div className="tekstinfo__avsnitt">
                    {lagDagLabel({ dagtype: 'ArbeidsgiverperiodeDag' } as any)}
                    <Normaltekst>{tekst('utbetaling.tabell.arbeidsgiver-betaler')}</Normaltekst>
                </div>

                <div className="tekstinfo__avsnitt">
                    {lagDagLabel({ dagtype: 'Arbeidsdag' } as any)}
                    <Normaltekst>{tekst('utbetaling.tabell.arbeidsdag')}</Normaltekst>
                </div>

                <div className="tekstinfo__avsnitt">
                    {lagDagLabel({ dagtype: 'NavDag', grad: 100 } as any)}
                    <Normaltekst>{tekst('utbetaling.tabell.syk')}</Normaltekst>
                </div>

                <div className="tekstinfo__avsnitt">
                    {lagDagLabel({ dagtype: 'NavDag', grad: 50 } as any)}
                    <Normaltekst>{tekst('utbetaling.tabell.delvis-syk')}</Normaltekst>
                </div>

                <div className="tekstinfo__avsnitt">
                    {lagDagLabel({ dagtype: 'NavHelgDag' } as any)}
                    <Normaltekst>{tekst('utbetaling.tabell.helg')}</Normaltekst>
                </div>

                <div className="tekstinfo__avsnitt">
                    {lagDagLabel({ dagtype: 'Fridag' } as any)}
                    <Normaltekst>{tekst('utbetaling.tabell.ferie')}</Normaltekst>
                </div>

                <div className="tekstinfo__avsnitt">
                    {lagDagLabel({ dagtype: 'Fridag' } as any)}
                    <Normaltekst>{tekst('utbetaling.tabell.permisjon')}</Normaltekst>
                </div>

                <div className="tekstinfo__avsnitt">
                    {lagDagLabel({ dagtype: 'AvvistDag' } as any)}
                    <Normaltekst>{tekst('utbetaling.tabell.avslått')}</Normaltekst>
                </div>

                <div className="tekstinfo__avsnitt">
                    {lagDagLabel({ dagtype: 'UkjentDag' } as any)}
                    <Normaltekst>{tekst('utbetaling.tabell.ukjent')}</Normaltekst>
                </div>
            </div>
        </Utvidbar>
    )
}

export default DagTabell
