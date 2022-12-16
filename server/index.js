const app = require("./app");

const init = async () => {
  try {
    const port = process.env.PORT || 5432;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};


init();
