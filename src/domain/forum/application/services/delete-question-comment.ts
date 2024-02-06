import { Either, left, right } from '@/core/either'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { NotAllowedError } from '../../../../core/errors/not-allowed-error'
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error'

interface DeleteQuestionCommentServiceRequest {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentServiceResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>
export class DeleteQuestionCommentService {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentServiceRequest): Promise<DeleteQuestionCommentServiceResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.questionCommentsRepository.delete(questionComment)

    return right(null)
  }
}
