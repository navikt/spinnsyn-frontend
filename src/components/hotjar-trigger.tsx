import { useEffect } from 'react'

import env from '../utils/environment'
import { warn } from '../utils/logger'

interface HotjarTriggerProps {
    children: any;
}

interface HotjarWindow extends Window {
    hj: (name: string, value: string) => void;
}

export const HotjarTrigger = ({ children }: HotjarTriggerProps) => {
    useEffect(() => {
        const hotJarWindow = (window as unknown as HotjarWindow)

        if (env.isProd || env.isOpplaering) { // TODO: Sett til bare prod
            setTimeout(() => {
                if (typeof hotJarWindow.hj !== 'function') {
                    warn('Hotjar ble ikke lastet inn...')
                } else {
                    hotJarWindow.hj('trigger', 'SP_VEDTAK')
                }
            }, 2000)
        }
    })

    return children
}
