import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler } from 'express';

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler: RequestHandler = target.prototype[key];
      const path: string = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
      const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
      const middlewares: RequestHandler[] = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];

      if (path) {
        router[method](`${routePrefix}${path}`, ...middlewares, routeHandler);
      }
    }
  }
}