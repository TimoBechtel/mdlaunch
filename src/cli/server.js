import http from 'http';
import sirv from 'sirv';

export const serve = async (port, dir) => {
  return new Promise((resolve, reject) => {
    http.createServer(sirv(dir, { dev: true })).listen(port, (err) => {
      if (err) reject(err);
      console.log(`Started server on port: ${port}`);
      resolve();
    });
  });
};
