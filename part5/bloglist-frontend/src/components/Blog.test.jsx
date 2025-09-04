import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

  const testBlog = {
    id: '2025',
    title: 'Testiblogi',
    author: 'Valtteri Kissa',
    url: 'http://vblogi.com',
    likes: 5,
    user: { id: '1', username: 'valtsukka', name: 'Valtteri' },
  }

test('Renders blog title but not other fields', () => {

  render(<Blog blog={testBlog}/>)

  expect(screen.getByText('Testiblogi')).toBeInTheDocument()
  expect(screen.queryByText(/Author:/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/Url:/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/Likes:/i)).not.toBeInTheDocument()
})

test('Shows url, likes and author after clicking the view button', async () => {

  const user = userEvent.setup()

  render(<Blog blog={testBlog}/>)
  expect(screen.getByText('Testiblogi')).toBeInTheDocument()
  expect(screen.queryByText(/Url:/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/Likes:/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/Author:/i)).not.toBeInTheDocument()

  const button =screen.getByText('view')
  await user.click(button)

  expect(screen.getByText(/Url:\s*http:\/\/vblogi\.com/i)).toBeInTheDocument()
  expect(screen.getByText(/Likes:\s*5/i)).toBeInTheDocument()
  expect(screen.getByText(/Author:\s*Valtteri Kissa/i)).toBeInTheDocument()
})

test('Clicking the like button twice calls the handler twice', async () => {

  const mockHandler = vi.fn()
  render(<Blog blog={testBlog} onLike={mockHandler}/>)
  const user = userEvent.setup()

  await user.click(screen.getByText('view'))

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})