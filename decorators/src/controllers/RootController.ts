import { Request, Response } from 'express';
import { get, controller } from './decorators';

@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`
        <div>
          <div>You're logged in!</div>
          <a href="/auth/logout">Logout</a>
        </div>
      `);
    } else {
      res.send(`
        <div>
        <div>You're <strong>NOT</strong> logged in!</div>
          <a href="/auth/login">Login</a>
        </div>
        `);
    }
  }
}