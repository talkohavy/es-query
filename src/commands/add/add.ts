import os from 'os';
import { COLORS } from '../../constants/colors.js';
import { getAllIndexesNames } from '../../utils/getAllIndexesNames';
import { inquireElasticQuery } from '../../utils/inquires/inquireElasticQuery';
import { inquireIndexName } from '../../utils/inquires/inquireIndexName';
import { validateAndTransformQuery } from '../../utils/validateAndTransformQuery.js';
import { executeAddQuery } from './helpers/executeAddQuery.js';

// If you're gonna use emojis, use one of these:
// 🎩👑🌺⭐️✨❄️🥗🏆🎗️🥇🚀💎💊🔑🎁🎀✏️🔍🔓🛑❌✅💯❌🟢🟡🟠🔴🔵

export async function add() {
  try {
    const indexNamesArr = await getAllIndexesNames();

    const selectedIndex = await inquireIndexName(indexNamesArr);

    const elasticQueryStr = await inquireElasticQuery();

    if (!elasticQueryStr) return;

    const elasticQuery = await validateAndTransformQuery(elasticQueryStr);

    const response = await executeAddQuery({ index: selectedIndex, query: elasticQuery });

    console.log('response is:', response);
  } catch (_error: any) {
    console.log(`${os.EOL}${COLORS.red}Bye.${COLORS.stop}${os.EOL}`);
  }
}
