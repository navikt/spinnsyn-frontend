import { useState } from 'react'
import { Radio, RadioGroup } from '@navikt/ds-react'

export const VANSKELIGHETSGRAD = {
    ENKELT: 'Veldig enkelt',
    GANSKE_ENKELT: 'Ganske enkelt',
    LITT_VANSKELIG: 'Litt vanskelig',
    VELDIG_VANSKELIG: 'Veldig vanskelig',
} as const

export const VANSKELIG_GRUNN = {
    SKJONTE_IKKE_HVORFOR: 'Skjønte ikke hvorfor svaret ble som det ble',
    VANSKELIG_A_FINNE: 'Svaret var vanskelig å finne frem i',
    KOMPLISERT_SPRAK: 'Språket var komplisert',
    MANGLET_INFO: 'Svaret manglet viktig informasjon',
    ANNET: 'Annet',
} as const

type FeedbackRadioProps = {
    setThanksFeedback: (b: boolean) => void
    feedbackId: string
    activeState: string | number | null
    setActiveState: (s: string | number | null) => void
}

export const FeedbackRadio = (props: FeedbackRadioProps) => {
    const [hovedvalg, setHovedvalg] = useState<string | null>(null)
    const [visVanskelig, setVisVanskelig] = useState(false)

    return (
        <>
            <RadioGroup
                className="mb-8"
                legend="Hvordan synes du det var å forstå svaret på søknaden?"
                onChange={(val) => {
                    setHovedvalg(val)
                    if (val === VANSKELIGHETSGRAD.ENKELT || val === VANSKELIGHETSGRAD.GANSKE_ENKELT) {
                        setVisVanskelig(false)
                        props.setActiveState(JSON.stringify({ hovedvalg: val, undervalg: '' }))
                    } else if (val === VANSKELIGHETSGRAD.LITT_VANSKELIG || val === VANSKELIGHETSGRAD.VELDIG_VANSKELIG) {
                        setVisVanskelig(true)
                        props.setActiveState(JSON.stringify({ hovedvalg: val, undervalg: '' }))
                    }
                    props.setThanksFeedback(false)
                }}
            >
                <Radio value={VANSKELIGHETSGRAD.ENKELT}>Veldig enkelt</Radio>
                <Radio value={VANSKELIGHETSGRAD.GANSKE_ENKELT}>Ganske enkelt</Radio>
                <Radio value={VANSKELIGHETSGRAD.LITT_VANSKELIG}>Litt vanskelig</Radio>
                <Radio value={VANSKELIGHETSGRAD.VELDIG_VANSKELIG}>Veldig vanskelig</Radio>
            </RadioGroup>
            {visVanskelig && hovedvalg && (
                <RadioGroup
                    className="mb-8"
                    legend="Hva synes du var vanskelig?"
                    description="Velg alternativet som passer best"
                    onChange={(val) => {
                        props.setThanksFeedback(false)
                        props.setActiveState(JSON.stringify({ hovedvalg, undervalg: val }))
                    }}
                >
                    <Radio value={VANSKELIG_GRUNN.SKJONTE_IKKE_HVORFOR}>
                        Skjønte ikke hvorfor svaret ble som det ble
                    </Radio>
                    <Radio value={VANSKELIG_GRUNN.VANSKELIG_A_FINNE}>Svaret var vanskelig å finne frem i</Radio>
                    <Radio value={VANSKELIG_GRUNN.KOMPLISERT_SPRAK}>Språket var komplisert</Radio>
                    <Radio value={VANSKELIG_GRUNN.MANGLET_INFO}>Svaret manglet viktig informasjon</Radio>
                    <Radio value={VANSKELIG_GRUNN.ANNET}>Annet</Radio>
                </RadioGroup>
            )}
        </>
    )
}
