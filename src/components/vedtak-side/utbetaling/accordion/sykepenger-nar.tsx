import { BodyLong, ReadMore } from '@navikt/ds-react'
import React, { useContext, useState } from 'react'

import { tekst } from '../../../../utils/tekster'
import { LenkeMedAmplitude } from '../../../lenke/lenke-med-amplitude'
import { ArkiveringContext } from '../../../../context/arkivering-context'
import { parserWithReplace } from '../../../../utils/html-react-parser-utils'
import { logEvent } from '../../../amplitude/amplitude'

export const SykepengerNar = () => {
    const isServer = useContext(ArkiveringContext)

    const [expanded, setExpanded] = useState<boolean>(isServer)

    return (
        <ReadMore
            defaultOpen={isServer}
            header={tekst('utbetaling.person.når')}
            open={expanded}
            onClick={() => {
                logEvent(expanded ? 'readmore lukket' : 'readmore åpnet', {
                    tittel: tekst('utbetaling.person.når'),
                    component: 'SykepengerNar',
                })
                setExpanded((prev) => !prev)
            }}
        >
            <BodyLong>
                {parserWithReplace(tekst('utbetaling.person.når.innhold'))}

                <LenkeMedAmplitude
                    url={tekst('utbetaling.person.når.lenke.url')}
                    tekst={tekst('utbetaling.person.når.lenke.tekst')}
                />
            </BodyLong>
            </ReadMore>
    )
}
