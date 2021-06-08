import 'nav-frontend-tabell-style'

import dayjs from 'dayjs'
import Etikett from 'nav-frontend-etiketter'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import Utvidbar from '../../../components/utvidbar/utvidbar'
import { useAppStore } from '../../../data/stores/app-store'
import { RSDagTypeKomplett } from '../../../types/rs-types/rs-vedtak'
import { tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import { refusjonTilArbeidsgiverUtbetalingsdager } from '../../../utils/vedtak-utils'

interface DagData {
    dato: string;
    beløp: string;
    dagtype: RSDagTypeKomplett;
    grad: number;
}

const DagTabell = () => {
    const { valgtVedtak } = useAppStore()

    const lagDagData = () => {
        const dager: DagData[] = valgtVedtak!.vedtak.utbetaling.utbetalingsdager
            .filter(dag => {
                return dag.dato >= valgtVedtak!.vedtak.fom && dag.dato <= valgtVedtak!.vedtak.tom
            })
            .map(dag => {
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
                if (dagen.dagtype === 'NavDag') {
                    dagen.dagtype = dagen.grad !== 100 ? 'NavDagDelvisSyk' : 'NavDagSyk'
                }
            }
        })
        return dager
    }

    const alleDager = lagDagData()

    const lagDagLabel = (dag: DagData) => {
        // TODO: Legg inn permisjon og ferie når vi mottar denne dataen
        switch (dag.dagtype) {
            case 'NavDagSyk':
                return <Etikett mini type="suksess">Syk</Etikett>
            case 'NavDagDelvisSyk':
                return <Etikett mini type="suksess">Delvis syk</Etikett>
            case 'NavHelgDag':
                return <Etikett mini type="info">Helg</Etikett>
            case 'ArbeidsgiverperiodeDag':
                return <Etikett mini type="info">Arbeidsgiver betaler</Etikett>
            case 'Arbeidsdag':
                return <Etikett mini type="info">Arbeidsdag</Etikett>
            case 'Fridag':
                return <Etikett mini type="info">Fridag</Etikett>
            case 'AvvistDag':
            case 'ForeldetDag':
                return <Etikett mini type="fokus">Avslått</Etikett>
            case 'UkjentDag':
                return <Etikett mini type="info">Ukjent</Etikett>
        }
    }

    const unikeDager = () => {
        return alleDager.reduce((list: DagData[], dag) => {
            !list.find((v: DagData) => v.dagtype === dag.dagtype) && list.push(dag)
            return list
        }, [])
    }

    return (
        <Utvidbar erApen={false} visLukk={true} type="intern" className="utbetalingsoversikt"
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
                    {alleDager.map((dag, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{dayjs(dag.dato).format('DD.MM.YY')}</td>
                                <td>{dag.beløp}</td>
                                <td>{lagDagLabel(dag)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div className="tekstinfo">
                <Undertittel className="tekstinfo__avsnitt">
                    {tekst('utbetaling.tabell.undertittel')}
                </Undertittel>

                {unikeDager().map((d, idx) => {
                    return (
                        <div className="tekstinfo__avsnitt" key={idx}>
                            {lagDagLabel(d)}
                            <Normaltekst>
                                {tekst(`utbetaling.tabell.${d.dagtype}` as any)}
                            </Normaltekst>
                        </div>
                    )
                })}
            </div>
        </Utvidbar>
    )
}

export default DagTabell
