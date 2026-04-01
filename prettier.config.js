import baseConfig from '@navikt/tsm-prettier'

const config = {
    ...baseConfig,
    plugins: [...(baseConfig.plugins || []), 'prettier-plugin-tailwindcss'],
    tailwindStylesheet: './src/style/global.css',
    tailwindFunctions: ['clsx', 'cn'],
}

export default config
