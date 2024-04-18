export default async (request) =>
  new Response('Hello, World!', {
    headers: { 'content-type': 'text/html' },
  })

export const config = { path: "/test" };