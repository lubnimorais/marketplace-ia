import { Module } from '@nestjs/common';

import { ChatController } from './chat.controller';

import { PostgresService } from '../shared/postgres.service';

import { ChatService } from './chat.service';
import { LLMModule } from '../shared/llm/llm.module';

@Module({
  imports: [LLMModule],
  controllers: [ChatController],
  providers: [PostgresService, ChatService],
})
export class ChatModule {}
