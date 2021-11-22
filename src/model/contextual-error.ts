import fastSafeStringify from 'fast-safe-stringify';

export class ContextualError {
  errors: ContextualErrorItem[] = [];

  addError(...errors: ContextualErrorItem[]) {
    this.errors.push(...errors);
  }
}

export class ContextualErrorItem extends Error {
  message: string | any = null;
  code: string | number = '';
  data: any = null;

  parseError(err: any) {
    this.data = err;

    this.parseErrorCode(err);
    this.parseErrorMesssage(err);
  }

  parseErrorCode(err: any) {
    if (err.code) {
      this.code = err.code;
    }
  }

  parseErrorMesssage(err: any) {
    if (err.message) {
      this.message = err.message;
    } else {
      this.message = fastSafeStringify(err);
    }
  }
}
