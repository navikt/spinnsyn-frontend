import { BodyLong, Heading, Skeleton } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import { UseKontonummer } from '../../../hooks/useKontonummer'
import { parserWithReplace } from '../../../utils/html-react-parser-utils'

export const Kontonummer = () => {
    const { data: kontonummer, isLoading, isSuccess } = UseKontonummer()
    const formaterKontonummer = (kontonummer: string) => kontonummer.replace(/^(.{4})(.{2})(.*)$/, '$1 $2 $3')

    if (isLoading) {
        return (
            <>
                <Skeleton width="55%" height="24px" />
                <Skeleton width="20%" className="mb-7" height="28px" />
            </>
        )
    }

    if (!isSuccess) {
        return null
    }
    return (
        <>
            {kontonummer && (
                <>
                    <Heading level="3" size="xsmall">
                        Kontonummer for utbetaling:
                    </Heading>
                    <BodyLong spacing>{formaterKontonummer(kontonummer!)}</BodyLong>
                </>
            )}
            {!kontonummer && (
                <>
                    <Heading level="3" size="xsmall">
                        {tekst('utbetaling.kontonummer.tittel')}
                    </Heading>
                    <BodyLong spacing>{parserWithReplace(tekst('utbetaling.kontonummer.mangler'))}</BodyLong>
                </>
            )}
        </>
    )
}
