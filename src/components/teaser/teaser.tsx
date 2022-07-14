import { Next } from '@navikt/ds-icons'
import { Tag } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'

import { tekst } from '../../utils/tekster'
import {
    InngangsHeader,
    InngangsIkon,
    Inngangspanel,
} from '../inngang/inngangspanel'
import Vis from '../vis'
import { arbeidsgiverListevisning, VedtakTeaserProps } from './teaser-util'

const Teaser = ({ vedtak }: VedtakTeaserProps) => {
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert

    const hand = '/syk/sykepenger/static/img/ikon-hand.svg'
    const handHover = '/syk/sykepenger/static/img/ikon-hand-hover.svg'
    const annullert = '/syk/sykepenger/static/img/ikon-annullert.svg'
    const annullertHover = '/syk/sykepenger/static/img/ikon-annullert-hover.svg'

    return (
        <article aria-labelledby={`soknader-header-${vedtak.id}`}>
            <Inngangspanel vedtak={vedtak}>
                <div className="inngangspanel__ytre">
                    <div className="inngangspanel__del1">
                        <InngangsIkon
                            ikon={annullertEllerRevurdert ? annullert : hand}
                            ikonHover={
                                annullertEllerRevurdert
                                    ? annullertHover
                                    : handHover
                            }
                        />
                        <div
                            id={`soknader-header-${vedtak.id}`}
                            className="inngangspanel__innhold utvidbar__toggle"
                        >
                            <InngangsHeader
                                meta={
                                    dayjs(vedtak.vedtak.fom).format('DD. MMM') +
                                    ' - ' +
                                    dayjs(vedtak.vedtak.tom).format(
                                        'DD. MMM YYYY'
                                    )
                                }
                                tittel={
                                    annullertEllerRevurdert
                                        ? tekst(
                                              'spinnsyn.teaser.annullert.tittel'
                                          )
                                        : tekst('spinnsyn.teaser.tittel')
                                }
                            />
                            {arbeidsgiverListevisning(vedtak)}
                        </div>
                    </div>
                    <Vis
                        hvis={annullertEllerRevurdert}
                        render={() => (
                            <Tag variant="warning">
                                {tekst('spinnsyn.teaser.annullert')}
                            </Tag>
                        )}
                    />
                </div>
                <div className="inngangspanel__del2">
                    <Next aria-label="pil høyre" />
                </div>
            </Inngangspanel>
        </article>
    )
}

export default Teaser
