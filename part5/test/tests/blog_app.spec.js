const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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

            await loginWith(page, 'kultapoju', 'salainen')

            const errorDiv = page.locator('.error')
            await expect(errorDiv).toContainText('Wrong username or password')
            await expect(errorDiv).toHaveCSS('border-style', 'solid')
            await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
            await expect(page.getByText('Logged in as "kultapoju"')).not.toBeVisible()
        })

        test('Login succeeds with right password', async ({ page }) => {

            await loginWith(page, 'kultapoju', 'Syrjanmaki')

            const errorDiv = page.locator('.success')
            await expect(errorDiv).toContainText('Logged in as "kultapoju"')
            await expect(errorDiv).toHaveCSS('border-style', 'solid')
            await expect(errorDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
            await expect(page.getByText('Wrong username or password')).not.toBeVisible()
        })
    })

    describe('When logged in', () => {

        beforeEach(async ({ page }) => {
        await loginWith(page, 'kultapoju', 'Syrjanmaki')
        })

        test('A new blog can be created and is added to  shown blogs list', async ({ page }) => {
            await createBlog(page, 'Otsikko', 'Kirjoittaja', 'https://esimerkki.fi')
            await expect(page.getByText('New blog otsikko added by Kirjoittaja')).toBeVisible()
            const list = page.getByTestId('blog-list')
            await expect(list.getByText('Otsikko')).toBeVisible()
        })
    })
})