import { ContextualError } from './contextual-error';

export class BaseResponseVm<TData = any | []> extends ContextualError {
  success: boolean = true;
  data: TData | any;
  message: string | null;
}
