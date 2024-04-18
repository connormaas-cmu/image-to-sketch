async function setupFetch() {
  const module = await import('node-fetch');
  return module.default;
}

export default async (request) => {
  const fetch = await setupFetch();

  try {
    // throw new Error("Simulated Error");

    const API_KEY = process.env.API_KEY; // Retrieve API Key from environment
    const API_HOST = 'open-ai21.p.rapidapi.com'; // API Host

    const body = JSON.parse(request.body);
    const imageBase64 = body.image;

    const buff = Buffer.from(imageBase64, 'base64');
    const image = new Blob([buff.buffer], { type: 'image/png' });

    const data = new FormData();
    data.append('file', image);

    const response = await fetch(`https://open-ai21.p.rapidapi.com/imagecaptioning`, {
      method: 'POST',
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST
      },
      body: data
    });

    return new Response(response.text(), { status: 200 })

    const result = await response.json();

  } catch (error) {
    // Return an error response
    return new Response(error.toString(), {
      headers: { 'content-type': 'text/plain' },
      status: 500
    });
  }
};

export const config = { path: "/test" };
