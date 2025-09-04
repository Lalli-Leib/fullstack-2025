import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('BlogForm updates parent state and calls onSubmit', async () => {
  const onSubmit = vi.fn()
  render(<BlogForm onSubmit={onSubmit} />)

  const user = userEvent.setup()

  await user.type(screen.getByPlaceholderText('Title'), 'Testiblogi')
  await user.type(screen.getByPlaceholderText('Author'), 'Valtteri Kissa')
  await user.type(screen.getByPlaceholderText('https://example.fi'), 'http://vblogi.com')

  await user.click(screen.getByText('create'))
  console.log(onSubmit.mock.calls)

  expect(onSubmit.mock.calls).toHaveLength(1)
  expect(onSubmit.mock.calls[0][0]).toEqual({
    title: 'Testiblogi',
    author: 'Valtteri Kissa',
    url: 'http://vblogi.com',
  })
})