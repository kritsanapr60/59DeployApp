/**
 * Interface for classes that use User data
 *
 * @interface
 * @property {string} User.uid - user id
 * @property {string} User.email - user email
 * @property {string} User.photoURL - link of user's photo
 * @property {string} User.displayName - display name
 * @property {string} User.myCustomData - etc. data
 */
export interface User {
  /** User.uid - user id */
  uid: string;
  /**  User.email - user email */
  email: string;
  /** link of user's photo */
  photoURL?: string;
  /** display name */
  displayName?: string;
  /** etc. data */
  myCustomData?: string;
}
