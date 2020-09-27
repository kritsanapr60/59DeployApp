import { Value } from "./Value";
/**
 *
 * เก็บค่ารายละเอียดใน field
 * @export
 * @class field
 */
export class Field {
  /**
   *
   * field's id
   * @type {*}
   * @memberof field
   */
  _id?: string;
  /**
   *
   * name
   * @type {*}
   * @memberof field
   */
  name?: string;
  /**
   *
   *
   * @type {*}
   * @memberof field
   */
  type?: string;
  /**
   *
   *
   * @type {*}
   * @memberof field
   */
  icon?: string;
  /**
   *
   *
   * @type {*}
   * @memberof field
   */
  toggle?: boolean;
  /**
   *
   *
   * @type {*}
   * @memberof field
   */
  required?: boolean;
  /**
   *
   *
   * @type {*}
   * @memberof field
   */
  regex?: string;
  /**
   *
   *
   * @type {*}
   * @memberof field
   */
  errorText?: string;
  /**
   *
   *
   * @type {*}
   * @memberof field
   */
  label?: string;
  /**
   *
   *
   * @type {*}
   * @memberof field
   */
  description?: string;
  /**
   *
   *
   * @type {*}
   * @memberof field
   */
  placeholder?: string;
  /**
   *
   *
   * @type {*}
   * @memberof field
   */
  className?: string;
  /**
   *
   *
   * @type {*}
   * @memberof field
   */
  subtype?: string;
  /**
   *
   *
   * @type {*}
   * @memberof field
   */
  handle?: boolean;
  /**
   *
   *
   * @type {number}
   * @memberof field
   */
  min?: number;
  /**
   *
   *
   * @type {number}
   * @memberof field
   */
  max?: number;
  /**
   *
   *
   * @type {*}
   * @memberof field
   */
  inline?: boolean;
  /**
   *
   *
   * @type {*}
   * @memberof field
   */
  value?: any;
  /**
   *
   *
   * @type {Array<value>}
   * @memberof field
   */
  values?: Array<Value>;


  /**
   * ข้อมูลใน editor
   *
   * @type {string}
   * @memberof field
   */
  data?: string;

  /**
   * nested drag drop
   *
   * @type {Array<object>}
   * @memberof field
   */
  children?: Array<object>;
  readOnly?: boolean;
  ref?: number;
}
