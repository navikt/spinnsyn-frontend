import { BodyLong, ReadMore } from '@navikt/ds-react'
import React, { useContext } from 'react'

import { tekst } from '../../../../utils/tekster'
import { LenkeMedAmplitude } from '../../../lenke/lenke-med-amplitude'
import { ArkiveringContext } from '../../../../context/arkivering-context'
import { parserWithReplace } from '../../../../utils/html-react-parser-utils'

export const SykepengerNar = () => {
    const isServer = useContext(ArkiveringContext)

    return (
        <ReadMore defaultOpen={isServer} header={tekst('utbetaling.person.når')}>
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
