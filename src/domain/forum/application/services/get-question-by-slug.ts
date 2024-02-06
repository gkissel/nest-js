import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error'

interface GetQuestionBySlugServiceRequest {
  slug: string
}

type GetQuestionBySlugServiceResponse = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

export class GetQuestionBySlugService {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugServiceRequest): Promise<GetQuestionBySlugServiceResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({
      question,
    })
  }
}
