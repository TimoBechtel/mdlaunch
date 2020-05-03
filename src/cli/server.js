import http from 'http';
import sirv from 'sirv';

export const serve = (port, dir) => {
  http.createServer(sirv(dir, { dev: true })).listen(port, (err) => {
    if (err) throw err;
    console.log(`Started server on port: ${port}`);
  });
};
