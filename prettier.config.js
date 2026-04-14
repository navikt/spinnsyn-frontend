// eslint-disable-next-line @typescript-eslint/no-require-imports
const baseConfig = require('@navikt/tsm-prettier')

module.exports = {
    ...baseConfig,
    plugins: ['prettier-plugin-tailwindcss'],
    tailwindStylesheet: './src/styles/global.css',
    tailwindFunctions: ['clsx', 'cn'],
}
