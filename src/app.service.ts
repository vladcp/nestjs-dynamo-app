import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! Hello CI/CD pipelines! We have now added semantic versioning!';
  }
}
