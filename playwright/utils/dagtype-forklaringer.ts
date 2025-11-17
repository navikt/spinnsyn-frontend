export const DAGTYPE_FORKLARINGER = {
    ArbeidsgiverperiodeDag: {
        label: 'Arbeidsgiverperiode',
        description:
            'Arbeidsgiveren din betaler sykepengene de første 16 dagene du er syk. Se folketrygdloven § 8-19, første avsnitt.',
    },
    Arbeidsdag: {
        label: 'Ikke sykmeldt',
        description: 'Du får ikke sykepenger for dager du ikke har brukt sykmeldingen.',
    },
    NavDagSyk: {
        label: 'Syk',
        description:
            'Du har vært sykmeldt denne dagen og kan få sykepenger for den tiden du ikke har jobbet. Hvor mye du får kommer an på om du har hatt inntekt eller jobbet mens du var syk, eller om du har fått annen pengestøtte fra Nav i tillegg. Se folketrygdloven § 8-13, andre avsnitt.',
    },
    Ventetidsdag: {
        label: 'Dekkes ikke av Nav',
        description:
            'Du har rett til sykepenger fra Nav fra 17. dag i sykefraværet ditt. De første 16 dagene telles fra du oppsøker lege og får en sykmelding, eller du gir beskjed til Nav om at du er syk og ikke kan jobbe.',
    },
    NavHelgDag: {
        label: 'Helg',
        description:
            'Du får bare sykepenger for dagene mandag til fredag. Hvis du jobber i helgen, blir disse dagene likevel tatt med i beregningen, men utbetalingen blir fordelt på ukedagene. Du får ikke sykepenger hvis du bare har vært sykmeldt lørdag og/eller søndag. Se folketrygdloven § 8-11.',
    },
    Fridag: {
        label: 'Fridag',
        description: 'Du får ikke sykepenger for dager du har ferie eller permisjon.',
    },
    ForeldetDag: {
        label: 'Søkt for sent',
        description:
            'Du kan bare få sykepenger opptil tre måneder før den måneden du sendte søknaden, se folketrygdloven §§ 22-3, 22-13, tredje avsnitt. Vi har vurdert at unntaksregelen ikke er oppfylt i saken din, se folketrygdloven § 22-13, syvende avsnitt.',
    },
    UkjentDag: {
        label: 'Ukjent',
        description: 'Vi har ikke mottatt informasjon om denne dagen, så den regnes som arbeidsdag.',
    },
    SykepengedagerOppbrukt: {
        label: 'Maks antall dager',
        description:
            'Du har fått sykepenger fra Nav i 248 dager (mandag-fredag). Det må gå 26 uker uten at du får sykepenger eller arbeidsavklaringspenger før du kan få sykepenger igjen, se folketrygdloven § 8-12, andre avsnitt.',
    },
    MinimumInntekt: {
        label: 'For lav inntekt',
        description:
            'Du har et sykepengegrunnlag på mindre enn et halvt grunnbeløp i året. Det betyr at du ikke kan få sykepenger, se folketrygdloven § 8-3, andre avsnitt.',
    },
    ManglerOpptjening: {
        label: 'Jobbet for kort',
        description:
            'Du må ha vært i arbeid i minst fire uker rett før sykefraværet, det vil si 28 dager fra og med dagen før du ble sykmeldt, se folketrygdloven § 8-2, første avsnitt.',
    },
    ManglerMedlemskap: {
        label: 'Ikke medlem',
        description: 'Du må være medlem i folketrygden for å få sykepenger.',
    },
    Over70: {
        label: 'Over 70 år',
        description: 'Etter at du har fylt 70 år, får du ikke sykepenger fra Nav.',
    },
}
