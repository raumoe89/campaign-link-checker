import { readFile } from 'node:fs/promises';
import { inspectCampaignLink } from './campaign-links.mjs';

if (process.argv.length !== 3) {
  console.error('Usage: node check-links.mjs <text-file>');
  process.exitCode = 2;
} else {
  try {
    const input = await readFile(process.argv[2], 'utf8');
    const urls = input.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
    if (urls.length === 0) throw new Error('No links found.');

    for (const [index, url] of urls.entries()) {
      const { host, errors } = inspectCampaignLink(url);
      const label = host ? `Line ${index + 1} (${host})` : `Line ${index + 1}`;
      if (errors.length) {
        console.log(`${label}: ${errors.join(' ')}`);
        process.exitCode = 1;
      } else {
        console.log(`${label}: ready`);
      }
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 2;
  }
}
