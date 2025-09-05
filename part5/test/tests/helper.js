const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
await page.getByRole('button', { name: 'create a new blog' }).click()
await page.getByPlaceholder('Title').fill(title)
await page.getByPlaceholder('Author').fill(author)
await page.getByPlaceholder('https://example.fi').fill(url)
await page.getByRole('button', { name: 'create' }).click()
}

export { loginWith, createBlog}