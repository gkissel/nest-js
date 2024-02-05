import { Body, ConflictException, Controller, Post } from '@nestjs/common'
import { hash } from 'bcryptjs'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prismaService: PrismaService) {}

  @Post()
  async handle(
    @Body() body: { name: string; email: string; password: string },
  ) {
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
