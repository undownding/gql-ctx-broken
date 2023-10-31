import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CustomContextResolver } from './custom-context.resolver';
import { AnotherModule } from './another/another.module';
import { AnotherService } from './another/another.service';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [AnotherModule],
      inject: [AnotherService],
      useFactory: (service: AnotherService) => ({
        autoSchemaFile: true,
        context: () => ({
          foo: 'bar',
          bar: service.bar,
        }),
      }),
    }),
    AnotherModule,
  ],
  providers: [CustomContextResolver],
})
export class AppModule {}
