import { BodyShort, Detail, LinkPanel } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'
import { useRouter } from 'next/router'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import { tekst } from '../../utils/tekster'
import { storeTilStoreOgSmå } from '../../utils/store-små'
import { logEvent } from '../umami/umami'
import { cn } from '../../utils/tw-utils'
import { isProd } from '../../utils/environment'
import { Etikett, getEtikettVariant } from '../etikett/etikett'

dayjs.extend(localizedFormat)

const sykmeldtFraTekstGenerator = (yrkesaktivitetstype: 'ARBEIDSTAKER' | 'SELVSTENDIG', orgnavn: string) => {
    switch (yrkesaktivitetstype) {
        case 'ARBEIDSTAKER':
            return `Sykmeldt fra ${storeTilStoreOgSmå(orgnavn)}`
        case 'SELVSTENDIG':
            return 'Sykmeldt som selvstendig næringsdrivende'
    }
}

type ListevisningLenkepanelProps = {
    vedtak: {
        id: string
        annullert: boolean
        revurdert: boolean
        lest: boolean
        opprettetTimestamp: string
        orgnavn: string
        vedtak: {
            yrkesaktivitetstype: 'ARBEIDSTAKER' | 'SELVSTENDIG'
            fom: string
            tom: string
            utbetaling: {
                utbetalingType?: string
            }
        }
    }
}

const ListevisningLenkepanel = ({ vedtak }: ListevisningLenkepanelProps) => {
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert
    const router = useRouter()

    const query: NodeJS.Dict<string | string[]> = {}

    for (const key in router.query) {
        query[key] = router.query[key]
    }
    query['id'] = vedtak.id
    const vedtakPeriode =
        dayjs(vedtak.vedtak.fom).format('DD. MMM') + ' - ' + dayjs(vedtak.vedtak.tom).format('DD. MMM YYYY')

    const nyesteRevurdering = !vedtak.revurdert && vedtak.vedtak.utbetaling.utbetalingType === 'REVURDERING'
    const etikett = getEtikettVariant(vedtak.annullert, vedtak.revurdert, nyesteRevurdering)

    const searchParams = new URLSearchParams()
    for (const [key, value] of Object.entries(query)) {
        if (Array.isArray(value)) {
            value.forEach((v) => searchParams.append(key, v))
        } else if (value !== undefined) {
            searchParams.set(key, value)
        }
    }
    const href = `${router.asPath.split('?')[0]}?${searchParams.toString()}`

    return (
        <LinkPanel
                className={cn('mb-4 p-6 [&>div]:w-full', {
                    'border-orange-300 bg-orange-50 hover:border-orange-500': !vedtak.lest,
                })}
                href={href}
                border
                onClick={(e) => {
                    logEvent('navigere', {
                        destinasjon: 'vedtak',
                        skjemanavn: 'vedtak-listevisning',
                        tidligereLest: vedtak.lest,
                        revurdert: vedtak.revurdert,
                        annullert: vedtak.annullert,
                    })
                    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button !== 1) {
                        e.preventDefault()
                        router.push({ query })
                    }
                }}
            >
                <div className="flex gap-3 max-[560px]:flex-col">
                    <div className={cn('grow', { 'line-through text-text-subtle': annullertEllerRevurdert })}>
                        <LinkPanel.Title>
                            <BodyShort size="small" spacing>
                                {vedtakPeriode}
                            </BodyShort>
                            {tekst('spinnsyn.teaser.tittel')}
                        </LinkPanel.Title>
                        <LinkPanel.Description>
                            {sykmeldtFraTekstGenerator(vedtak.vedtak.yrkesaktivitetstype, vedtak.orgnavn)}
                        </LinkPanel.Description>
                        {!isProd() && (
                            <Detail className="italic">
                                Sendt fra Nav: {dayjs(vedtak.opprettetTimestamp).format('D. MMMM YYYY [kl.] HH.mm')}
                            </Detail>
                        )}
                    </div>

                    <div className="flex shrink-0 items-center">{etikett && <Etikett etikettVariant={etikett} />}</div>
                </div>
            </LinkPanel>
    );
}

export default ListevisningLenkepanel
