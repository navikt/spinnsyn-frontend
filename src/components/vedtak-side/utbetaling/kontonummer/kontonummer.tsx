import { BodyLong, BodyShort, Heading } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React from 'react'

import { tekst } from '../../../../utils/tekster'
import Vis from '../../../vis'
import { UseKontonummer } from '../../../../query-hooks/useKontonummer'

export const Kontonummer = () => {
    const { data: kontonummer, isSuccess } = UseKontonummer()

    const formaterKontonummer = (kontonummer: string) => kontonummer.replace(/^(.{4})(.{2})(.*)$/, '$1 $2 $3')

    return (
        <Vis
            hvis={isSuccess}
            render={() => (
                <>
                    <Vis
                        hvis={kontonummer}
                        render={() => (
                            <BodyShort>
                                <strong>{tekst('utbetaling.kontonummer.utbetales')}</strong>
                                {formaterKontonummer(kontonummer!)}
                            </BodyShort>
                        )}
                    />

                    <Vis
                        hvis={!kontonummer}
                        render={() => (
                            <>
                                <Heading spacing level="3" size="small">
                                    {tekst('utbetaling.kontonummer.tittel')}
                                </Heading>
                                <BodyLong spacing>{parser(tekst('utbetaling.kontonummer.mangler'))}</BodyLong>
                            </>
                        )}
                    />
                </>
            )}
        />
    )
}
