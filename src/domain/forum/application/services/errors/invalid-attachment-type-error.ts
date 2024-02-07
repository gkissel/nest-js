import { ServiceError } from '@/core/errors/service-error'

export class InvalidAttachmentTypeError extends Error implements ServiceError {
  constructor(type: string) {
    super(`File type "${type}" is not valid.`)
  }
}
