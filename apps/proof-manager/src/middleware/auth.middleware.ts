import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import logger from '@src/utils/logger';
import { Request, Response, NextFunction } from 'express';
// import { ClientCredentials }  from 'simple-oauth2';

import * as jwt from 'jsonwebtoken';
import jwksClient = require('jwks-rsa');

// interface IOAuthConfig {
//   client: {
//     id: string,
//     secret: string
//   };
//   auth: {
//     tokenHost: string
//   }
// }

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  /* eslint-disable */
  async use(req: Request, res: Response, next: NextFunction) {
    if (this.configService.get('auth.useAuth') === 'false') {
      return next();
    }

    logger.info('Request at middleware');

    const authHeader = req.headers.authorization;
    const authToken = authHeader && authHeader?.split(' ')[1];

    if (!authToken) {
      logger.error('No access token provided.');
      res.json({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized. No Access token provided.',
        data: undefined,
      });
      return;
    }

    // ClientID     string `envconfig:"OAUTH_CLIENT_ID"`
    // ClientSecret string `envconfig:"OAUTH_CLIENT_SECRET"`
    // TokenURL     string `envconfig:"OAUTH_TOKEN_URL"`

    // const oauthConfig = {
    //   client: {
    //     id: this.configService.get('auth.clientId'),
    //     secret: this.configService.get('auth.clientSecret')
    //   },
    //   auth: {
    //     tokenHost: this.configService.get('auth.tokenUrl') || 'https://api.oauth.com'
    //   }
    // };

    // async function getAccessToken(conf: IOAuthConfig) {
    //   const client = new ClientCredentials(conf);
    //   let accessToken: any;

    //   const tokenParams = {
    //     scope: '<scope>',
    //   };

    //   try {
    //     accessToken = await client.getToken(tokenParams);
    //   } catch (error) {
    //     logger.error('Access Token error', error.message);
    //   }

    //   return accessToken;
    // }

    // let result = getAccessToken(oauthConfig);

    // if (!result) {
    //   res.json({
    //     status: HttpStatus.UNAUTHORIZED,
    //     message: 'Unauthorized. Access token error.',
    //     data: undefined,
    //   })
    //   return;
    // }

    const getKey = (
      header: jwt.JwtHeader,
      callback: jwt.SigningKeyCallback,
    ): void => {
      const jwksUri = this.configService.get('auth.tokenUrl') || '';
      const client = jwksClient({ jwksUri, timeout: 30000 });

      client
        .getSigningKey(header.kid)
        .then((key) => callback(null, key.getPublicKey()))
        .catch(callback);
    };

    function verify(token: string): Promise<any> | undefined {
      return new Promise(
        (resolve: (decoded: any) => void, reject: (error: Error) => void) => {
          const verifyCallback: jwt.VerifyCallback<jwt.JwtPayload | string> = (
            error: jwt.VerifyErrors | null,
            decoded: any,
          ): void => {
            if (error) {
              return reject(error);
            }
            return resolve(decoded);
          };

          jwt.verify(token, getKey, verifyCallback);
        },
      );
    }

    const result = await verify(authToken as string);

    if (!result) {
      logger.error('Invalid access token provided.');
      res.json({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized. Invalid Access token provided.',
        data: undefined,
      });
      return;
    }

    next();
  }
  /* eslint-enable */
}

export default {
  AuthMiddleware,
};
