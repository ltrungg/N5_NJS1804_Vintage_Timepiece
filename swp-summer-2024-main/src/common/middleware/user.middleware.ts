// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import * as cookieParser from 'cookie-parser';

// @Injectable()
// export class UserMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     cookieParser()(req, res, () => {
//       const userId = req.cookies.userId;
//       if (userId) {
//         req['user'] = { id: userId };
//       }
//       next();
//     });
//   }
// }
