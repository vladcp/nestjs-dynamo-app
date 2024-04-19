import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'CI/CD pipelines can be tricky but rewarding. We have now added semantic versioning! \n Hopefully this displays in the new deployment :))';
  }
}
