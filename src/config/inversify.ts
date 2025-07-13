import { Container } from 'inversify';

import { App } from '../core/app';
import { Bot } from '../core/bot';
import { Server } from '../core/server';
import { StepManager } from '../core/step-manager';
import { ChatGPTService } from '../shared/services/chatgpt-service';
import { StepService } from '../shared/services/step-service';
import { UserService } from '../shared/services/user-service';
import { MessageService } from '../shared/services/message-service';

const container = new Container();

container.bind<App>(App).toSelf();
container.bind<Bot>(Bot).toSelf().inSingletonScope();
container.bind<Server>(Server).toSelf();
container.bind<StepManager>(StepManager).toSelf();
container.bind<ChatGPTService>(ChatGPTService).toSelf();
container.bind<StepService>(StepService).toSelf();
container.bind<UserService>(UserService).toSelf();
container.bind<MessageService>(MessageService).toSelf();

export default container;
export { container };
