import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '(please work) Hello CI/CD pipelines! We have now added semantic versioning! \n Hopefully this displays in the new deployment :))';
  }
}
