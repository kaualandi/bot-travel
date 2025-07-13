import { injectable } from 'inversify';
import { ChatCompletionMessageParam } from 'openai/resources';

import { http } from '../../config/axios';

@injectable()
export class MessageService {
  private http = http;

  getMessagesByChatId(chatId: string) {
    return this.http.get<ChatCompletionMessageParam[]>(
      `/messages/?chatId=${chatId}`
    );
  }

  postMessage(chatId: string, role: string, content: string) {
    return this.http.post('/messages', {
      chatId,
      role,
      content,
    });
  }
}
