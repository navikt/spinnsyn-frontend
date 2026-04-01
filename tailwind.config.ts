import naviktTailwindPreset from '@navikt/ds-tailwind'

const config = {
    presets: [naviktTailwindPreset],
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [],
}

export default config
