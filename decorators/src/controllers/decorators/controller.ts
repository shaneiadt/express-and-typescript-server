import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler, NextFunction, Request, Response } from 'express';

function bodyValidators(keys: string[]): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) return res.status(422).send('Invalid request');

    for (let key of keys) {
      if (!req.body[key]) return res.status(422).send(`Missing property ${key}`);
    }

    next();
    return;
  };
}

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler: RequestHandler = target.prototype[key];
      const path: string = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
      const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
      const middlewares: RequestHandler[] = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];
      const requestProps: string[] = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || [];

      if (path) {
        router[method](`${routePrefix}${path}`, ...middlewares, bodyValidators(requestProps), routeHandler);
      }
    }
  }
}