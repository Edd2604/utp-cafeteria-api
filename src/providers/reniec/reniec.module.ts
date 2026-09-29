import { Global, Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'

import { ReniecService } from './reniec.service'

@Global()
@Module({
  imports: [HttpModule],
  providers: [ReniecService],
  exports: [ReniecService],
})
export class ReniecModule {}
