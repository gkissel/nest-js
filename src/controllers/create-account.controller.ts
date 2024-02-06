import {
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { hash } from 'bcryptjs'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { PrismaService } from '@/prisma/prisma.service'
import { z } from 'zod'

const createAccountSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

type CreateAccountInput = z.infer<typeof createAccountSchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prismaService: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountSchema))
  async handle(@Body() body: CreateAccountInput) {
    const { name, email, password } = body

    const userWithSameEmail = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException('User with same e-mail already exists')
    }

    const passwordHash = await hash(password, 8)
    await this.prismaService.user.create({
      data: {
        email,
        name,
        password: passwordHash,
      },
    })
  }
}
