import { BodyShort, Detail, LinkPanel, Tag } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import { tekst } from '../../utils/tekster'
import { storeTilStoreOgSmå } from '../../utils/store-små'
import { logEvent } from '../umami/umami'
import { cn } from '../../utils/tw-utils'
import { isProd } from '../../utils/environment'

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

    const erRevurdering = vedtak.vedtak.utbetaling.utbetalingType === 'REVURDERING'
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

                    <div className="flex shrink-0 items-center">
                        <Etikett
                            annullert={vedtak.annullert}
                            revurdert={vedtak.revurdert}
                            revurdering={erRevurdering}
                        />
                    </div>
                </div>
            </LinkPanel>
        </Link>
    )
}

type EtikettProps = {
    annullert: boolean
    revurdert: boolean
    revurdering: boolean
    size?: 'medium' | 'small' | 'xsmall'
    className?: string
}

export const Etikett = ({ annullert, revurdert, revurdering, size, className }: EtikettProps) => {
    if (annullert) {
        return null
    } else if (revurdert) {
        return (
            <Tag size={size} variant="neutral" className={className}>
                {tekst('spinnsyn.teaser.annullert')}
            </Tag>
        )
    } else if (revurdering) {
        return (
            <Tag size={size} variant="info" className={className}>
                {tekst('spinnsyn.teaser.sisterevudering')}
            </Tag>
        )
    }
    return null
}

export default ListevisningLenkepanel
