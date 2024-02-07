import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateQuestionService } from '@/domain/forum/application/services/create-question'
import { FetchRecentQuestionsService } from '@/domain/forum/application/services/fetch-recent-questions'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { RegisterStudentService } from '@/domain/forum/application/services/register-student'
import { AuthenticateStudentService } from '@/domain/forum/application/services/authenticate-student'
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller'
import { GetQuestionBySlugService } from '@/domain/forum/application/services/get-question-by-slug'
import { EditQuestionController } from './controllers/edit-question.controller'
import { EditQuestionService } from '@/domain/forum/application/services/edit-question'
import { DeleteQuestionService } from '@/domain/forum/application/services/delete-question'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { AnswerQuestionService } from '@/domain/forum/application/services/answer-question'
import { AnswerQuestionController } from './controllers/answer-question.controller'
import { EditAnswerController } from './controllers/edit-answer.controller'
import { EditAnswerService } from '@/domain/forum/application/services/edit-answer'
import { DeleteAnswerService } from '@/domain/forum/application/services/delete-answer'
import { DeleteAnswerController } from './controllers/delete-answer.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
  ],
  providers: [
    CreateQuestionService,
    FetchRecentQuestionsService,
    RegisterStudentService,
    AuthenticateStudentService,
    GetQuestionBySlugService,
    EditQuestionService,
    DeleteQuestionService,
    AnswerQuestionService,
    EditAnswerService,
    DeleteAnswerService,
  ],
})
export class HttpModule {}
