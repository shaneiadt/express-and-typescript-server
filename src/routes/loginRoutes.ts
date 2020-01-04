import { Router, Request, Response } from 'express';

const router = Router();

router.get('/login', (req: Request, res: Response) => {
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
});

router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  res.send({
    email,
    password
  });
});

export { router };