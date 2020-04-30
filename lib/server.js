import polka from 'polka';
import sirv from 'sirv';

export const serve = (port, dir) => {
  polka()
    .use(sirv(dir))
    .listen(port, (err) => {
      if (err) throw err;
      console.log(`Started server on port: ${port}`);
    });
};
