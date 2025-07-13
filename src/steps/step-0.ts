import { Client, Message } from '@open-wa/wa-automate';
import { inject } from 'inversify';

import { Step } from '../core/decorators/step-decorator';
import { OnInit } from '../core/models/step';
import { ChatGPTService } from '../shared/services/chatgpt-service';
import { MessageService } from '../shared/services/message-service';

@Step({ selector: 0 })
export class Step0 implements OnInit {
  constructor(
    @inject(ChatGPTService) private chatGPTService: ChatGPTService,
    @inject(MessageService) private messageService: MessageService
  ) {}

  async onInit(client: Client, message: Message): Promise<number> {
    const { from, body } = message;
    const { data: messages } =
      await this.messageService.getLast5MessagesByChatId(from);
    const gptResponse = await this.chatGPTService.getAnswerToQuestion(
      body,
      messages || []
    );

    console.log('Resposta do GPT:', gptResponse);
    if (!gptResponse || gptResponse.includes('IGNORE')) {
      console.log('Ignoring message:', body);
      return 0;
    }

    await this.messageService.postMessage(from, 'user', body);
    await this.messageService.postMessage(from, 'assistant', gptResponse);
    await client.sendText(from, gptResponse);
    return 0;
  }
}
