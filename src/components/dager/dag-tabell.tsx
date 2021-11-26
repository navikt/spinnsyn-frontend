import dayjs from 'dayjs'
import React from 'react'

import {  RSDag } from '../../types/rs-types/rs-vedtak'
import { ValutaFormat } from '../../utils/valuta-utils'
import DagLabel from './dag-label'

interface DagTabellProps{
    dager: RSDag[]
}

const DagTabell = ({ dager }: DagTabellProps) => {

    return (
        <table className="tabell tabell--stripet tabell--dag">
            <thead>
                <tr>
                    <th>Dato</th>
                    <th>Sum</th>
                    <th>Dagtype</th>
                </tr>
            </thead>
            <tbody>
                {dager.map((dag, idx) =>
                    <tr key={idx}>
                        <td>{dayjs(dag.dato).format('DD.MMM')}</td>
                        <td className="kroner">
                            {
                                (dag.dagtype === 'NavDag' || dag.dagtype === 'NavDagSyk' || dag.dagtype === 'NavDagDelvisSyk')
                                    ? ValutaFormat.format(dag.belop) + ' kr'
                                    : '-'
                            }
                        </td>
                        <td>
                            <DagLabel dag={dag} skalViseProsent={true} />
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default DagTabell
