import * as z from 'zod'

const BoolString = z
    .enum(['true', 'false'])
    .default('false')
    .transform((v) => v === 'true')

// ──────────────────────────────────────────────────────────────────────────────
// Bundlede (build-time) miljøvariabler
//
// Alle variabler med NEXT_PUBLIC_-prefiks bakes inn i klient-bundelen av
// Next.js ved byggetidspunktet. Disse er tilgjengelige både på server og klient.
//
// Valideringen kjører ved modulinnlasting og feiler TIDLIG (ved bygging)
// dersom påkrevde variabler mangler.
// ──────────────────────────────────────────────────────────────────────────────

const BundledEnvSchema = z.object({
    NEXT_PUBLIC_ENVIRONMENT: z.enum(['labs', 'q1', 'prod']),
    NEXT_PUBLIC_MOCK_BACKEND: BoolString,
    NEXT_PUBLIC_OPPLAERING: BoolString,
    NEXT_PUBLIC_UMAMI_ENABLED: BoolString,
    NEXT_PUBLIC_SPINNSYN_FRONTEND_INTERNE: BoolString,
    NEXT_PUBLIC_SPINNSYN_FRONTEND_ARKIVERING: BoolString,
    NEXT_PUBLIC_SYKEFRAVAER_URL: z.string().min(1),
    NEXT_PUBLIC_MINSIDE_URL: z.string().min(1),
    NEXT_PUBLIC_ARKIVERTE_VEDTAK_URL: z.string().min(1),
    NEXT_PUBLIC_TELEMETRY_URL: z.string().nullish(),
    NEXT_PUBLIC_APP_NAME: z.string().default('spinnsyn-frontend'),
    NEXT_PUBLIC_VERSION: z.string().nullish(),
})

export type BundledEnv = z.infer<typeof BundledEnvSchema>

export const bundledEnv: BundledEnv = BundledEnvSchema.parse({
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
    NEXT_PUBLIC_MOCK_BACKEND: process.env.NEXT_PUBLIC_MOCK_BACKEND,
    NEXT_PUBLIC_OPPLAERING: process.env.NEXT_PUBLIC_OPPLAERING,
    NEXT_PUBLIC_UMAMI_ENABLED: process.env.NEXT_PUBLIC_UMAMI_ENABLED,
    NEXT_PUBLIC_SPINNSYN_FRONTEND_INTERNE: process.env.NEXT_PUBLIC_SPINNSYN_FRONTEND_INTERNE,
    NEXT_PUBLIC_SPINNSYN_FRONTEND_ARKIVERING: process.env.NEXT_PUBLIC_SPINNSYN_FRONTEND_ARKIVERING,
    NEXT_PUBLIC_SYKEFRAVAER_URL: process.env.NEXT_PUBLIC_SYKEFRAVAER_URL,
    NEXT_PUBLIC_MINSIDE_URL: process.env.NEXT_PUBLIC_MINSIDE_URL,
    NEXT_PUBLIC_ARKIVERTE_VEDTAK_URL: process.env.NEXT_PUBLIC_ARKIVERTE_VEDTAK_URL,
    NEXT_PUBLIC_TELEMETRY_URL: process.env.NEXT_PUBLIC_TELEMETRY_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_VERSION: process.env.NEXT_PUBLIC_VERSION,
} satisfies Record<keyof BundledEnv, unknown>)

// ──────────────────────────────────────────────────────────────────────────────
// Server-only miljøvariabler
//
// Disse er kun tilgjengelige på serveren og leses ved kjøretid.
// getServerEnv() er lazy — kall den kun i server-side-kode (API-ruter, GSP).
// ──────────────────────────────────────────────────────────────────────────────

const ServerEnvSchema = z.object({
    // Felles for alle varianter
    SPINNSYN_BACKEND_URL: z.string().min(1),
    DECORATOR_ENV: z.string().min(1),
    // Variant-spesifikke (optional i superset-schema, valideres per variant i isReady)
    SPINNSYN_BACKEND_TOKENX_CLIENT_ID: z.string().optional(),
    SOKOS_KONTOREGISTER_PERSON_TOKENX_CLIENT_ID: z.string().optional(),
    FLEXJAR_BACKEND_TOKENX_CLIENT_ID: z.string().optional(),
    UNLEASH_SERVER_API_URL: z.string().optional(),
    UNLEASH_SERVER_API_TOKEN: z.string().optional(),
    SPINNSYN_BACKEND_CLIENT_ID: z.string().optional(),
    NO_DECORATOR: z.string().optional(),
    MODIACONTEXTHOLDER_SCOPE: z.string().optional(),
    MODIACONTEXTHOLDER_URL: z.string().optional(),
    // Valgfritt / plattform-injisert
    UTVIKLING_ARKIVERING: z.string().optional(),
    NAIS_APP_IMAGE: z.string().optional(),
})

const HovedappServerEnvSchema = ServerEnvSchema.extend({
    SPINNSYN_BACKEND_TOKENX_CLIENT_ID: z.string().min(1),
    SOKOS_KONTOREGISTER_PERSON_TOKENX_CLIENT_ID: z.string().min(1),
    FLEXJAR_BACKEND_TOKENX_CLIENT_ID: z.string().min(1),
    UNLEASH_SERVER_API_URL: z.string().min(1),
    UNLEASH_SERVER_API_TOKEN: z.string().min(1),
})

const ArkiveringServerEnvSchema = ServerEnvSchema.extend({
    SPINNSYN_BACKEND_CLIENT_ID: z.string().min(1),
})

const InterneServerEnvSchema = ServerEnvSchema.extend({
    SPINNSYN_BACKEND_CLIENT_ID: z.string().min(1),
    MODIACONTEXTHOLDER_SCOPE: z.string().min(1),
    MODIACONTEXTHOLDER_URL: z.string().min(1),
})

export type ServerEnv = z.infer<typeof ServerEnvSchema>

function serverEnvInput() {
    return {
        DECORATOR_ENV: process.env.DECORATOR_ENV,
        NO_DECORATOR: process.env.NO_DECORATOR,
        UTVIKLING_ARKIVERING: process.env.UTVIKLING_ARKIVERING,
        SPINNSYN_BACKEND_URL: process.env.SPINNSYN_BACKEND_URL,
        SPINNSYN_BACKEND_TOKENX_CLIENT_ID: process.env.SPINNSYN_BACKEND_TOKENX_CLIENT_ID,
        SOKOS_KONTOREGISTER_PERSON_TOKENX_CLIENT_ID: process.env.SOKOS_KONTOREGISTER_PERSON_TOKENX_CLIENT_ID,
        SPINNSYN_BACKEND_CLIENT_ID: process.env.SPINNSYN_BACKEND_CLIENT_ID,
        FLEXJAR_BACKEND_TOKENX_CLIENT_ID: process.env.FLEXJAR_BACKEND_TOKENX_CLIENT_ID,
        MODIACONTEXTHOLDER_SCOPE: process.env.MODIACONTEXTHOLDER_SCOPE,
        MODIACONTEXTHOLDER_URL: process.env.MODIACONTEXTHOLDER_URL,
        NAIS_APP_IMAGE: process.env.NAIS_APP_IMAGE,
        UNLEASH_SERVER_API_URL: process.env.UNLEASH_SERVER_API_URL,
        UNLEASH_SERVER_API_TOKEN: process.env.UNLEASH_SERVER_API_TOKEN,
    } satisfies Record<keyof ServerEnv, unknown>
}

export function getServerEnv(): ServerEnv {
    return ServerEnvSchema.parse(serverEnvInput())
}

export function validerHovedappEnv(): void {
    HovedappServerEnvSchema.parse(serverEnvInput())
}

export function validerArkiveringEnv(): void {
    ArkiveringServerEnvSchema.parse(serverEnvInput())
}

export function validerInterneEnv(): void {
    InterneServerEnvSchema.parse(serverEnvInput())
}
