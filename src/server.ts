import App from './app';
import InfoController from './controllers/data.controller';

const app = new App(
  [
    new InfoController(),
  ],
);

app.listen();
