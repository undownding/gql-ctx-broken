import { Context, Field, ObjectType, Query, Resolver } from '@nestjs/graphql';

@ObjectType()
class FooBar {
  @Field()
  foo: string;
  @Field()
  bar: string;
}

@Resolver()
export class CustomContextResolver {
  @Query(() => FooBar)
  fooFromContext(@Context() ctx: Record<string, unknown>) {
    return {
      foo: ctx.foo,
      bar: ctx.bar,
    };
  }
}
