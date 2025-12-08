import { useContext, useState } from 'react'

import { ArkiveringContext } from '../../context/arkivering-context'
import { spinnsynFrontendInterne } from '../../utils/environment'

import { FeedbackRadio, FlexjarFelles } from './flexjar-felles'

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
        const hovedvalg = typeof activeState === 'string' ? JSON.parse(activeState)?.hovedvalg : ''
        switch (hovedvalg) {
            case 'Veldig enkelt':
            case 'Ganske enkelt':
                return 'Hva synes du var bra?'
            case 'Litt vanskelig':
            case 'Veldig vanskelig':
                return 'Har du forslag til hvordan vi kan gjøre det bedre?'
            default:
                throw Error('Ugyldig tilbakemeldingstype')
        }
    }

    const feedbackRadioProps = {
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
            flexjartittel="Vil du hjelpe oss å gjøre denne siden bedre?"
        >
            <div className="flex-row w-full gap-2">
                <FeedbackRadio feedbackId={feedbackId} {...feedbackRadioProps}></FeedbackRadio>
            </div>
        </FlexjarFelles>
    )
}
