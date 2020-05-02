import ejs from 'ejs';

export const renderTemplate = async (file, { title, html }) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(
      file,
      {
        title,
        markdown: html,
      },
      (err, data) => {
        if (err) reject(err);
        resolve(data);
      }
    );
  });
};
