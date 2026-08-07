import { test, expect } from '@playwright/test';

test('Critical Hackathon Journey', async ({ page }) => {
  // 1. Landing Page
  await page.goto('/');
  await expect(page).toHaveTitle(/frontend|Vite/i);
  
  // 2. Wait for 5-second splash screen to finish (or bypass if state allows, but we must wait)
  // The splash screen takes 5 seconds. We will wait 6 seconds to be safe.
  await page.waitForTimeout(6000);

  // Navigate to Dashboard
  await page.click('text=Launch Console');
  
  // 3. Command Center (Default route)
  await expect(page.locator('text=Command Center').first()).toBeVisible();

  // 4. Document Center
  await page.click('text=Document Center');
  await expect(page.locator('text=1-Click Demo Library')).toBeVisible();

  // 5. Select Demo Document & Analyze
  // We mock the backend response here because in CI there's no Gemini key.
  // The backend might not even be running, so let's use Playwright route interception.
  await page.route('**/api/v1/analyze', async route => {
    const json = {
      complianceScore: 82,
      riskScore: 25,
      fraudProbability: 5,
      confidenceScore: 99,
      executiveSummary: 'MOCKED E2E DATA: This document is fully compliant.',
      keyClauses: ['Mock Clause A'],
      missingClauses: ['Mock Clause B'],
      positiveFindings: ['Mock Positive'],
      highRiskFindings: ['Mock Risk'],
      recommendedActions: ['Mock Action'],
      complianceChecks: [
        { id: 1, rule: 'Mock Rule', status: 'Passed', details: 'Mock Details' }
      ],
      risks: [
        { id: 1, type: 'Legal', severity: 'Low', description: 'Mock Risk', location: 'Page 1' }
      ]
    };
    await route.fulfill({ json });
  });

  // Click the first demo document
  await page.click('button:has-text("Employment Agreement")');

  // 6. Wait for processing
  // The frontend has artificial delays (1000ms + 1000ms + 800ms + 800ms) = ~3.6s
  await page.waitForTimeout(5000);
  
  // 7. Verify Human Approval Gateway appears
  await expect(page.locator('text=Human Approval Gateway')).toBeVisible();

  // 8. Human Approval (Approve)
  await page.click('text=Approve');

  // 9. Check Copilot
  await page.click('text=AI Copilot');
  await expect(page.locator('text=AI Chat').first()).toBeVisible();
});
