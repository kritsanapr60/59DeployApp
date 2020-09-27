import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {
  constructor() { }
  UserList = [''];
  ReservedWords = ['break', 'as', 'any', 'case', 'implements', 'boolean', 'catch', 'interface', 'constructor', 'class', 'let', 'declare', 'const', 'package', 'get', 'continue', 'private', 'module', 'debugger', 'protected', 'require', 'default', 'public', 'number', 'delete', 'static', 'set', 'do', 'yield', 'string', 'else', 'symbol', 'enum', 'type', 'export', 'from', 'extends', 'of', 'false', 'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'new', 'null', 'return', 'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'var', 'void', 'while', 'with'];


  /**
   * เช็คว่า username ที่เข้ามานั้นมีคำที่ซ้ำกันหรือคำ  Reserved Words หรือไม่
   *
   * @param {AbstractControl} userControl รับค่าที่ได้มาจาก username ที่อยู่ใน Form
   * @returns ค่า true เมื่อ username มีคำที่อยู่ใน array ถ้าไม่มีจะ return ค่า null
   * @memberof CustomValidationService
   */

  userNameValidator(userControl: AbstractControl) {
    if (this.validateUserName(userControl.value) || this.validateReservedWords(userControl.value)) {
      return { userNameNotAvailable: true };
    } else {
      return (null);
    }
  }

  /**
   * เช็คว่า userName นั้นซ้ำกันหรือไม่
   * โดยจะเช็คใน UserList ที่เป็น array
   * @param {string} userName รับค่า username ที่เป็น String
   * @returns
   * @memberof CustomValidationService
   */
  validateUserName(userName: string) {
    return (this.UserList.indexOf(userName) > -1);
  }

  /**
   *  เช็คว่า userName นั้นมีคำที่เป็น Reserved Words หรือไม่
   *  โดยจะเช็คใน ReservedWords ที่เก็บคำ ReservedWords ไว้เป็น array
   * @param {string} userName รับค่า username ที่เป็น String
   * @returns
   * @memberof CustomValidationService
   */

  validateReservedWords(userName: string) {
    return (this.ReservedWords.indexOf(userName) > -1);
  }

}
