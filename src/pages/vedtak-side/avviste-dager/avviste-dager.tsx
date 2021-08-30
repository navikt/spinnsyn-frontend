import './avviste-dager.less'

import { Normaltekst } from 'nav-frontend-typografi'
import React, { useState } from 'react'

import DagBeskrivelse from '../../../components/dager/dag-beskrivelse'
import DagTabell from '../../../components/dager/dag-tabell'
import Utvidbar from '../../../components/utvidbar/utvidbar'
import Vis from '../../../components/vis'
import { useAppStore } from '../../../data/stores/app-store'
import { RSDagTypeKomplett } from '../../../types/rs-types/rs-vedtak'
import { tekst } from '../../../utils/tekster'
import VarselbobleIkon from './ikon-varselboble.svg'

const dagErAvvist: RSDagTypeKomplett[] = [
    'AvvistDag',
    'Fridag',
    'ForeldetDag',
]

const AvvisteDager = () => {
    const { valgtVedtak } = useAppStore()
    const [ apen ] = useState<boolean>(false)

    if (!valgtVedtak) return null
    const avvisteDager = valgtVedtak.dager.filter(dag => dagErAvvist.includes(dag.dagtype))

    return (
        <Vis hvis={avvisteDager.length > 0}
            render={() =>
                <Utvidbar
                    type="integrert"
                    className={'orange avviste__dager__innhold' + (apen ? ' apen' : '')}
                    erApen={apen}
                    visLukk={true}
                    ikon={VarselbobleIkon}
                    ikonHover={VarselbobleIkon}
                    tittel={avvisteDager.length + ' sykepengedager'}
                    systemtittel={tekst('avviste.dager.dekkes.ikke')}
                    ikonAltTekst=""
                    fixedHeight={true}
                    heading="h2"
                >
                    <Normaltekst className="tekstinfo__avsnitt">
                        {tekst('avviste.dager.intro')}
                    </Normaltekst>

                    <DagTabell dager={avvisteDager} />
                    <DagBeskrivelse dager={avvisteDager} />

                </Utvidbar>
            }
        />
    )
}

export default AvvisteDager
