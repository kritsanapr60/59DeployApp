import { Timestamp } from '@firebase/firestore';
import { Field } from '../field';

/**
 *
 * ชุดข้อมูลของฟอร์มแบบสอบถาม
 * @export
 * @interface FormData
 */
export interface FormData {
  versions: number;
  /**
   *
   * ชื่อผู้สร้างฟอร์ม
   * @type {string}
   * @memberof FormData
   */
  nameCreator: string;
  /**
   *
   * วันที่สร้างฟอร์ม
   * @type {Timestamp}
   * @memberof FormData
   */
  createDate: Timestamp;
  /**
   *
   * ชื่อฟอร์ม
   * @type {string}
   * @memberof FormData
   */
  title: string;
  /**
   *
   * description form
   * @type {string}
   * @memberof FormData
   */
  description: string;
  /**
   *
   * attributes ของ tag ในฟอร์ม
   * @type {Array<Object>}
   * @memberof FormData
   */
  attributes: Array<Field>;
}


