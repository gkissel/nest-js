import { Controller, Get, Query, UseGuards } from '@nestjs/common'

import { z } from 'zod'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { FetchRecentQuestionsService } from '@/domain/forum/application/services/fetch-recent-questions'
import { QuestionPresenter } from '../presenters/question-presenters'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private fetchRecentQuestions: FetchRecentQuestionsService) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchRecentQuestions.execute({
      page,
    })

    if (result.isLeft()) {
      throw new Error()
    }

    const questions = result.value.questions

    return { questions: questions.map(QuestionPresenter.toHTTP) }
  }
}
