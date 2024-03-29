import { OnAnswerCreated } from '@/domain/notification/application/subscribers/on-answer-created'
import { OnQuestionBestAnswerChosen } from '@/domain/notification/application/subscribers/on-question-best-answer-chosen'

import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { SendNotificationService } from '@/domain/notification/application/services/send-notification'

@Module({
  imports: [DatabaseModule],
  providers: [
    OnAnswerCreated,
    OnQuestionBestAnswerChosen,
    SendNotificationService,
  ],
})
export class EventsModule {}
