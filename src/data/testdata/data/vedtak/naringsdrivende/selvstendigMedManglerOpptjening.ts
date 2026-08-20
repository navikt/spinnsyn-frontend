import { RSBegrunnelse, RSVedtakWrapper } from '../../../../../types/rs-types/rs-vedtak-felles'
import { jsonDeepCopy } from '../../../../../utils/json-deep-copy'

import { standardSelvstendig } from './standardSelvstendig'

function gjørTilAvvistDag(dag: (typeof standardSelvstendig.daglisteSykmeldt)[number]) {
    if (dag.dagtype !== 'NavDag') {
        return dag
    }

    return {
        ...dag,
        dagtype: 'AvvistDag' as const,
        begrunnelser: ['ManglerOpptjening'] as RSBegrunnelse[],
        belop: 0,
        grad: 0,
    }
}

export const selvstendigMedManglerOpptjening: RSVedtakWrapper = jsonDeepCopy(standardSelvstendig)

selvstendigMedManglerOpptjening.id = 'tilfeldig-uuid-selvstendig-mangler-opptjening'
selvstendigMedManglerOpptjening.orgnavn = 'Wooley Socks ENK'
selvstendigMedManglerOpptjening.daglisteSykmeldt = standardSelvstendig.daglisteSykmeldt.map(gjørTilAvvistDag)
selvstendigMedManglerOpptjening.sykepengebelopSykmeldt = 0

if (
    !selvstendigMedManglerOpptjening.vedtak.sykepengegrunnlagsfakta ||
    !('selvstendig' in selvstendigMedManglerOpptjening.vedtak.sykepengegrunnlagsfakta)
) {
    throw new Error('Mangler selvstendig grunnlagsfakta')
}

selvstendigMedManglerOpptjening.vedtak.sykepengegrunnlag = 0
selvstendigMedManglerOpptjening.vedtak.sykepengegrunnlagsfakta.selvstendig = {
    ...selvstendigMedManglerOpptjening.vedtak.sykepengegrunnlagsfakta.selvstendig,
    beregningsgrunnlag: 0,
}
selvstendigMedManglerOpptjening.vedtak.utbetaling = {
    ...jsonDeepCopy(standardSelvstendig.vedtak.utbetaling),
    utbetalingId: 'tilfeldig-utbetaling-selvstendig-mangler-opptjening',
}
