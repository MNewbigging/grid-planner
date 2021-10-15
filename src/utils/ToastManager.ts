import { Intent, Position, Toaster } from '@blueprintjs/core';

class ToastManager {
  private toaster = Toaster.create({
    position: Position.TOP,
  });

  public okToast(message: string) {
    this.toaster.show({ message, intent: Intent.PRIMARY });
  }
}

export const toastManager = new ToastManager();
