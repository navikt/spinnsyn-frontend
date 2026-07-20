import React from 'react'

import { glad, lei, noytral, sinna, veldigGlad } from './emojies'
import { FlexjarFelles } from './flexjar-felles'
import { EmojiButton } from './emoji-button'

interface EmojiFlexjarProps {
    feedbackId: string
    activeState: string | number | null
    setActiveState: (s: string | number | null) => void
    thanksFeedback: boolean
    setThanksFeedback: (b: boolean) => void
    getPlaceholder: () => string
    textRequired?: boolean
    flexjarsporsmal: string
    flexjartittel: string
    feedbackProps: Record<string, string | undefined | boolean>
}

export const EmojiFlexjar = ({
    feedbackId,
    getPlaceholder,
    activeState,
    setActiveState,
    thanksFeedback,
    setThanksFeedback,
    flexjartittel,
    flexjarsporsmal,
    feedbackProps,
}: EmojiFlexjarProps) => {
    const feedbackButtonProps = {
        activeState,
        setThanksFeedback,
        setActiveState,
    }
    return (
        <FlexjarFelles
            feedbackId={feedbackId}
            setActiveState={setActiveState}
            activeState={activeState}
            thanksFeedback={thanksFeedback}
            setThanksFeedback={setThanksFeedback}
            getPlaceholder={getPlaceholder}
            flexjarsporsmal={flexjarsporsmal}
            flexjartittel={flexjartittel}
            feedbackProps={feedbackProps}
        >
            <div className="flex w-full gap-2">
                <div className="flex w-full justify-center gap-4">
                    <EmojiButton
                        feedbackId={feedbackId}
                        feedback={1}
                        Emoji={sinna}
                        text="Veldig dårlig"
                        color="var(--ax-bg-danger-soft)"
                        hoverColor="hover:text-ax-danger-500"
                        {...feedbackButtonProps}
                    ></EmojiButton>
                    <EmojiButton
                        feedbackId={feedbackId}
                        feedback={2}
                        Emoji={lei}
                        text="Dårlig"
                        color="var(--ax-bg-warning-soft)"
                        hoverColor="hover:text-ax-warning-500"
                        {...feedbackButtonProps}
                    ></EmojiButton>
                    <EmojiButton
                        feedbackId={feedbackId}
                        feedback={3}
                        Emoji={noytral}
                        text="Nøytral"
                        color="var(--ax-bg-info-soft)"
                        hoverColor="hover:text-ax-info-500"
                        {...feedbackButtonProps}
                    ></EmojiButton>
                    <EmojiButton
                        feedbackId={feedbackId}
                        feedback={4}
                        Emoji={glad}
                        text="Bra"
                        color="var(--ax-bg-success-soft)"
                        hoverColor="hover:text-ax-success-400"
                        {...feedbackButtonProps}
                    ></EmojiButton>
                    <EmojiButton
                        feedbackId={feedbackId}
                        feedback={5}
                        Emoji={veldigGlad}
                        text="Veldig bra"
                        color="var(--ax-bg-success-moderate)"
                        hoverColor="hover:text-ax-success-700"
                        {...feedbackButtonProps}
                    ></EmojiButton>
                </div>
            </div>
        </FlexjarFelles>
    )
}
