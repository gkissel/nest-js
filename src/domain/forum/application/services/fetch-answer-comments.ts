import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { Either, right } from '@/core/either'

interface FetchAnswerCommentsServiceRequest {
  answerId: string
  page: number
}

type FetchAnswerCommentsServiceResponse = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>

export class FetchAnswerCommentsService {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsServiceRequest): Promise<FetchAnswerCommentsServiceResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      })

    return right({
      answerComments,
    })
  }
}
