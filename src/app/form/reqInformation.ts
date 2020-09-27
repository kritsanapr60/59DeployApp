import { Timestamp } from '@firebase/firestore';

export interface ReqInformation {
  uid: string;
  status: string;
  time: Timestamp;
  timeAdmin?: Timestamp;
  downloadUrl?: string;
  path?: string;

}
