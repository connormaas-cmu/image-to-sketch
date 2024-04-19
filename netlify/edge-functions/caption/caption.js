async function setupFetch() {
  const module = await import('node-fetch');
  return module.default;
}

export default async (request) => {
  const fetch = await setupFetch();

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: headers
    });
  }

  try {

   const API_KEY = process.env.API_KEY;
   const API_HOST = 'open-ai21.p.rapidapi.com';

    const res = await request.text()
    const body = JSON.parse(res)
    const imageBase64 = body.image;

    const buff = Buffer.from(imageBase64, 'base64');
    const image = new Blob([buff.buffer], { type: 'image/png' });

    const data = new FormData();
    data.append('file', buff, {type: 'image/png'});

    const info = {
      method: 'POST',
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
      body: data
    }

    console.log(info)

    const response = await fetch('https://open-ai21.p.rapidapi.com/imagecaptioning', info)

    return new Response(response.text(), { 
      status: 200, 
      headers: headers
    })

  } catch (error) {
    return new Response(error.toString(), { 
      status: 500,
      headers: headers
    });
  }
};

export const config = { path: "/test" };
