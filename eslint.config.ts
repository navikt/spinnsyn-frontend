import { defineConfig } from 'eslint/config'
import nextTs from 'eslint-config-next/typescript'
import nextVitals from 'eslint-config-next/core-web-vitals'
import tsmEslintReact from '@navikt/tsm-eslint-react'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

module.exports = defineConfig([
    ...nextVitals,
    ...nextTs,
    ...tsmEslintReact,
    {
        rules: {
            'postcss-modules/no-undef-class': 'off',
            'postcss-modules/no-unused-class': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
        },
    },
    {
        extends: [prettierRecommended],
        rules: {
            'prettier/prettier': 'warn',
        },
    },
    {
        rules: {
            'react-hooks/refs': 'off',
        },
    },
])
