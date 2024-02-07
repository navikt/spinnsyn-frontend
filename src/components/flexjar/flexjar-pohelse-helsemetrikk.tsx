import { useState } from 'react'

import { EmojiFlexjar } from './emoji-flexjar'

export const FlexjarPohelseHelsemetrikk = ({
    erDirekteutbetaling,
    erRefusjon,
    harAvvisteDager,
    annullert,
    revurdert,
}: {
    erRefusjon: boolean
    erDirekteutbetaling: boolean
    harAvvisteDager: boolean
    annullert: boolean
    revurdert: boolean
}) => {
    const [activeState, setActiveState] = useState<number | string | null>(null)
    const [thanksFeedback, setThanksFeedback] = useState<boolean>(false)

    const feedbackId = 'spinnsyn-pohelse-helsemetrikk'
    return (
        <EmojiFlexjar
            feedbackId={feedbackId}
            setActiveState={setActiveState}
            activeState={activeState}
            thanksFeedback={thanksFeedback}
            setThanksFeedback={setThanksFeedback}
            getPlaceholder={() => 'Fortell oss om din opplevelse (valgfritt)'}
            flexjarsporsmal="Hvordan opplevde du å søke og å få svar på søknaden om sykepenger?"
            flexjartittel="Hva synes du?"
            feedbackProps={{
                erRefusjon,
                harAvvisteDager,
                erDirekteutbetaling,
                annullert,
                revurdert,
            }}
        />
    )
}
