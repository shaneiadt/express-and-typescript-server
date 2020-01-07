import { Request, Response, NextFunction } from 'express';
import { get, controller, use } from './decorators';

function logger(req: Request, res: Response, next: NextFunction) {
  console.log('TEST MIDDLEWARE');
  next();
}

@controller('/auth')
class LoginController {
  @get('/login')
  @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
      <div>
        <form method="post">
          <div>
            <label for="email">Email</label>
            <input name="email" type="text" />
            </div>
            <div>
            <label for="password">Password</label>
            <input name="password" type="password" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    `);
  }
}