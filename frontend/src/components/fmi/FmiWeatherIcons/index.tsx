/*
 Weather symbols are from https://github.com/fmidev/opendata-resources

 Weather symbol meanings:

 https://ilmatieteenlaitos.fi/latauspalvelun-pikaohje

   1 selkeää
   2 puolipilvistä
  21 heikkoja sadekuuroja
  22 sadekuuroja
  23 voimakkaita sadekuuroja
   3 pilvistä
  31 heikkoa vesisadetta
  32 vesisadetta
  33 voimakasta vesisadetta
  41 heikkoja lumikuuroja
  42 lumikuuroja
  43 voimakkaita lumikuuroja
  51 heikkoa lumisadetta
  52 lumisadetta
  53 voimakasta lumisadetta
  61 ukkoskuuroja
  62 voimakkaita ukkoskuuroja
  63 ukkosta
  64 voimakasta ukkosta
  71 heikkoja räntäkuuroja
  72 räntäkuuroja
  73 voimakkaita räntäkuuroja
  81 heikkoa räntäsadetta
  82 räntäsadetta
  83 voimakasta räntäsadetta
  91 utua
  92 sumua
*/

import React from 'react';
import S1 from './symbols/1.svg';
import S2 from './symbols/2.svg';
import S21 from './symbols/21.svg';
import S22 from './symbols/22.svg';
import S23 from './symbols/23.svg';
import S3 from './symbols/3.svg';
import S31 from './symbols/31.svg';
import S32 from './symbols/32.svg';
import S33 from './symbols/33.svg';
import S41 from './symbols/41.svg';
import S42 from './symbols/42.svg';
import S43 from './symbols/43.svg';
import S51 from './symbols/51.svg';
import S52 from './symbols/52.svg';
import S53 from './symbols/53.svg';
import S61 from './symbols/61.svg';
import S62 from './symbols/62.svg';
import S63 from './symbols/63.svg';
import S64 from './symbols/64.svg';
import S71 from './symbols/71.svg';
import S72 from './symbols/72.svg';
import S73 from './symbols/73.svg';
import S81 from './symbols/81.svg';
import S82 from './symbols/82.svg';
import S83 from './symbols/83.svg';
import S91 from './symbols/91.svg';
import S92 from './symbols/92.svg';

const symbolsByKey: { [key: string]: string } = {
   '1': S1,   '2': S2,
  '21': S21, '22': S22, '23': S23,
   '3': S3,  '31': S31, '32': S32, '33': S33,
  '41': S41, '42': S42, '43': S43,
  '51': S51, '52': S52, '53': S53,
  '61': S61, '62': S62, '63': S63, '64': S64,
  '71': S71, '72': S72, '73': S73,
  '81': S81, '82': S82, '83': S83,
  '91': S91, '92': S92
};

function createWeatherIcon(symbol: string, alt: string) {
  return () => <img src={symbol} alt={alt} />;
}

const weatherIconsByKey = Object.keys(symbolsByKey)
  .reduce((acc: any, key: string) => {
    acc[key] = createWeatherIcon(symbolsByKey[key], key);
    return acc;
  },
  {}
);

export default weatherIconsByKey;
