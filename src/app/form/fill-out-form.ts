import { NumberValueAccessor } from '@angular/forms';
import { Timestamp } from '@firebase/firestore';
import { Field } from '../field';

export interface FillOutForm {
  name: string;
  formShortedURL: string;
  displayNameData: string;
  nameShortURL: string;
  attributes: Array<Field>;
  version: number;
  createDate: Timestamp;
  editDate: Timestamp;
  nameCreator: string;
  charset?: string;
  UploadImage?: string;
  versionForm?: number;
  viewport?: string;
}