import { BodyLong, Heading } from '@navikt/ds-react'
import { LenkeMedUmami } from '../lenke/lenke-med-umami'

export const Innsyn = () => {
    return (
        <>
            <Heading size="small" level="2" spacing>
                Du har rett til å se dokumentene i saken din
            </Heading>
            <BodyLong>
                Du kan be om å se dokumentene i saken din når som helst, også etter at saken er avsluttet. Dette kalles
                innsyn, og er en rett du har etter{' '}
                <LenkeMedUmami
                    tekst={'forvaltningsloven § 18'}
                    url={'https://lovdata.no/nav/andre-rettskilder/Forvaltningsloven/kapIV/%C2%A718'}
                />
                .
            </BodyLong>
            <BodyLong>
                <LenkeMedUmami tekst={'Les hvordan du ber om innsyn.'} url={'https://www.nav.no/innsynskrav'} />
            </BodyLong>
        </>
    )
}
