import React from 'react'

import { logEvent } from '../amplitude/amplitude'

export interface EkspanderProps {
    erApen: boolean
    tittel: React.ReactNode | string
    ikon?: string
    children: React.ReactNode
    className?: string
}

export const midtstill = (ekspanderbar: any) => {
    setTimeout(() => {
        if (!ekspanderbar.current) {
            return
        }
        const winhight = window.innerHeight
        const position = ekspanderbar.current!.getBoundingClientRect()
        let top
        if (position.height >= winhight) {
            top = position.top + window.scrollY
        } else {
            top = position.top - (winhight - position.height) / 2 + window.scrollY
        }
        window.scrollTo({ top: top, left: 0, behavior: 'smooth' })
    }, 300)
}

export const ekspanderbarKlikk = (erApen: boolean, ekspanderbar: any, amplitudeText: string) => {
    if (!erApen) {
        if (window) {
            const eventProperties: Record<string, string | boolean> = {
                component: amplitudeText,
            }
            logEvent('accordion åpnet', eventProperties)
            midtstill(ekspanderbar)
            ekspanderbar.current?.focus()
            ekspanderbar.current?.classList.add('delayed--open')
        }
    } else {
        setTimeout(() => {
            ekspanderbar.current?.classList.remove('delayed--open')
        }, 300)
    }
}
