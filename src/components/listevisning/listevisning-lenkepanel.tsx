import { BodyShort, Detail, LinkPanel, Tag } from '@navikt/ds-react'
import { InformationIcon } from '@navikt/aksel-icons'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { tekst } from '../../utils/tekster'
import { storeTilStoreOgSmå } from '../../utils/store-små'
import { logEvent } from '../umami/umami'
import { cn } from '../../utils/tw-utils'
import { isProd } from '../../utils/environment'
import { Etikett, getEtikettVariant } from '../etikett/etikett'
import { formatDatoKort, formatDatoKortMedAr, fullDatoKlokkeslett } from '../../utils/dato-utils'
import { isMockBackend, isOpplaering } from '../../utils/environment'
import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak-felles'

const sykmeldtFraTekstGenerator = (yrkesaktivitetstype: 'ARBEIDSTAKER' | 'SELVSTENDIG', orgnavn: string) => {
    switch (yrkesaktivitetstype) {
        case 'ARBEIDSTAKER':
            return `Sykmeldt fra ${storeTilStoreOgSmå(orgnavn)}`
        case 'SELVSTENDIG':
            return 'Sykmeldt som selvstendig næringsdrivende'
    }
}

type ListevisningLenkepanelProps = {
    vedtak: Pick<
        RSVedtakWrapper,
        'id' | 'annullert' | 'revurdert' | 'lest' | 'opprettetTimestamp' | 'orgnavn' | 'demoinfo'
    > & {
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
    const erDemo = isMockBackend() || isOpplaering()

    const query: NodeJS.Dict<string | string[]> = {}

    for (const key in router.query) {
        query[key] = router.query[key]
    }
    query['id'] = vedtak.id
    const vedtakPeriode = formatDatoKort(vedtak.vedtak.fom) + ' - ' + formatDatoKortMedAr(vedtak.vedtak.tom)

    const nyesteRevurdering = !vedtak.revurdert && vedtak.vedtak.utbetaling.utbetalingType === 'REVURDERING'
    const etikett = getEtikettVariant(vedtak.annullert, vedtak.revurdert, nyesteRevurdering)

    return (
        <Link href={{ query }} passHref legacyBehavior>
            <LinkPanel
                className={cn('mb-4 p-6 [&>div]:w-full', {
                    'border-ax-border-warning bg-ax-bg-warning-soft hover:border-ax-border-warning-strong':
                        !vedtak.lest,
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
                    <div
                        className={cn('grow', { 'line-through text-ax-text-neutral-subtle': annullertEllerRevurdert })}
                    >
                        {erDemo && vedtak.demoinfo && (
                            <Tag
                                className="mb-2"
                                data-color="meta-lime"
                                variant="moderate"
                                size="small"
                                icon={<InformationIcon aria-hidden />}
                            >
                                <span className="sr-only">, </span>
                                {`${vedtak.demoinfo}`}
                            </Tag>
                        )}
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
                                Sendt fra Nav: {fullDatoKlokkeslett(vedtak.opprettetTimestamp)}
                            </Detail>
                        )}
                    </div>

                    <div className="flex shrink-0 items-center">{etikett && <Etikett etikettVariant={etikett} />}</div>
                </div>
            </LinkPanel>
        </Link>
    )
}

export default ListevisningLenkepanel
