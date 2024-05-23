import dayjs from 'dayjs'

import { AndreArbeidsgivere, RSDag, RSVedtakWrapper } from './rs-types/rs-vedtak'

export class VedtakWrapper implements VedtakWrapperProps {
    public readonly id: string
    public readonly lest: boolean
    public readonly lestDato: dayjs.Dayjs | null
    public readonly vedtak: Vedtak
    public readonly opprettetTimestamp: dayjs.Dayjs
    public readonly orgnavn: string
    public readonly andreArbeidsgivere: AndreArbeidsgivere
    public readonly annullert: boolean
    public readonly revurdert: boolean
    public readonly dagerArbeidsgiver: RSDag[]
    public readonly dagerPerson: RSDag[]
    public readonly sykepengebelopArbeidsgiver: number
    public readonly sykepengebelopPerson: number
    public readonly organisasjoner: Record<string, string>

    constructor(opts: VedtakWrapperProps) {
        this.id = opts.id
        this.lest = opts.lest
        this.lestDato = opts.lestDato
        this.vedtak = opts.vedtak
        this.opprettetTimestamp = opts.opprettetTimestamp
        this.orgnavn = opts.orgnavn
        this.andreArbeidsgivere = opts.andreArbeidsgivere
        this.annullert = opts.annullert
        this.revurdert = opts.revurdert
        this.dagerArbeidsgiver = opts.dagerArbeidsgiver
        this.dagerPerson = opts.dagerPerson
        this.sykepengebelopArbeidsgiver = opts.sykepengebelopArbeidsgiver
        this.sykepengebelopPerson = opts.sykepengebelopPerson
        this.organisasjoner = opts.organisasjoner
    }
}

export function rsVedtakTilVedtak(rsvedtak: RSVedtakWrapper): VedtakWrapper {
    return new VedtakWrapper({
        id: rsvedtak.id,
        lest: rsvedtak.lest,
        lestDato: rsvedtak.lestDato ? dayjs(rsvedtak.lestDato) : null,
        vedtak: new Vedtak(), // TODO: Implementer Vedtak
        opprettetTimestamp: dayjs(rsvedtak.opprettetTimestamp),
        orgnavn: rsvedtak.orgnavn,
        andreArbeidsgivere: rsvedtak.andreArbeidsgivere,
        annullert: rsvedtak.annullert,
        revurdert: rsvedtak.revurdert,
        dagerArbeidsgiver: rsvedtak.dagerArbeidsgiver,
        dagerPerson: rsvedtak.dagerPerson,
        sykepengebelopArbeidsgiver: rsvedtak.sykepengebelopArbeidsgiver,
        sykepengebelopPerson: rsvedtak.sykepengebelopPerson,
        organisasjoner: rsvedtak.organisasjoner,
    })
}

export class Vedtak {}

interface VedtakWrapperProps {
    id: string
    lest: boolean
    lestDato: dayjs.Dayjs | null
    vedtak: Vedtak
    opprettetTimestamp: dayjs.Dayjs
    orgnavn: string
    andreArbeidsgivere: AndreArbeidsgivere
    annullert: boolean
    revurdert: boolean
    dagerArbeidsgiver: RSDag[]
    dagerPerson: RSDag[]
    sykepengebelopArbeidsgiver: number
    sykepengebelopPerson: number
    organisasjoner: Record<string, string>
}
