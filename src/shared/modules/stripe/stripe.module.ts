import { Global, Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { SharedQueryModule } from 'src/shared/modules/shared-query/shared-query.module';

@Global()
@Module({
  imports: [SharedQueryModule],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
