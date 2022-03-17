import 'node-fetch'

import { Components, fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr'
import crypto from 'crypto'
import getConfig from 'next/config'
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

const { serverRuntimeConfig } = getConfig()

// The 'head'-field of the document initialProps contains data from <head> (meta-tags etc)
const getDocumentParameter = (initialProps: DocumentInitialProps, name: string) => {
    return initialProps.head?.find((element) => element?.props?.name === name)?.props?.content
}

interface Props {
    Decorator: Components;
    language: string;
}

const prodCsp = `
  default-src 'none';
  connect-src 'self' https://www.nav.no https://amplitude.nav.no https://www.google-analytics.com https://nav.psplugin.com https://ta-survey-v2.herokuapp.com;
  img-src 'self' data: https://www.nav.no;
  font-src 'self' data: https://se-content-a.psplugin.com https://content.psplugin.com;
  frame-src 'self' https://vars.hotjar.com;
  form-action 'self';
  style-src 'self' 'unsafe-inline' https://www.nav.no/;
  worker-src blob: *.nais.io;
`

const scriptDomains = 'https://www.nav.no https://www.googletagmanager.com https://www.google-analytics.com https://static.hotjar.com https://script.hotjar.com https://in2.taskanalytics.com https://account.psplugin.com'

const devCsp = `
  default-src 'self';
  img-src 'self' data:;
  font-src 'self' data:;
  style-src 'self' 'unsafe-inline';
`

const isProd = process.env.NODE_ENV === 'production'

class MyDocument extends Document<Props> {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & Props> {
        const initialProps = await Document.getInitialProps(ctx)

        const Decorator = await fetchDecoratorReact({
            dekoratorenUrl: serverRuntimeConfig.decoratorUrl,
            env: serverRuntimeConfig.decoratorEnv,
            simple: false,
            chatbot: false,
            feedback: false,
            urlLookupTable: false,
        })

        const language = getDocumentParameter(initialProps, 'lang')

        return { ...initialProps, Decorator, language }
    }

    render(): JSX.Element {
        const productionScriptContent = `${scriptDomains} 'unsafe-inline' 'unsafe-eval'`
        const baseCsp = (isProd ? prodCsp : devCsp).replace(/\s{2,}/g, ' ').trim()
        const csp = `${baseCsp} script-src 'self' ${isProd ? productionScriptContent : "'unsafe-inline' 'unsafe-eval'"}`

        const { Decorator, language } = this.props
        const showDecorator = serverRuntimeConfig.noDecorator != 'true'
        return (
            <Html lang={language || 'no'}>
                <Head>
                    <meta httpEquiv="Content-Security-Policy" content={csp} />
                    {showDecorator && <Decorator.Styles />}
                </Head>
                <body>
                    {showDecorator && <Decorator.Header />}
                    <Main />
                    {showDecorator && <>
                        <Decorator.Footer />
                        <Decorator.Scripts />
                    </>}
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
