import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response } from 'express';

import * as bodyParser from 'body-parser';

@Injectable()
export class JsonBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => any) {
    bodyParser.json()(req, res, next);
  }
}
