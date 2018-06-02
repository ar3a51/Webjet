import {
  Injectable, 
  NestMiddleware, 
  MiddlewareFunction
}   from '@nestjs/common';

import path from 'path';
import {join}   from 'path';
import {webjet} from '../../environment';

@Injectable()
export class MovieMiddleware implements NestMiddleware {
  
  

  constructor() {
    
  }
  resolve(args: any[]): MiddlewareFunction {
    return (req, res, next) => {
       
      let url = req.url;

      if (url.indexOf("/api") > -1) {
        // it starts with /api --> continue with execution
        next();
      } else if (url.indexOf(".") > -1) {
        // it has a file extension --> resolve the file
        res.sendFile(this.resolvePath(url));
      } else {
        res.sendFile(this.resolvePath("index.html"));
      }
    };
  }

  resolvePath(file: string): string{ 
     return `${webjet}/${file}`//join(__dirname,`../../../../dist/webjet/${file}`);
  }
}