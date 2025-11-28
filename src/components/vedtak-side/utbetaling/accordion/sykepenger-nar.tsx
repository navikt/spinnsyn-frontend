import { BodyLong, ReadMore } from '@navikt/ds-react'
import React, { useContext, useState } from 'react'

import { tekst } from '../../../../utils/tekster'
import { LenkeMedUmami } from '../../../lenke/lenke-med-umami'
import { ArkiveringContext } from '../../../../context/arkivering-context'
import { parserWithReplace } from '../../../../utils/html-react-parser-utils'
import { logEvent } from '../../../umami/umami'

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

                <LenkeMedUmami
                    url={tekst('utbetaling.person.når.lenke.url')}
                    tekst={tekst('utbetaling.person.når.lenke.tekst')}
                />
            </BodyLong>
        </ReadMore>
    )
}
