import ip from 'ip';
import chalk from 'chalk';
import express from 'express';

/* @Constants */
import { IS_DEVELOPMENT } from 'config';

/* @Builders */
import development from './environments/development';

const app = express();
const PORT = process.env.PORT || 3030;

development(app);

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  }

  if (IS_DEVELOPMENT) {
    console.log(`You can view ${chalk.cyan.bold(process.env.npm_package_name)} in the browser.`);
    console.log(`View with localhost 🏡: ${chalk.yellow.bold(`http://localhost:${PORT}`)}\n`);
    console.log(`Your local address 📲: ${chalk.yellow.bold(`http://${ip.address()}:${PORT}`)}\n`);
  }
});
