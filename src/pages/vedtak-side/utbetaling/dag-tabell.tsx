import 'nav-frontend-tabell-style'

import dayjs from 'dayjs'
import Etikett from 'nav-frontend-etiketter'
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import Utvidbar from '../../../components/utvidbar/utvidbar'
import { useAppStore } from '../../../data/stores/app-store'
import { RSBegrunnelse, RSDagTypeKomplett } from '../../../types/rs-types/rs-vedtak'
import { tilLesbarDatoMedArstall, tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import { tekst } from '../../../utils/tekster'
import { camelCaseTilSetning } from '../../../utils/utils'
import { ValutaFormat } from '../../../utils/valuta-utils'
import { refusjonTilArbeidsgiverUtbetalingsdager } from '../../../utils/vedtak-utils'

interface DagData {
    dato: string;
    beløp: string;
    dagtype: RSDagTypeKomplett;
    grad: number;
    begrunnelser?: RSBegrunnelse[];
}

interface BegrunnelseMedDatoer {
    begrunnelse: RSBegrunnelse;
    datoer: string[];
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
                    grad: 0,
                    begrunnelser: dag.begrunnelser
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
                return <Etikett mini type="fokus">Ingen utbetaling</Etikett>
            // TODO: Legg inn egen etikett for ForeldetDag
            case 'ForeldetDag':
                return <Etikett mini type="fokus">Foreldetdag</Etikett>
            case 'UkjentDag':
                return <Etikett mini type="info">Ukjent</Etikett>
        }
    }

    const unikeDager = (): DagData[] => {
        return alleDager.reduce((list: DagData[], dag) => {
            !list.find((v: DagData) => v.dagtype === dag.dagtype) && list.push(dag)
            return list
        }, [])
    }

    const unikeAvvistBegrunnelser = (): BegrunnelseMedDatoer[] => {
        return alleDager.reduce((list: BegrunnelseMedDatoer[], dag) => {
            if (dag.dagtype === 'AvvistDag') {
                dag.begrunnelser?.forEach((dagBegrunnelse: RSBegrunnelse ) => {
                    list.find(b => b.begrunnelse === dagBegrunnelse)
                        ?.datoer
                        ?.push(dag.dato)
                    || list.push({ begrunnelse: dagBegrunnelse, datoer: [ dag.dato ] })
                })
            }
            return list
        }, [])
    }

    // TODO: datoer må være sortert
    const datoerTilPerioder = (datoer: string[]): string => {
        const grupperingIPerioder = datoer.reduce((fomKeyTomVal: any, dato: string) => {
            const eksisterendePeriode = Object.entries(fomKeyTomVal).find((fomTom) =>
                dayjs(dato).add(-1, 'day').format('YYYY-MM-DD') === fomTom[1]
            )
            if (eksisterendePeriode) {
                fomKeyTomVal[eksisterendePeriode[0]] = dato
            } else {
                fomKeyTomVal[dato] = dato
            }
            return fomKeyTomVal
        }, {})

        return Object.entries(grupperingIPerioder)
            .map((fomTom: any) => {
                if (fomTom[0] !== fomTom[1]) {
                    return tilLesbarPeriodeMedArstall(fomTom[0], fomTom[1])
                } else {
                    return tilLesbarDatoMedArstall(fomTom[0])
                }
            })
            .join(' , ')
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
                    {alleDager.map((dag, idx) =>
                        <tr key={idx}>
                            <td>{dayjs(dag.dato).format('DD.MM.YY')}</td>
                            <td>{dag.beløp}</td>
                            <td>{lagDagLabel(dag)}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="tekstinfo">
                <Undertittel className="tekstinfo__avsnitt">
                    {tekst('utbetaling.tabell.dagtyper')}
                </Undertittel>

                {unikeDager().map((d, idx) =>
                    <div className="tekstinfo__avsnitt" key={idx}>
                        {lagDagLabel(d)}
                        <Normaltekst>
                            {tekst(`utbetaling.tabell.label.${d.dagtype}` as any)}
                        </Normaltekst>
                    </div>
                )}
            </div>

            <div className="tekstinfo">
                <Undertittel className="tekstinfo__avsnitt">
                    {tekst('utbetaling.tabell.avvist')}
                </Undertittel>

                {unikeAvvistBegrunnelser().map((b, idx) =>
                    <div className="tekstinfo__avsnitt" key={idx}>
                        <Element tag="h2" className="tekstinfo__avsnitt">
                            {datoerTilPerioder(b.datoer)}
                        </Element>
                        <Element tag="h2" className="tekstinfo__avsnitt">
                            {camelCaseTilSetning(b.begrunnelse)}
                        </Element>
                        <Normaltekst>
                            {tekst(`utbetaling.tabell.avvist.${b.begrunnelse}` as any)}
                        </Normaltekst>
                    </div>
                )}
            </div>
        </Utvidbar>
    )
}

export default DagTabell
