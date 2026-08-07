import { test, expect } from '@playwright/test';

test('Test Document Differentiation (Document A vs Document B)', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/frontend|Vite/i);
  
  // Wait for splash screen
  await page.waitForTimeout(6000);
  await page.click('text=Launch Console');
  
  // Intercept backend calls to simulate two distinct documents
  await page.route('**/api/v1/analyze', async route => {
    const request = route.request();
    const postData = request.postDataJSON();
    const isDocA = postData.context.includes("Employment Agreement");
    
    if (isDocA) {
      await route.fulfill({ json: {
        complianceScore: 90,
        riskScore: 10,
        fraudProbability: 2,
        executiveSummary: 'This is Document A',
        positiveFindings: ['30 days notice verified'],
        complianceChecks: [{ id: 1, rule: 'Notice Period', status: 'Passed', details: '30 days' }],
        risks: [],
        highRiskFindings: ['Critical Risk A']
      }});
    } else {
      await route.fulfill({ json: {
        complianceScore: 50,
        riskScore: 80,
        fraudProbability: 15,
        executiveSummary: 'This is Document B',
        positiveFindings: ['90 days notice verified'],
        complianceChecks: [{ id: 1, rule: 'Notice Period', status: 'Warning', details: '90 days' }],
        risks: [],
        highRiskFindings: ['Critical Risk B']
      }});
    }
  });

  // Test Document A
  await page.click('a:has-text("Document Center")');
  await page.click('button:has-text("Employment Agreement")');
  await page.waitForTimeout(5000); // Wait for pipeline
  await page.click('text=Approve');
  
  await page.click('a:has-text("Compliance")');
  await expect(page.locator('text=30 days notice verified')).toBeVisible();

  await page.click('a:has-text("Risk Vectors")');
  await expect(page.locator('text=Critical Risk A')).toBeVisible();

  // Test Document B
  await page.click('a:has-text("Document Center")');
  await page.click('button:has-text("Mutual Non-Disclosure Agreement")');
  await page.waitForTimeout(5000); // Wait for pipeline
  await page.click('text=Approve');

  await page.click('a:has-text("Compliance")');
  await expect(page.locator('text=90 days notice verified')).toBeVisible();
  
  // Verify A's data is gone
  await expect(page.locator('text=30 days notice verified')).not.toBeVisible();

  await page.click('a:has-text("Risk Vectors")');
  await expect(page.locator('text=Critical Risk B')).toBeVisible();
  await expect(page.locator('text=Critical Risk A')).not.toBeVisible();
});
