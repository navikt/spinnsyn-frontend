import dayjs from 'dayjs'
import { HoyreChevron } from 'nav-frontend-chevron'
import { EtikettFokus } from 'nav-frontend-etiketter'
import React from 'react'

import useSoknader from '../../query-hooks/useSoknader'
import { tekst } from '../../utils/tekster'
import { getUrlTilVedtak } from '../../utils/url-utils'
import { InngangsHeader, InngangsIkon, Inngangspanel } from '../inngang/inngangspanel'
import Vis from '../vis'
import hand from './hand.svg'
import handHover from './hand-hover.svg'
import annullert from './ikon-annullert.svg'
import annullertHover from './ikon-annullert-hover.svg'
import { arbeidsgiverListevisning, VedtakTeaserProps } from './teaser-util'

const Teaser = ({ vedtak }: VedtakTeaserProps) => {
    const { data: soknader } = useSoknader()
    const annullertEllerRevurdert = vedtak.annullert || vedtak.revurdert

    if (!soknader) return null

    return (
        <article aria-labelledby={`soknader-header-${vedtak.id}`}>
            <Inngangspanel to={getUrlTilVedtak(vedtak)}>
                <div className="inngangspanel__ytre">
                    <div className="inngangspanel__del1">
                        <InngangsIkon ikon={annullertEllerRevurdert ? annullert : hand}
                            ikonHover={annullertEllerRevurdert ? annullertHover : handHover} />
                        <div id={`soknader-header-${vedtak.id}`} className="inngangspanel__innhold utvidbar__toggle">
                            <InngangsHeader
                                meta={
                                    dayjs(vedtak.vedtak.fom).format('DD. MMM') + ' - ' +
                                    dayjs(vedtak.vedtak.tom).format('DD. MMM YYYY')
                                }
                                tittel={
                                    annullertEllerRevurdert
                                        ? tekst('spinnsyn.teaser.annullert.tittel')
                                        : tekst('spinnsyn.teaser.tittel')
                                }
                            />
                            {arbeidsgiverListevisning(vedtak, soknader)}
                        </div>
                    </div>
                    <Vis hvis={annullertEllerRevurdert}
                        render={() =>
                            <EtikettFokus>{tekst('spinnsyn.teaser.annullert')}</EtikettFokus>
                        }
                    />
                </div>
                <div className="inngangspanel__del2">
                    <HoyreChevron />
                </div>
            </Inngangspanel>
        </article>
    )
}

export default Teaser
