import { Intent, Position, Toaster } from '@blueprintjs/core';

class ToastManager {
  private toaster = Toaster.create({
    position: Position.TOP,
  });

  public successToast(message: string) {
    this.toaster.show({ message, intent: Intent.SUCCESS });
  }

  public toast(message: string) {
    this.toaster.show({ message });
  }
}

export const toastManager = new ToastManager();
