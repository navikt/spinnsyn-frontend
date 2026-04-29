// @ts-ignore
import baseConfig from '@navikt/tsm-prettier'
import type { Config } from 'prettier'

const config: Config = {
    ...baseConfig,
    plugins: ['prettier-plugin-tailwindcss'],
    tailwindStylesheet: './src/style/global.css',
    tailwindFunctions: ['clsx', 'cn'],
}

export default config
