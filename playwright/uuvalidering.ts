/* eslint-disable no-console */
import { expect, Page, TestInfo } from '@playwright/test'
import { AxeBuilder } from '@axe-core/playwright'
import { Result } from 'axe-core'

export async function validerAxe(
    browserName: string,
    page: Page,
    testInfo: TestInfo,
    disableRules: string[] = [],
    ignoreRules: IgnoreRule[] = [],
) {
    const axeBuilder = new AxeBuilder({ page }).exclude('.ignore-axe')
    if (browserName == 'webkit') {
        axeBuilder.disableRules('color-contrast') // Webkit har problemer med color-contrast-regelen
    }

    // Skru av spesifikke regler hvis angitt
    if (disableRules.length > 0) {
        axeBuilder.disableRules(disableRules)
    }

    const results = await axeBuilder.analyze()

    // axe rapporterer alltid for overlappende elementer med transparent bakgrunnsfarge
    const alltidIgnorerteRegler: IgnoreRule[] = [
        {
            selector: '.navds-accordion',
            rules: ['color-contrast'],
        },
        {
            selector: '.navds-link',
            rules: ['color-contrast'],
        },
    ]
    const violations = filterAxeViolations(results.violations, ignoreRules.concat(alltidIgnorerteRegler))

    if (violations.length > 0) {
        // Legg til annotations for hvert violation - vises i Playwright GUI
        for (const violation of violations) {
            testInfo.annotations.push({
                type: `🚨 UU-Violation: ${violation.id}`,
                description: `${violation.impact?.toUpperCase()}: ${violation.description}\n📍 ${violation.nodes.length} element(s) affected\n🔗 ${violation.helpUrl}`,
            })
        }

        // Lag en detaljert HTML-rapport som attachment
        const htmlReport = generateHtmlReport(violations, page.url())
        await testInfo.attach('uu-violations-report.html', {
            contentType: 'text/html',
            body: htmlReport,
        })

        // Ta screenshots av spesifikke elementer som har violations
        for (let i = 0; i < violations.length; i++) {
            const violation = violations[i]

            for (let j = 0; j < Math.min(violation.nodes.length, 3); j++) {
                // Maks 3 screenshots per violation
                const node = violation.nodes[j]
                try {
                    // Konverter target til string på en sikker måte
                    const selectorString = node.target.join(' ')
                    const element = page.locator(selectorString).first()

                    if (await element.isVisible()) {
                        // Highlight elementet med rød ramme
                        await element.highlight()

                        // Vent litt for at highlight skal vises
                        await page.waitForTimeout(100)

                        // Ta screenshot av hele viewporten for å få kontekst
                        const fullScreenshot = await page.screenshot({
                            type: 'png',
                            fullPage: false, // Kun synlig område
                        })
                        await testInfo.attach(`violation-${violation.id}-highlighted-${j + 1}.png`, {
                            contentType: 'image/png',
                            body: fullScreenshot,
                        })

                        // Ta også et nærbilde av bare elementet
                        const elementScreenshot = await element.screenshot({ type: 'png' })
                        await testInfo.attach(`violation-${violation.id}-element-${j + 1}.png`, {
                            contentType: 'image/png',
                            body: elementScreenshot,
                        })
                    }
                } catch (error) {
                    // Ignorer hvis vi ikke kan ta screenshot av elementet
                    console.log(`Kunne ikke ta screenshot av element: ${node.target.join(' ')}`)
                }
            }
        }

        // Lag en detaljert feilmelding som vises i test-resultatene
        const errorMessage = violations
            .map(
                (violation) =>
                    `🚨 ${violation.id} (${violation.impact?.toUpperCase()})\n` +
                    `📝 ${violation.description}\n` +
                    `📍 Påvirker ${violation.nodes.length} element(s):\n` +
                    violation.nodes
                        .slice(0, 3)
                        .map((node) => `   • ${node.target.join(' ')}`)
                        .join('\n') +
                    (violation.nodes.length > 3 ? `\n   • ... og ${violation.nodes.length - 3} flere` : '') +
                    `\n🔗 Hjelp: ${violation.helpUrl}\n`,
            )
            .join('\n' + '─'.repeat(80) + '\n')

        // Console log for debugging (mindre detaljert nå)
        console.log('==================\n')
        console.log(`${violations.length} UU-violation(s) detected - se attachments i Playwright GUI for detaljer`)

        expect(violations.length, `${violations.length} UU-violation(s) funnet:\n\n${errorMessage}`).toBe(0)
    }
}

// Define a type for the ignore rules to ensure type safety
export interface IgnoreRule {
    selector: string // The CSS selector to target (e.g., '.navds-accordion__item')
    rules: string[] // An array of rule IDs to ignore for that selector (e.g., ['color-contrast'])
}

/**
 * Filters a list of Axe violations based on a set of ignore rules.
 * This is useful for ignoring known false positives in specific components.
 *
 * @param violations - The array of violations from an Axe analysis.
 * @param ignoreRules - An array of objects, each specifying a selector and the rules to ignore for it.
 * @returns A new array of violations with the ignored ones removed.
 */
function filterAxeViolations(violations: Result[], ignoreRules: IgnoreRule[]): Result[] {
    // If there are no rules to ignore, return the original violations array immediately.
    if (ignoreRules.length === 0) {
        return violations
    }

    return violations.filter((violation) => {
        // Check if the current violation should be ignored based on any of the ignoreRules.
        const shouldIgnore = ignoreRules.some((ignoreRule) => {
            // First, check if the violation's ID is one of the rules we want to ignore for this selector.
            const ruleMatches = ignoreRule.rules.includes(violation.id)
            if (!ruleMatches) {
                return false // This ignore rule doesn't apply to this violation's rule ID.
            }

            // If the rule matches, check if ALL of the violation's nodes match the selector.
            // We use `every` to ensure we only ignore violations where every single
            // reported node is within the specified selector, making the exclusion safe.
            return violation.nodes.every((node) =>
                // A node's target is an array of selectors; we check if any part contains our target selector.
                node.target.some((selectorPart) => selectorPart.includes(ignoreRule.selector)),
            )
        })

        // If `shouldIgnore` is true, the filter returns `false` to REMOVE the violation.
        // Otherwise, it returns `true` to KEEP it.
        return !shouldIgnore
    })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateHtmlReport(violations: any[], url: string): string {
    return `
<!DOCTYPE html>
<html lang="nb">
<head>
    <meta charset="UTF-8">
    <title>UU-Violations Rapport</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 20px; }
        .header { background: #ff6b6b; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .violation { border: 1px solid #ddd; border-radius: 8px; margin-bottom: 20px; overflow: hidden; }
        .violation-header {
            background: #f8f9fa;
            padding: 15px;
            border-bottom: 1px solid #ddd;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .violation-body { padding: 15px; }
        .impact-critical { background: #ff4757; }
        .impact-serious { background: #ff6b6b; }
        .impact-moderate { background: #ffa502; }
        .impact-minor { background: #2ed573; }
        .impact-badge {
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
        }
        .element-list { margin: 10px 0; }
        .element {
            background: #f1f2f6;
            padding: 8px;
            margin: 4px 0;
            border-radius: 4px;
            font-family: monospace;
            font-size: 14px;
        }
        .help-link {
            display: inline-block;
            margin-top: 10px;
            padding: 8px 15px;
            background: #3742fa;
            color: white;
            text-decoration: none;
            border-radius: 4px;
        }
        .stats { background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚨 UU-Violations Rapport</h1>
        <p><strong>URL:</strong> ${url}</p>
        <p><strong>Antall violations:</strong> ${violations.length}</p>
    </div>

    <div class="stats">
        <h3>📊 Statistikk</h3>
        <p><strong>Critical:</strong> ${violations.filter((v) => v.impact === 'critical').length}</p>
        <p><strong>Serious:</strong> ${violations.filter((v) => v.impact === 'serious').length}</p>
        <p><strong>Moderate:</strong> ${violations.filter((v) => v.impact === 'moderate').length}</p>
        <p><strong>Minor:</strong> ${violations.filter((v) => v.impact === 'minor').length}</p>
    </div>

    ${violations
        .map(
            (violation) => `
        <div class="violation">
            <div class="violation-header">
                <span class="impact-badge impact-${violation.impact || 'unknown'}">${(violation.impact || 'unknown').toUpperCase()}</span>
                <h3>${violation.id}</h3>
            </div>
            <div class="violation-body">
                <p><strong>Beskrivelse:</strong> ${violation.description}</p>
                <p><strong>Hjelp:</strong> ${violation.help}</p>

                <h4>📍 Berørte elementer (${violation.nodes.length}):</h4>
                <div class="element-list">
                    ${violation.nodes
                        .map(
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (node: { target: any[] }) => `
                        <div class="element">${node.target.join(' ')}</div>
                    `,
                        )
                        .join('')}
                </div>

                <a href="${violation.helpUrl}" target="_blank" class="help-link">📚 Les mer om denne regelen</a>
            </div>
        </div>
    `,
        )
        .join('')}
</body>
</html>
    `
}
