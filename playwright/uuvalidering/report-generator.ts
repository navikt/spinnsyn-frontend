import { Result } from 'axe-core'

import { generateColorContrastHtml } from './color-utils'

export function generateHtmlReport(violations: Result[], url: string): string {
    const impactCounts = {
        critical: violations.filter((v) => v.impact === 'critical').length,
        serious: violations.filter((v) => v.impact === 'serious').length,
        moderate: violations.filter((v) => v.impact === 'moderate').length,
        minor: violations.filter((v) => v.impact === 'minor').length,
    }

    return `
<!DOCTYPE html>
<html lang="nb">
<head>
    <meta charset="UTF-8">
    <title>UU-Violations Rapport</title>
    <style>${getReportStyles()}</style>
</head>
<body>
    <div class="header">
        <h1>🚨 UU-Violations Rapport</h1>
        <p><strong>URL:</strong> ${url}</p>
        <p><strong>Antall violations:</strong> ${violations.length}</p>
    </div>

    <div class="stats">
        <h3>📊 Statistikk</h3>
        <p><strong>Critical:</strong> ${impactCounts.critical}</p>
        <p><strong>Serious:</strong> ${impactCounts.serious}</p>
        <p><strong>Moderate:</strong> ${impactCounts.moderate}</p>
        <p><strong>Minor:</strong> ${impactCounts.minor}</p>
    </div>

    ${violations.map((violation) => generateViolationHtml(violation)).join('')}
</body>
</html>`
}

function getReportStyles(): string {
    return `
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
        .color-contrast-detail {
            font-size: 13px;
            color: #555;
            margin: 8px 0;
            font-family: monospace;
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
        }
        .color-sample {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 2px 6px;
            border-radius: 3px;
            border: 1px solid #ccc;
            font-size: 11px;
        }
        .color-swatch {
            width: 16px;
            height: 16px;
            border-radius: 2px;
            border: 1px solid #999;
            display: inline-block;
        }
        .contrast-ratio {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 2px 6px;
            border-radius: 3px;
            font-weight: bold;
        }
        .contrast-ratio.fail {
            background: #f8d7da;
            border-color: #f5c6cb;
            color: #721c24;
        }
        .node-section-table {
            border-collapse: collapse;
            margin-top: 6px;
            width: 100%;
        }
        .node-section-table td {
            padding: 4px 8px;
            border: 1px solid #e0e0e0;
            vertical-align: top;
        }
        .node-section-table th {
            background: #f1f2f6;
            font-weight: bold;
            padding: 4px 8px;
            border: 1px solid #e0e0e0;
            width: 120px;
        }
        .node-html {
            color: #555;
            font-size: 12px;
            font-family: monospace;
            background: #f4f4f4;
            padding: 4px;
            border-radius: 2px;
            max-width: 100%;
            overflow-x: auto;
            word-break: break-all;
        }
        .node-failure-summary {
            color: #b00;
            font-size: 12px;
        }
        .node-checks {
            margin-bottom: 4px;
        }
        .node-check-id {
            font-weight: bold;
            color: #333;
        }
        .node-check-data {
            margin-left: 10px;
            color: #222;
            font-size: 11px;
        }`
}

function generateViolationHtml(violation: Result): string {
    return `
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
                    ${violation.nodes.map((node) => generateNodeHtml(violation.id, node)).join('')}
                </div>

                <a href="${violation.helpUrl}" target="_blank" class="help-link">📚 Les mer om denne regelen</a>
            </div>
        </div>`
}

function generateNodeHtml(violationId: string, node: any): string {
    const colorDetails =
        violationId === 'color-contrast' && node.any?.[0]?.data ? generateColorContrastHtml(node.any[0].data) : ''

    const nodeDetails = `
        <table class="node-section-table">
            <tr>
                <th>Impact</th>
                <td>${node.impact ?? 'ukjent'}</td>
            </tr>
            <tr>
                <th>HTML</th>
                <td><div class="node-html">${(node.html || 'ukjent').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div></td>
            </tr>
            <tr>
                <th>Failure Summary</th>
                <td><div class="node-failure-summary">${node.failureSummary?.replace(/\n/g, ' ') || '—'}</div></td>
            </tr>
            ${['any', 'all', 'none']
                .map(
                    (checkType) =>
                        `<tr>
                    <th>${checkType.charAt(0).toUpperCase() + checkType.slice(1)}</th>
                    <td>${generateCheckHtml(node[checkType])}</td>
                </tr>`,
                )
                .join('')}
        </table>`

    return `<div class="element">${node.target.join(' ')}${colorDetails}${nodeDetails}</div>`
}

function generateCheckHtml(checks: any[]): string {
    if (!checks?.length) return '—'

    return checks
        .map(
            (check) => `
        <div class="node-checks">
            <span class="node-check-id">${check.id}</span>
            ${
                check.data
                    ? `<div class="node-check-data">${Object.entries(check.data)
                          .map(([k, v]) => `<div>${k}: ${String(v)}</div>`)
                          .join('')}</div>`
                    : ''
            }
            ${check.message ? `<div class="node-check-data">${check.message}</div>` : ''}
        </div>`,
        )
        .join('')
}
