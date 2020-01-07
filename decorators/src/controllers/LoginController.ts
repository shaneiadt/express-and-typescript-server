import { Request, Response } from 'express';
import { get, post, controller, bodyValidator } from './decorators';

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

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (email === 'test@test.com' && password === 'password') {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.send(`Invalid email or password`);
    }

  }
}