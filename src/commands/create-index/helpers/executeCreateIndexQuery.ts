import { execSync } from 'child_process';
import { getContext } from '../../../common/utils/getContext.js';
import { logger } from '../../../common/utils/logger/logger.js';

export async function executeCreateIndexQuery(indexName: string) {
  try {
    const context = getContext();

    if (!context) throw new Error('No context found!');

    const { url, flags } = context;

    const requestString = `curl -X PUT "${url}/${indexName}?pretty" ${flags}`;

    const result = execSync(requestString).toString();

    return result;
  } catch (error) {
    console.error(error);
    logger.error(`[ES Error] Failed to create index named ${indexName}...`);

    throw error;
  }
}
