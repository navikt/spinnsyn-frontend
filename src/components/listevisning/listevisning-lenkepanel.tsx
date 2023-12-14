import { LinkPanel, Tag, BodyShort } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { getLedetekst, tekst } from '../../utils/tekster'
import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import { storeTilStoreOgSmå } from '../../utils/store-små'
import { logEvent } from '../amplitude/amplitude'
import { cn } from '../../utils/tw-utils'

const ListevisningLenkepanel = ({ vedtak }: { vedtak: RSVedtakWrapper }) => {
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert
    const router = useRouter()

    const query: NodeJS.Dict<string | string[]> = {}

    for (const key in router.query) {
        query[key] = router.query[key]
    }
    query['id'] = vedtak.id
    const vedtakTittel = annullertEllerRevurdert
        ? tekst('spinnsyn.teaser.annullert.tittel')
        : tekst('spinnsyn.teaser.tittel')
    const vedtakPeriode =
        dayjs(vedtak.vedtak.fom).format('DD. MMM') + ' - ' + dayjs(vedtak.vedtak.tom).format('DD. MMM YYYY')
    const arbeidsgiverTekst = getLedetekst(tekst('spinnsyn.teaser.sykmeldt-fra'), {
        '%ARBEIDSGIVER%': storeTilStoreOgSmå(vedtak.orgnavn),
    })
    return (
        <Link href={{ query }} passHref legacyBehavior>
            <LinkPanel
                className={cn('mb-4 p-6 [&>div]:w-full', {
                    'border-orange-300 bg-orange-50 hover:border-orange-500': !vedtak.lest,
                })}
                border
                onClick={() =>
                    logEvent('navigere', {
                        destinasjon: 'vedtak',
                        skjemanavn: 'vedtak-listevisning',
                        tidligereLest: vedtak.lest,
                        revurdert: vedtak.revurdert,
                        annullert: vedtak.annullert,
                    })
                }
            >
                <div className="flex gap-3 max-[560px]:flex-col">
                    <div className="grow">
                        <LinkPanel.Title>
                            <BodyShort size="small" spacing>
                                {vedtakPeriode}
                            </BodyShort>
                            {vedtakTittel}
                        </LinkPanel.Title>
                        <LinkPanel.Description>{arbeidsgiverTekst}</LinkPanel.Description>
                    </div>

                    <div className="flex shrink-0 items-center">
                        <Etikett vedtak={vedtak} />
                    </div>
                </div>
            </LinkPanel>
        </Link>
    )
}

const Etikett = ({ vedtak }: { vedtak: RSVedtakWrapper }) => {
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert
    if (annullertEllerRevurdert) {
        return <Tag variant="warning">{tekst('spinnsyn.teaser.annullert')}</Tag>
    }
    const nyesteRevudering = !vedtak.revurdert && vedtak.vedtak.utbetaling.utbetalingType === 'REVURDERING'
    if (nyesteRevudering) {
        return <Tag variant="info">{tekst('spinnsyn.teaser.sisterevudering')}</Tag>
    }
    return null
}

export default ListevisningLenkepanel
