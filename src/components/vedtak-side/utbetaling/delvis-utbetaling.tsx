import { List } from '@navikt/ds-react'
import React from 'react'

import { Utbetalingsdager } from '../vedtak'

export const DelvisUtbetaling = ({
    erDelvisInnvilget,
    etterSkjønn,
    utbetalingsdager,
}: {
    erDelvisInnvilget: boolean
    etterSkjønn: boolean
    utbetalingsdager: Utbetalingsdager
}) => {
    return (
        <>
            {erDelvisInnvilget && (
                <List as="ul" title="Delvis innvilget vedtak">
                    <List.Item>
                        {utbetalingsdager.antallDager - utbetalingsdager.avvisteDager} av {utbetalingsdager.antallDager}{' '}
                        sykepengedager utbetales av NAV.
                    </List.Item>
                    <List.Item>
                        {utbetalingsdager.avvisteDager} av {utbetalingsdager.antallDager} sykepengedager utbetales ikke
                        av NAV.
                    </List.Item>
                    {etterSkjønn && <List.Item>Vedtaket ditt er skjønnsfastsatt</List.Item>}
                </List>
            )}
        </>
    )
}
