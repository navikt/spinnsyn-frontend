import { useContext, useState } from 'react'

import { ArkiveringContext } from '../../context/arkivering-context'
import { spinnsynFrontendInterne } from '../../utils/environment'

import { FeedbackButton, FlexjarFelles } from './flexjar-felles'

export const FlexjarVarSidenNyttig = ({
    erDirekteutbetaling,
    erRefusjon,
    harAvvisteDager,
    annullert,
    erRevurdert,
    julesoknad,
    erRevurdering,
}: {
    erRefusjon: boolean
    erDirekteutbetaling: boolean
    harAvvisteDager: boolean
    annullert: boolean
    erRevurdert: boolean
    julesoknad: boolean
    erRevurdering: boolean
}) => {
    const arkivering = useContext(ArkiveringContext)

    const [activeState, setActiveState] = useState<string | number | null>(null)
    const [thanksFeedback, setThanksFeedback] = useState<boolean>(false)

    if (arkivering || spinnsynFrontendInterne()) return null

    const feedbackId = 'spinnsyn-vedtak'

    const getPlaceholder = (): string => {
        switch (activeState) {
            case 'JA':
                return 'Er det noe du vil trekke frem? (valgfritt)'
            case 'NEI':
                return 'Hva er det du ikke liker? (valgfritt)'
            case 'FORBEDRING':
                return 'Hva kan forbedres?'
            default:
                throw Error('Ugyldig tilbakemeldingstype')
        }
    }

    const feedbackButtonProps = {
        activeState,
        setThanksFeedback,
        setActiveState,
    }

    const feedbackProps: Record<string, string | undefined | boolean> = {
        erRefusjon,
        harAvvisteDager,
        erDirekteutbetaling,
        annullert,
        revurdert: erRevurdert,
        erRevurdering,
    }
    if (julesoknad) {
        feedbackProps['julesøknad'] = true
    }
    return (
        <FlexjarFelles
            feedbackId={feedbackId}
            setActiveState={setActiveState}
            activeState={activeState}
            thanksFeedback={thanksFeedback}
            setThanksFeedback={setThanksFeedback}
            getPlaceholder={getPlaceholder}
            feedbackProps={feedbackProps}
            textRequired={activeState === 'FORBEDRING'}
            flexjartittel="Hjelp oss med å gjøre denne siden bedre"
            flexjarsporsmal="Var denne siden nyttig?"
        >
            <div className="flex w-full gap-2">
                <FeedbackButton feedbackId={feedbackId} tekst="Ja" svar="JA" {...feedbackButtonProps} />
                <FeedbackButton feedbackId={feedbackId} tekst="Nei" svar="NEI" {...feedbackButtonProps} />
                <FeedbackButton
                    feedbackId={feedbackId}
                    tekst="Foreslå forbedring"
                    svar="FORBEDRING"
                    {...feedbackButtonProps}
                />
            </div>
        </FlexjarFelles>
    )
}
