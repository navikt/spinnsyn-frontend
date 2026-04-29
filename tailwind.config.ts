import type { Config } from 'tailwindcss'
import naviktTailwindPreset from '@navikt/ds-tailwind'

const config: Config = {
    presets: [naviktTailwindPreset],
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [],
}

export default config
