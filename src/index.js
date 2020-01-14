import fs from 'fs';
import { promisify } from 'util';
import csv from 'csvtojson';
import { argv } from 'yargs';

import processAddressList from './processAddressList';

const writeFile = promisify(fs.writeFile);

const go = async (inputFile, outputFile) => {
  console.log('Running');
  const addresses = await csv().fromFile(inputFile);
  const processed = await processAddressList(addresses);
  await writeFile(outputFile, JSON.stringify(processed, null, 2));
};

const { input, output } = argv;

go(input, output)
  .then(() => {
    console.log('Finished');
  })
  .catch((err) => {
    console.error(err);
  });
