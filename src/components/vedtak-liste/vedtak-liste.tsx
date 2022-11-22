import { BodyShort, Heading, Link } from '@navikt/ds-react'
import React, { useEffect } from 'react'

import { useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import useVedtak from '../../hooks/useVedtak'
import { arkiverteVedtakUrl, sykefravaerUrl } from '../../utils/environment'
import { sorterEtterNyesteTom } from '../../utils/sorter-vedtak'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import Person from '../person/Person'
import Teasere from '../teaser/teasere'

const VedtakListe = () => {
    const { data: vedtak } = useVedtak()

    useUpdateBreadcrumbs(
        () => [
            { title: 'Ditt sykefravær', url: sykefravaerUrl() },
            { title: tekst('vedtak-liste.sidetittel'), url: '/', handleInApp: true },
        ],
        [],
    )

    useEffect(() => {
        setBodyClass('vedtak-liste')
    }, [])

    const uleste = vedtak!.filter((v) => !v.lest)
    const leste = vedtak!.filter((v) => v.lest).sort(sorterEtterNyesteTom)

    return (
        <>
            <header className="sidebanner">
                <Heading spacing size="xlarge" level="1" className="sidebanner__tittel">
                    {tekst('spinnsyn.sidetittel.liste')}
                </Heading>
                <Person />
            </header>

            <div className="limit">
                <Teasere
                    className="vedtak--uleste vedtak--teasere"
                    vedtak={uleste}
                    tittel={tekst('spinnsyn.teaser.uleste')}
                    tomListeTekst={tekst('vedtak-liste.ingen-nye-soknader')}
                />

                <Teasere
                    className="vedtak--leste"
                    vedtak={leste}
                    tittel={tekst('spinnsyn.teaser.leste')}
                    tomListeTekst={tekst('vedtak-liste.ingen-tidligere-soknader')}
                />

                <Link className="arkiverte-lenke" href={arkiverteVedtakUrl()}>
                    <BodyShort as="span">{tekst('vedtak-liste.lenke-arkiverte-vedtak')}</BodyShort>
                </Link>
            </div>
        </>
    )
}

export default VedtakListe
