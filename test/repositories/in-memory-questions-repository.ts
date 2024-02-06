import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public registries: Question[] = []

  constructor(
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async findById(id: string) {
    const question = this.registries.find(
      (registry) => registry.id.toString() === id,
    )

    if (!question) {
      return null
    }

    return question
  }

  async findBySlug(slug: string) {
    const question = this.registries.find(
      (registry) => registry.slug.value === slug,
    )

    if (!question) {
      return null
    }

    return question
  }

  async findManyRecent(params: PaginationParams) {
    const questions = this.registries
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((params.page - 1) * 20, params.page * 20)

    return questions
  }

  async save(question: Question) {
    const itemIndex = this.registries.findIndex(
      (registry) => registry.id === question.id,
    )

    this.registries[itemIndex] = question

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async create(question: Question) {
    this.registries.push(question)

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async delete(question: Question) {
    const itemIndex = this.registries.findIndex(
      (registry) => registry.id === question.id,
    )

    this.registries.splice(itemIndex, 1)

    this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString(),
    )
  }
}
