import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('GraphQL (custom context)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    const instance = app.getHttpAdapter().getInstance();
    if ('ready' in instance && typeof instance.ready === 'function') {
      await instance.ready();
    }
  });

  it('should return query result', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: `
          {
            fooFromContext {
              foo
              bar
            }
          }
          `,
      })
      .expect(200, {
        data: {
          fooFromContext: {
            foo: 'bar',
            bar: 'foo',
          },
        },
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
