import { injectable } from 'inversify';
import { ChatCompletionMessageParam } from 'openai/resources';

import { http } from '../../config/axios';

@injectable()
export class MessageService {
  private http = http;

  public getLast5MessagesByChatId(chatId: string) {
    return this.http.get<ChatCompletionMessageParam[]>(
      `/messages/?chatId=${chatId}&limit=5&_sort=id&_order=desc`
    );
  }

  public getMessagesByChatId(chatId: string) {
    return this.http.get<ChatCompletionMessageParam[]>(
      `/messages/?chatId=${chatId}`
    );
  }

  public postMessage(chatId: string, role: string, content: string) {
    return this.http.post('/messages', {
      chatId,
      role,
      content,
    });
  }
}
