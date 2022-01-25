import { Back } from '@navikt/ds-icons'
import { BodyShort, Link } from '@navikt/ds-react'
import React from 'react'

import { spinnsynFrontendInterne, sykefravaerUrl } from '../../utils/environment'
import { tekst } from '../../utils/tekster'

const TilbakeLenke = () => {
    if (spinnsynFrontendInterne()) {
        return null
    }
    return (
        <Link className="vedtak__tilbake" href={sykefravaerUrl()}>
            <Back />
            <BodyShort spacing size="small" as="span" className="vedtak__tilbake--lenke">
                {tekst('vedtak.tilbake')}
            </BodyShort>
        </Link>
    )
}

export default TilbakeLenke
