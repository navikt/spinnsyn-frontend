import { DecoratorComponentsReact, fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr'
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — internal Next.js export, used to surface __NEXT_DATA__ in <Head>.
import { HtmlContext } from 'next/dist/shared/lib/html-context.shared-runtime'
import React from 'react'
import { InternalHeader } from '@navikt/ds-react'

import { createInitialServerSideBreadcrumbs } from '../hooks/useBreadcrumbs'
import { getPublicEnv, safeJsonStringify, spinnsynFrontendInterne } from '../utils/environment'

/**
 * React 19 (used by Next 16) auto-hoists <script src> to <head>. The Pages Router
 * still emits <script id="__NEXT_DATA__" type="application/json"> from <NextScript />
 * in <body>. Result: the hoisted Turbopack chunks execute during head parsing,
 * before __NEXT_DATA__ exists in the DOM, the bootstrap reads getElementById
 * and gets null, and hydration silently never starts.
 *
 * Workaround: render an additional copy of __NEXT_DATA__ at the top of <Head>.
 * getElementById returns the first match, so the bootstrap finds it.
 */
function NextDataInHead() {
    return (
        <HtmlContext.Consumer>
            {(ctx: { __NEXT_DATA__?: unknown; nonce?: string } | undefined) => {
                const data = ctx?.__NEXT_DATA__
                if (!data) return null
                return (
                    <script
                        id="__NEXT_DATA__"
                        type="application/json"
                        nonce={ctx?.nonce}
                        dangerouslySetInnerHTML={{ __html: safeJsonStringify(data) }}
                    />
                )
            }}
        </HtmlContext.Consumer>
    )
}

// The 'head'-field of the document initialProps contains data from <head> (meta-tags etc)
const getDocumentParameter = (initialProps: DocumentInitialProps, name: string) => {
    return initialProps.head?.find((element) => element?.props?.name === name)?.props?.content
}

interface Props {
    Decorator?: DecoratorComponentsReact
    language: string
    internheader: boolean
    ctx: DocumentContext
}

class MyDocument extends Document<Props> {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & Props> {
        const initialProps = await Document.getInitialProps(ctx)

        const language = getDocumentParameter(initialProps, 'lang')
        const internheader = spinnsynFrontendInterne()

        const props: DocumentInitialProps & Props = {
            ...initialProps,
            language,
            internheader,
            ctx,
        }

        const showDecorator = process.env.NO_DECORATOR != 'true'
        if (showDecorator) {
            props.Decorator = await fetchDecoratorReact({
                env: (process.env.DECORATOR_ENV as 'dev' | 'prod') || 'dev',
                params: {
                    chatbot: false,
                    feedback: false,
                    breadcrumbs: createInitialServerSideBreadcrumbs(ctx.pathname),
                    logoutWarning: process.env.MOCK_BACKEND !== 'true',
                },
            })
        }
        return props
    }

    render() {
        const { Decorator, language, internheader, ctx } = this.props
        const arkivering = ctx.pathname.includes('vedtak/arkivering')
        const visDekorator = Decorator != null && !arkivering && !internheader

        function header() {
            if (internheader) {
                return (
                    <InternalHeader>
                        <InternalHeader.Title as="h1">Svar på søknad om sykepenger</InternalHeader.Title>
                    </InternalHeader>
                )
            }
            if (visDekorator) {
                return <Decorator.Header />
            }
            return null
        }

        return (
            <Html lang={language || 'no'}>
                <Head>
                    <NextDataInHead />
                    <script
                        id="__public_env__"
                        dangerouslySetInnerHTML={{
                            __html: `window.__publicEnv = ${safeJsonStringify(getPublicEnv())};window.__publicEnvLoaded = true;`,
                        }}
                    />
                    {visDekorator && <Decorator.HeadAssets />}
                </Head>
                <body>
                    {header()}
                    <Main />
                    {visDekorator && (
                        <>
                            <Decorator.Footer />
                            <Decorator.Scripts />
                        </>
                    )}
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
