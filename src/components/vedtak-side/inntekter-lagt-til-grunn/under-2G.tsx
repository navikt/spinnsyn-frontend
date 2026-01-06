import { Detail, Link } from '@navikt/ds-react'
import React from 'react'

export const Under2G = ({ tags }: { tags?: string[] }) => {
    if (!tags || !tags.includes('SykepengegrunnlagUnder2G')) {
        return null
    }
    return (
        <>
            <Detail className="mt-4 border-t border-gray-700 pt-4 text-sm text-gray-900">
                Sykepengegrunnlaget ditt er mindre enn to ganger grunnbeløpet. Hvis du også oppfyller kravene for
                arbeidsavklaringspenger, kan du velge å få det isteden.
            </Detail>
            <Detail className="text-sm text-gray-900">
                Sykepenger og arbeidsavklaringspenger beregnes på forskjellige måter. Derfor kan grunnlaget du kan få
                for arbeidsavklaringspenger være høyere enn det du kan få for sykepenger. For mer informasjon{' '}
                <Link href="https://innboks.nav.no/s/skriv-til-oss?category=Helse" target="_blank">
                    kontakt Nav
                </Link>
                .
            </Detail>
        </>
    )
}
