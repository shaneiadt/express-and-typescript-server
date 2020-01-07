import { Router, Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('Not permitted');
}

const router = Router();

router.get('/', (req: RequestWithBody, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <div>You're logged in!</div>
        <a href="/logout">Logout</a>
      </div>
    `);
  } else {
    res.send(`
      <div>
      <div>You're <strong>NOT</strong> logged in!</div>
        <a href="/login">Login</a>
      </div>
      `);
  }
});

router.get('/logout', (req: RequestWithBody, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});

router.get('/protected', requireAuth, (req: RequestWithBody, res: Response) => {
  res.send('Welcome to protected route, logged in user.');
});

export { router };