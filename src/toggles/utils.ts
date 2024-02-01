import { IToggle } from '@unleash/nextjs'

import { isProd } from '../utils/environment'

import { EXPECTED_TOGGLES } from './toggles'

export function localDevelopmentToggles(url: string | undefined): IToggle[] {
    const query = url?.split('?')[1]
    const params = new URLSearchParams(query)

    return EXPECTED_TOGGLES.map(
        (it): IToggle => ({
            name: it,
            enabled: params.has(it) ? params.get(it) === 'true' : false,
            impressionData: false,
            variant: {
                name: 'disabled',
                enabled: false,
            },
        }),
    )
}

export function getUnleashEnvironment(): 'development' | 'production' {
    if (isProd()) {
        return 'production'
    }
    return 'development'
}
