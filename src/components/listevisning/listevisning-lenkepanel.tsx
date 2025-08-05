import { BodyShort, Detail, LinkPanel, Tag } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import { getLedetekst, tekst } from '../../utils/tekster'
import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak-felles'
import { storeTilStoreOgSmå } from '../../utils/store-små'
import { logEvent } from '../amplitude/amplitude'
import { cn } from '../../utils/tw-utils'
import { isProd } from '../../utils/environment'


dayjs.extend(localizedFormat)


const sykmeldtFraTekstGenerator = (vedtak: RSVedtakWrapper) => {
    switch (vedtak.vedtak.vedtakstype) {
        case 'ARBEIDSTAKER':
            return `Sykmeldt fra ${storeTilStoreOgSmå(vedtak.orgnavn)}`
        case 'NARINGSDRIVENDE':
            return "Sykmeldt som selvstendig næringsdrivende"
    
    }
}

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
                        <LinkPanel.Description>{sykmeldtFraTekstGenerator(vedtak)}</LinkPanel.Description>
                        {!isProd() && (
                            <Detail className="italic">
                                Mottatt: {dayjs(vedtak.opprettetTimestamp).format('L LT')}
                            </Detail>
                        )}
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
