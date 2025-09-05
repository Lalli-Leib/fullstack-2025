const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Valtteri Kissa',
        username: 'kultapoju',
        password: 'Syrjanmaki'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {

    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible()
  })

describe('Login', () => {
test('Login fails with wrong password', async ({ page }) => {

    await page.getByRole('button', { name: 'login' }).click()
    await page.getByLabel('username').fill('kultapoju')
    await page.getByLabel('password').fill('wrong')
    await page.getByRole('button', { name: 'login' }).click()

    const errorDiv = page.locator('.error')
    await expect(errorDiv).toContainText('Wrong username or password')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    await expect(page.getByText('Logged in as "kultapoju"')).not.toBeVisible()
  })

test('Login succeeds with right password', async ({ page }) => {

            await page.getByRole('button', { name: 'login' }).click()
            await page.getByLabel('username').fill('kultapoju')
            await page.getByLabel('password').fill('Syrjanmaki')
            await page.getByRole('button', { name: 'login' }).click()

            const errorDiv = page.locator('.success')
            await expect(errorDiv).toContainText('Logged in as "kultapoju"')
            await expect(errorDiv).toHaveCSS('border-style', 'solid')
            await expect(errorDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
            await expect(page.getByText('Wrong username or password')).not.toBeVisible()
        })
    })
})