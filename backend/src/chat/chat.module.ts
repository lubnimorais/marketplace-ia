import { Module } from '@nestjs/common';

import { ChatController } from './chat.controller';

import { PostgresService } from '../shared/postgres.service';

import { ChatService } from './chat.service';
import { LLMService } from '../shared/llm.service';

@Module({
  controllers: [ChatController],
  providers: [PostgresService, ChatService, LLMService],
})
export class ChatModule {}
