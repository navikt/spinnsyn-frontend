import { BodyShort, Heading, HStack, Link, Skeleton } from '@navikt/ds-react'
import { InformationIcon } from '@navikt/aksel-icons'
import React from 'react'
import { useRouter } from 'next/router'

import { useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import { arkiverteVedtakUrl, isMockBackend, isOpplaering, spinnsynFrontendInterne } from '../../utils/environment'
import { tekst } from '../../utils/tekster'
import Person from '../person/Person'
import { sorterEtterNyesteFom } from '../../utils/sorter-vedtak'
import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak-felles'
import { STANDARD_TESTPERSON, testpersoner } from '../../data/testdata/testperson'
import { testpersonFraUrl } from '../../utils/testperson-fra-url'

import LenkepanelGruppering from './lenkepanel-gruppering'

const alleTestpersoner = testpersoner()

function hentPersonaBeskrivelse(testperson: string | undefined): string | undefined {
    const nøkkel = testperson ?? STANDARD_TESTPERSON
    return alleTestpersoner[nøkkel as keyof typeof alleTestpersoner]?.beskrivelse
}

const Listevisning = ({ alleVedtak }: { alleVedtak?: RSVedtakWrapper[] }) => {
    useUpdateBreadcrumbs(() => [], [])

    const router = useRouter()
    const uleste = alleVedtak?.filter((v) => !v.lest).sort(sorterEtterNyesteFom)
    const leste = alleVedtak?.filter((v) => v.lest).sort(sorterEtterNyesteFom)
    const kanVelgePerson = isMockBackend() || isOpplaering()
    const personaBeskrivelse = hentPersonaBeskrivelse(testpersonFraUrl(router.asPath))

    return (
        <>
            <div className="mt-4 flex items-center justify-between pb-8 ">
                <Heading size="xlarge" level="1">
                    {tekst('spinnsyn.sidetittel.liste')}
                </Heading>
                {kanVelgePerson && <Person />}
            </div>

            {kanVelgePerson && personaBeskrivelse && (
                <div className="mb-4 rounded-md border border-[var(--ax-border-info-subtle)] bg-[var(--ax-bg-info-soft)] p-3">
                    <HStack gap="space-8" wrap={false} align="center">
                        <InformationIcon aria-hidden fontSize="1.5rem" />
                        <BodyShort size="small">Demoinfo: {personaBeskrivelse}</BodyShort>
                    </HStack>
                </div>
            )}

            <LenkepanelGruppering
                dataCy="uleste-vedtak"
                vedtak={uleste}
                tittel={tekst('spinnsyn.teaser.uleste')}
                tomListeTekst={tekst('vedtak-liste.ingen-nye-soknader')}
            />

            <LenkepanelGruppering
                dataCy="leste-vedtak"
                vedtak={leste}
                tittel={tekst('spinnsyn.teaser.leste')}
                tomListeTekst={tekst('vedtak-liste.ingen-tidligere-soknader')}
            />

            {!spinnsynFrontendInterne() && (
                <Link as={alleVedtak ? 'a' : Skeleton} href={arkiverteVedtakUrl()}>
                    {tekst('vedtak-liste.lenke-arkiverte-vedtak')}
                </Link>
            )}
        </>
    )
}

export default Listevisning
