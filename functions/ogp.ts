import * as fs from 'fs';
import * as path from 'path';
import { builder, Handler } from '@netlify/functions';

import sharp from 'sharp';

// eslint-disable-next-line require-await
const ogpHandler: Handler = async (e) => {
  const param = e.rawQuery;

  const svg = fs.readFileSync(path.resolve(__dirname, '../assets/img/map-mobile.svg'));

  const svgWk = svg.toString('utf-8');

  let svgString = '';
  for (let s of svgWk.split(/\r\n|\n/)) {
    // if (s.includes('geolonia-svg-map')) {
    //   s = s.replace(
    //     '>',
    //     ' style="background-image: linear-gradient(135deg, #97ABFF 10%, #123597 100%)">'
    //   );
    // }

    if (s.includes('data-code')) {
      s = s.replace(/fill="(.*?)"/, 'fill="#f8bbd0"');
    }
    svgString += s;
  }

  const image = await sharp(Buffer.from(svgString))
    .flatten({ background: '#fefefe' })
    .png()
    .resize({
      width: 1200,
      height: 630,
      // fit: 'fill',
      fit: 'contain',
      background: '#fefefe',
    })
    .toBuffer();

  console.log('ret image');

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept-Ranges': 'bytes',
      'Content-Type': 'image/png',
      'Content-Length': image?.length,
    },
    body: image?.toString('base64'),
    isBase64Encoded: true,
  };
};

const handler = builder(ogpHandler);
export { handler };
