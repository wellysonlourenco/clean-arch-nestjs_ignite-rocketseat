import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserPayload } from 'src/auth/jwt.strategy';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';
import { CurrentUser } from './current-user-decorator';

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
});

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;

const bodyValidationSchema = new ZodValidationPipe(createQuestionBodySchema);

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(bodyValidationSchema) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    //console.log(user.sub)

    const { title, content } = body;
    const userId = user.sub;

    const slug = this.convertToSlug(title);

    console.log(title);

    await this.prisma.question.create({
      data: {
        authorId: userId,
        title,
        content,
        slug,
      },
    });
  }

  private convertToSlug(title: string): string {
    return title
      .toLowerCase() // Converte para minúsculas
      .normalize('NFD') // Normaliza caracteres (opcional)
      .replace(/[\u0300-\u036f]/g, '') // Remove caracteres acentuados
      .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/--+/g, '-') // Remove múltiplos hífens
      .trim(); // Remove espaços extras no início e no final
  }
}
