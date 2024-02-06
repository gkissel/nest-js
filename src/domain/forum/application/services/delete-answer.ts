import { Either, left, right } from '@/core/either'
import { AnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError } from '../../../../core/errors/not-allowed-error'
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error'

interface DeleteAnswerServiceRequest {
  authorId: string
  answerId: string
}

type DeleteAnswerServiceResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>
export class DeleteAnswerService {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId: questionId,
    authorId,
  }: DeleteAnswerServiceRequest): Promise<DeleteAnswerServiceResponse> {
    const answer = await this.answersRepository.findById(questionId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answersRepository.delete(answer)

    return right(null)
  }
}
