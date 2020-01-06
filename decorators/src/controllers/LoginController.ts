import { Request, Response } from 'express';
import { get, controller } from './decorators';

@controller('/auth')
class LoginController {
  @get('/login')
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