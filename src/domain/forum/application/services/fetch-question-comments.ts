import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { Either, right } from '@/core/either'

interface FetchQuestionCommentsServiceRequest {
  questionId: string
  page: number
}

type FetchQuestionCommentsServiceResponse = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>

export class FetchQuestionCommentsService {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsServiceRequest): Promise<FetchQuestionCommentsServiceResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({
      questionComments,
    })
  }
}
