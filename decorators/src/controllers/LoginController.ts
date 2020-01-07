import { Request, Response, NextFunction } from 'express';
import { get, post, controller, bodyValidator, use } from './decorators';

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('Not permitted');
}

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

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send('Welcome to protected route, logged in user.');
  }
}