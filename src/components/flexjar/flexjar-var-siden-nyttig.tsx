import React, { useContext, useState } from 'react'
import { shuffle } from 'remeda'

import { ArkiveringContext } from '../../context/arkivering-context'
import { spinnsynFrontendInterne } from '../../utils/environment'

import { FeedbackRadioGroup, FlexjarFelles } from './flexjar-felles'

const VELDIG_ENKELT = 'VELDIG_ENKELT'
const GANSKE_ENKELT = 'GANSKE_ENKELT'
const LITT_VANSKELIG = 'LITT_VANSKELIG'
const VELDIG_VANSKELIG = 'VELDIG_VANSKELIG'

const SKJONTE_IKKE_HVORFOR = 'SKJONTE_IKKE_HVORFOR'
const VANSKELIG_A_FINNE = 'VANSKELIG_A_FINNE'
const KOMPLISERT_SPRAK = 'KOMPLISERT_SPRAK'
const MANGLER_INFO = 'MANGLER_INFO'
const ANNET = 'ANNET'

const VANSKELIGHETSGRAD_ALTERNATIVER = [
    { key: VELDIG_ENKELT, value: 'Veldig enkelt' },
    { key: GANSKE_ENKELT, value: 'Ganske enkelt' },
    { key: LITT_VANSKELIG, value: 'Litt vanskelig' },
    { key: VELDIG_VANSKELIG, value: 'Veldig vanskelig' },
]

const VANSKELIGE_AARSAKER_ALTERNATIVER = [
    { key: SKJONTE_IKKE_HVORFOR, value: 'Skjønte ikke hvorfor svaret ble som det ble' },
    { key: VANSKELIG_A_FINNE, value: 'Svaret var vanskelig å finne frem i' },
    { key: KOMPLISERT_SPRAK, value: 'Språket var komplisert' },
    { key: MANGLER_INFO, value: 'Svaret manglet viktig informasjon' },
    { key: ANNET, value: 'Annet' },
]

const ALLE_VANSKELIGE_AARSAKER_BLANDET = [
    ...shuffle(VANSKELIGE_AARSAKER_ALTERNATIVER.slice(0, -1)),
    VANSKELIGE_AARSAKER_ALTERNATIVER[VANSKELIGE_AARSAKER_ALTERNATIVER.length - 1],
]

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
    const [aarsak, setAarsak] = useState<string | null>(null)
    const [visSendeKnapp, setVisSendeKnapp] = useState<boolean>(false)
    const [visTextTilbakemelding, setVisTextTilbakemelding] = useState<boolean>(false)

    if (arkivering || spinnsynFrontendInterne()) return null

    const feedbackId = 'spinnsyn-vedtak-v2'
    const getPlaceholder = (): string => {
        switch (activeState) {
            case VELDIG_ENKELT:
            case GANSKE_ENKELT:
                return 'Hva synes du var bra?'
            case LITT_VANSKELIG:
            case VELDIG_VANSKELIG:
                return 'Har du forslag til hvordan vi kan gjøre det bedre?'
            default:
                throw Error('Ugyldig tilbakemeldingstype')
        }
    }

    const tilleggssporsmal: Record<string, string | undefined | boolean> = {
        aarsak: aarsak?.toString(),
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

    const handterEndretVanskelighet = (vanskeligKey: string) => {
        setActiveState(vanskeligKey)
        if (vanskeligKey === LITT_VANSKELIG || vanskeligKey === VELDIG_VANSKELIG) {
            setAarsak(null)
            setVisTextTilbakemelding(false)
        }
        setVisSendeKnapp(true)
    }

    const handterEndretAarsak = (value: string | number | null) => {
        setVisTextTilbakemelding(true)
        setAarsak(value?.toString() ?? null)
    }

    const visAarsak = activeState === LITT_VANSKELIG || activeState === VELDIG_VANSKELIG

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
            textRequired={false}
            showSendFeedback={visSendeKnapp}
            showTextBox={visTextTilbakemelding}
            additionalQuestions={tilleggssporsmal}
        >
            <div className="flex w-full mt-2 mb-2">
                <FeedbackRadioGroup
                    feedbackId={feedbackId}
                    sporsmal="Hvordan synes du det var å forstå svaret på søknaden?"
                    svarAlternativer={VANSKELIGHETSGRAD_ALTERNATIVER}
                    setSvar={handterEndretVanskelighet}
                    svar={activeState?.toString() ?? ''}
                />
            </div>
            {visAarsak && (
                <div className="flex w-full mt-4">
                    <FeedbackRadioGroup
                        feedbackId={feedbackId}
                        sporsmal="Hva synes du var vanskelig?"
                        undertekst="Velg alternativet som passer best"
                        svarAlternativer={ALLE_VANSKELIGE_AARSAKER_BLANDET}
                        setSvar={handterEndretAarsak}
                        svar={aarsak ?? ''}
                    />
                </div>
            )}
        </FlexjarFelles>
    )
}
