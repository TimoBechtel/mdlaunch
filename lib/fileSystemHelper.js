/* eslint-disable compat/compat */
import fs from 'fs';
import { ncp } from 'ncp';

export const readFile = async (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

export const writeFile = async (file, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, content, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

export const copyDir = async (source, destination) => {
  return new Promise((resolve, reject) => {
    ncp(source, destination, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};
