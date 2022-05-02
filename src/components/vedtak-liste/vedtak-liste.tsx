import { BodyShort, Heading, Link } from '@navikt/ds-react'
import React, { useEffect } from 'react'

import useVedtak from '../../query-hooks/useVedtak'
import { arkiverteVedtakUrl } from '../../utils/environment'
import { sorterEtterNyesteTom } from '../../utils/sorter-vedtak'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'
import Banner from '../banner/banner'
import Brodsmuler, { Brodsmule } from '../brodsmuler/brodsmuler'
import Teasere from '../teaser/teasere'

const brodsmuler: Brodsmule[] = [
    {
        tittel: tekst('vedtak-liste.sidetittel'),
    },
]

const VedtakListe = () => {
    const { data: vedtak } = useVedtak()

    useEffect(() => {
        setBodyClass('vedtak-liste')
    }, [])

    const uleste = vedtak!.filter((v) => !v.lest)
    const leste = vedtak!.filter((v) => v.lest).sort(sorterEtterNyesteTom)

    return (
        <>
            <Banner>
                <Heading
                    spacing
                    size="2xlarge"
                    level="1"
                    className="sidebanner__tittel"
                >
                    {tekst('spinnsyn.sidetittel.liste')}
                </Heading>
            </Banner>

            <Brodsmuler brodsmuler={brodsmuler} />

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
                    tomListeTekst={tekst(
                        'vedtak-liste.ingen-tidligere-soknader'
                    )}
                />

                <Link className="arkiverte-lenke" href={arkiverteVedtakUrl()}>
                    <BodyShort as="span">
                        {tekst('vedtak-liste.lenke-arkiverte-vedtak')}
                    </BodyShort>
                </Link>
            </div>
        </>
    )
}

export default VedtakListe
