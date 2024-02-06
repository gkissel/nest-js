import { Either, right } from '@/core/either'
import { AnswersRepository } from '../repositories//answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

interface FetchQuestionAnswersServiceRequest {
  questionId: string
  page: number
}

type FetchQuestionAnswersServiceResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

export class FetchQuestionAnswersService {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersServiceRequest): Promise<FetchQuestionAnswersServiceResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return right({
      answers,
    })
  }
}
