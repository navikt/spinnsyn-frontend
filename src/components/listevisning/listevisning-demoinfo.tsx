import { BodyShort, Box, HStack } from '@navikt/ds-react'
import { InformationIcon } from '@navikt/aksel-icons'
import React from 'react'

import { STANDARD_TESTPERSON, testpersoner } from '../../data/testdata/testperson'

const alleTestpersoner = testpersoner()

function hentPersonaBeskrivelse(testperson: string | undefined): string | undefined {
    const nøkkel = testperson ?? STANDARD_TESTPERSON
    return alleTestpersoner[nøkkel as keyof typeof alleTestpersoner]?.beskrivelse
}

const ListevisningDemoinfo = ({ testperson }: { testperson: string | undefined }) => {
    const personaBeskrivelse = hentPersonaBeskrivelse(testperson)

    return (
        <Box
            background="meta-lime-moderate"
            borderColor="meta-lime-subtle"
            borderWidth="1"
            borderRadius="4"
            padding="space-12"
            marginBlock="space-0 space-16"
        >
            <HStack gap="space-8" wrap={false} align="center">
                <InformationIcon aria-hidden fontSize="1.5rem" />
                <BodyShort size="small">Demoinfo: {personaBeskrivelse}</BodyShort>
            </HStack>
        </Box>
    )
}

export default ListevisningDemoinfo
