import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  toastRef:any;
  constructor(private toastr: ToastrService) {
   }
  public showSucessNotification(title: string, description: string) {
      return this.toastr.success(description);
  }
  public showErrorNotification(title: string, description: string) {
      return this.toastr.error(description);
  }
  public showWarningNotification(title: string, description: string) {
      return this.toastr.warning(description);
  }
  public showInfoNotification(title: string, description: string) {
      return this.toastr.info(description);
  }

//   public showOTPNotification(title: any, description: any) {
//       this.toastRef = this.toastr.error(description, null, {
//           disableTimeOut: true,
//           closeButton: true
//       });
//       return this.toastr.error(description, null, {
//           disableTimeOut: true,
//           closeButton: true
//       });
//   }
  public hideOTPNotification(description: any) {
      return this.toastr.clear(this.toastRef.ToastId);
  }
}
