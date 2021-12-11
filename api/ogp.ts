import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import TextToSVG from 'text-to-svg';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const FONT = path.resolve(__dirname, '../assets/font/Mamelon-for-ogp.otf');

export default async (req: VercelRequest, res: VercelResponse) => {
  const { pref } = req.query;
  const codes = (pref as string)?.match(/.{2}/g);

  const svg = fs.readFileSync(path.resolve(__dirname, '../assets/img/map-mobile.svg'));
  const svgWkString = svg.toString('utf-8');

  let svgString = '';
  if (codes) {
    let dc;
    for (let s of svgWkString.split(/\r\n|\n/)) {
      dc = s.match(/data-code="[0-9]{2}/);
      // urlクエリに存在するcodeの場合、該当のdata-code行のfill styleを変更する
      if (dc !== null && codes.includes(dc[0].slice(-2))) {
        s = s.replace(/fill="(.*?)"/, 'fill="#f8bbd0"');
      }
      svgString += s;
    }
  } else {
    svgString = svgWkString;
  }

  const map = await sharp(Buffer.from(svgString))
    .resize({
      height: 600,
      fit: 'cover',
    })
    .extend({
      right: 65,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  const prefCnt = codes?.length || 0;
  const text1 = textToSVG(`${prefCnt}都道府県を踏破！`, 52);
  const text2 = textToSVG(`日本の${Math.floor((prefCnt / 47) * 100)}％`, 52);

  const base = path.resolve(__dirname, '../assets/img/base.png');
  const ogpImage = await sharp(base)
    .composite([
      {
        input: map,
        blend: 'over',
        gravity: 'east',
      },
      {
        input: Buffer.from(text1),
        blend: 'over',
        top: 200,
        left: 65,
      },
      {
        input: Buffer.from(text2),
        blend: 'over',
        top: 270,
        left: 60,
      },
    ])
    .toBuffer();

  res.statusCode = 200;
  res.setHeader('Content-Type', 'image/png');
  res.end(ogpImage);
};

const textToSVG = (text: string, fontSize: number) => {
  const svgOptions: TextToSVG.GenerationOptions = {
    x: 0,
    y: 0,
    fontSize,
    anchor: 'left top',
    attributes: { fill: '#5342F0', stroke: '#5342F0' },
  };
  return TextToSVG.loadSync(FONT).getSVG(text, svgOptions);
};
