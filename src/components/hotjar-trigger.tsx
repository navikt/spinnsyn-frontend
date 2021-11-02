import { useEffect } from 'react'

import { isOpplaering, isProd } from '../utils/environment'
import { logger } from '../utils/logger'

interface HotjarTriggerProps {
    children: any;
}

interface HotjarWindow extends Window {
    hj: (name: string, value: string) => void;
}

export const HotjarTrigger = ({ children }: HotjarTriggerProps) => {

    useEffect(() => {
        const hotJarWindow = (window as unknown as HotjarWindow)

        if (isProd() || isOpplaering()) {
            setTimeout(() => {
                if (typeof hotJarWindow.hj !== 'function') {
                    logger.info('Hotjar ble ikke lastet inn...')
                } else {
                    hotJarWindow.hj('trigger', 'SP_INNSYN')
                }
            }, 2000)
        }
    }, [])

    return children
}
