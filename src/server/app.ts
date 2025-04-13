
import express, { Application } from 'express';
import cors from 'cors';
import routes from './routes';
import { connect } from './common/database';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.connectToDatabase();
  }

  private initializeMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    this.app.use('/api', routes);
  }

  private async connectToDatabase(): Promise<void> {
    try {
      await connect();
      console.log('Connected to database');
    } catch (error) {
      console.error('Failed to connect to database:', error);
    }
  }

  public listen(): void {
    const PORT = process.env.PORT || 5000;
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}

export default App;
