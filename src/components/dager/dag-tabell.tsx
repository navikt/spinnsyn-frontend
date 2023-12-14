import { BodyShort, Label, Table } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'

import { RSDag } from '../../types/rs-types/rs-vedtak'
import { ValutaFormat } from '../../utils/valuta-utils'

import DagLabel from './dag-label'

interface DagTabellProps {
    dager: RSDag[]
}

const DagTabell = ({ dager }: DagTabellProps) => {
    return (
        <Table zebraStripes={true} className="bg-white" size="medium">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader scope="col">
                        <Label spacing as="span" size="small">
                            Dato
                        </Label>
                    </Table.ColumnHeader>
                    <Table.ColumnHeader scope="col" align="right">
                        <Label spacing as="span" size="small">
                            Sum
                        </Label>
                    </Table.ColumnHeader>
                    <Table.ColumnHeader scope="col" align="right">
                        <Label spacing as="span" size="small">
                            Dagtype
                        </Label>
                    </Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body data-cy="dag-tabell-body">
                {dager.map((dag, idx) => (
                    <Table.Row key={idx}>
                        <Table.HeaderCell scope="row">
                            <BodyShort size="small" as="span">
                                {dayjs(dag.dato).format('DD.MMM')}
                            </BodyShort>
                        </Table.HeaderCell>
                        <Table.DataCell align="right" className="whitespace-nowrap">
                            <BodyShort size="small" as="span">
                                {dag.dagtype === 'NavDag' ||
                                dag.dagtype === 'NavDagSyk' ||
                                dag.dagtype === 'NavDagDelvisSyk'
                                    ? ValutaFormat.format(dag.belop) + ' kr'
                                    : '-'}
                            </BodyShort>
                        </Table.DataCell>
                        <Table.DataCell align="right">
                            <DagLabel dag={dag} skalViseProsent={true} />
                        </Table.DataCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

export default DagTabell
