export function testpersonFraUrl(asPath: string | undefined): string | undefined {
    return new URLSearchParams(asPath?.split('?')[1] ?? '').get('testperson') ?? undefined
}
