import { Table } from '@navikt/ds-react'
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
        <Table zebraStripes={true} className="tabell--dag">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Dato</Table.HeaderCell>
                    <Table.HeaderCell>Sum</Table.HeaderCell>
                    <Table.HeaderCell>Dagtype</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {dager.map((dag, idx) =>
                    <Table.Row key={idx}>
                        <Table.DataCell>{dayjs(dag.dato).format('DD.MMM')}</Table.DataCell>
                        <Table.DataCell className="kroner">
                            {
                                (dag.dagtype === 'NavDag' || dag.dagtype === 'NavDagSyk' || dag.dagtype === 'NavDagDelvisSyk')
                                    ? ValutaFormat.format(dag.belop) + ' kr'
                                    : '-'
                            }
                        </Table.DataCell>
                        <Table.DataCell>
                            <DagLabel dag={dag} skalViseProsent={true} />
                        </Table.DataCell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    )
}

export default DagTabell
