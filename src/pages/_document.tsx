import 'node-fetch'

import { Components, fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr'
import getConfig from 'next/config'
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

const { serverRuntimeConfig } = getConfig()


// The 'head'-field of the document initialProps contains data from <head> (meta-tags etc)
const getDocumentParameter = (initialProps: DocumentInitialProps, name: string) => {
    return initialProps.head?.find((element) => element?.props?.name === name)?.props?.content
}

interface Props {
    Decorator?: Components;
    language: string;
}

class MyDocument extends Document<Props> {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & Props> {
        const initialProps = await Document.getInitialProps(ctx)

        const skapDekorator = async() => {
            if (ctx.pathname == '500' || ctx.pathname == '404') {
                return undefined
            }
            return await fetchDecoratorReact({
                dekoratorenUrl: serverRuntimeConfig.decoratorUrl,
                env: serverRuntimeConfig.decoratorEnv,
                simple: false,
                chatbot: false,
                feedback: false,
                urlLookupTable: false,
            })
        }

        const Decorator = await skapDekorator()

        const language = getDocumentParameter(initialProps, 'lang')

        return { ...initialProps, Decorator, language }
    }

    render(): JSX.Element {
        const { Decorator, language } = this.props
        if (!Decorator) {
            return (
                <Html lang={language || 'no'}>
                    <Head>
                        <meta name="robots" content="noindex" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                    </Head>
                    <body>
                        <Main />
                        <NextScript />
                    </body>
                </Html>
            )
        }
        return (
            <Html lang={language || 'no'}>
                <Head>
                    <Decorator.Styles />
                    <meta name="robots" content="noindex" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>
                <body>
                    <Decorator.Header />
                    <Main />
                    <Decorator.Footer />
                    <Decorator.Scripts />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
