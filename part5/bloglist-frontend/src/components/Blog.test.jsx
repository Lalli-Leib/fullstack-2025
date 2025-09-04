import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from './Blog'

test('Renders blog title but not other fields', () => {
  const blog = {
    id: '2025',
    title: 'Testiblogi',
    author: 'Valtteri Kissa',
    url: 'http://vblogi.com',
    likes: 5,
    user: { id: '1', username: 'valtsukka', name: 'Valtteri' },
  }

  render(<Blog blog={blog} />)

  expect(screen.getByText('Testiblogi')).toBeInTheDocument()
  expect(screen.queryByText(/Author:/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/Url:/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/Likes:/i)).not.toBeInTheDocument()
})