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
                    <Table.HeaderCell className={'p-3 md:p-4'}>
                        <Label spacing as="span" size="small">
                            Dato
                        </Label>
                    </Table.HeaderCell>
                    <Table.HeaderCell className={'p-3 text-right md:p-4'}>
                        <Label spacing as="span" size="small">
                            Sum
                        </Label>
                    </Table.HeaderCell>
                    <Table.HeaderCell className={'p-3 text-right md:p-4'}>
                        <Label spacing as="span" size="small">
                            Dagtype
                        </Label>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {dager.map((dag, idx) => (
                    <Table.Row key={idx}>
                        <Table.DataCell>
                            <BodyShort size="small" as="span">
                                {dayjs(dag.dato).format('DD.MMM')}
                            </BodyShort>
                        </Table.DataCell>
                        <Table.DataCell className="whitespace-nowrap text-right">
                            <BodyShort size="small" as="span">
                                {dag.dagtype === 'NavDag' ||
                                dag.dagtype === 'NavDagSyk' ||
                                dag.dagtype === 'NavDagDelvisSyk'
                                    ? ValutaFormat.format(dag.belop) + ' kr'
                                    : '-'}
                            </BodyShort>
                        </Table.DataCell>
                        <Table.DataCell className={'text-right'}>
                            <DagLabel dag={dag} skalViseProsent={true} />
                        </Table.DataCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

export default DagTabell
