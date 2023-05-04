import helmet from 'helmet';

import Controller from './interfaces/controller.interface';
import errorMiddleware from './middlewares/error.middleware';
import infoMiddleware from './middlewares/info.middleware';
import DatabaseConnection from './repositories/database_connection';

const cors = require('cors')
const express = require('express')
var bodyParser = require('body-parser')

require('dotenv').config();

const allowedOrigins = ['https://qsfront.testenvi.nl'];

class App {
  public app;

  public db = new DatabaseConnection();

  constructor(controllers: Controller[]) {
    this.app = express();
    try {
      this.db.getPool();
      console.log('info', 'Database Connected');
    } catch (e) {
      console.error("Can't connect to db: ", e);
    }
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log('info', `Server listening on port ${port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(
      cors({
        origin: allowedOrigins,
      }),
    );
    this.app.use(bodyParser.json({ limit: '25mb' }));
    this.app.use(bodyParser.urlencoded({ extended: true, limit: '25mb' }));
    this.app.use(infoMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;