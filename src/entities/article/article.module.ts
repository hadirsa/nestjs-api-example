import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { Comment } from './comment.entity';
import { UserEntity } from '../../core/user/user.entity';
import { ArticleService } from './article.service';
import { AuthMiddleware } from '../../core/auth/auth.middleware';
import { UserModule } from '../../core/user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([ArticleEntity, Comment, UserEntity]), UserModule],
    providers: [ArticleService],
    controllers: [
        ArticleController
    ]
})
export class ArticleModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                {path: 'articles/feed', method: RequestMethod.GET},
                {path: 'articles', method: RequestMethod.POST},
                {path: 'articles/:slug', method: RequestMethod.DELETE},
                {path: 'articles/:slug', method: RequestMethod.PUT},
                {path: 'articles/:slug/comments', method: RequestMethod.POST},
                {path: 'articles/:slug/comments/:id', method: RequestMethod.DELETE},
                {path: 'articles/:slug/favorite', method: RequestMethod.POST},
                {path: 'articles/:slug/favorite', method: RequestMethod.DELETE});
    }
}
