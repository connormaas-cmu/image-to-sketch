import * as base64 from "https://deno.land/std@0.183.0/encoding/base64.ts";

export default async (request) => {
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

   const API_KEY = Deno.env.get("API_KEY");
   const API_HOST = 'open-ai21.p.rapidapi.com';

    const res = await request.text()
    const body = JSON.parse(res)
    const imageBase64Prefix = body.image;
    const imageBase64 = imageBase64Prefix.split(',')[1];

    const base64Decoded = base64.decode(imageBase64) ;
    const textDecoder = new TextDecoder();
    const image = textDecoder.decode(base64Decoded)

    const data = new FormData();
    data.append('file', image, { filename: "image.png", type: 'image/png' });

    const info = {
      method: 'POST',
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: data
    }

    const response = await fetch('https://open-ai21.p.rapidapi.com/imagecaptioning', info)

    const r = await response.text()
    return new Response(r, { 
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
