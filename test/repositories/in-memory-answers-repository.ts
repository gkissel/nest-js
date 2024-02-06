import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public registries: Answer[] = []

  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async findById(id: string) {
    const answer = this.registries.find(
      (registry) => registry.id.toString() === id,
    )

    if (!answer) {
      return null
    }

    return answer
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.registries
      .filter((registry) => registry.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async create(answer: Answer) {
    this.registries.push(answer)

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async save(answer: Answer) {
    const itemIndex = this.registries.findIndex(
      (registry) => registry.id === answer.id,
    )

    this.registries[itemIndex] = answer

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async delete(answer: Answer) {
    const itemIndex = this.registries.findIndex(
      (registry) => registry.id === answer.id,
    )

    this.registries.splice(itemIndex, 1)

    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString())
  }
}
