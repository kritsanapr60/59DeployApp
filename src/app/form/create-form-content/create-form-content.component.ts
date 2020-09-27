import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';

interface MataItem {
  content: string;
  value: string;
  attribute: string;
}

interface Images {
  name: string;
  url: string;
  AltText: string;
  items: Array<MataItem>;
  Title: string;
  version: number;
}

@Component({
  selector: 'app-create-form-content',
  templateUrl: './create-form-content.component.html',
  styleUrls: ['./create-form-content.component.less'],
})
export class CreateFormContentComponent implements OnInit {
  /**
   * ข้อมูล option
   *
   * @type {string[]}
   * @memberof CreateFormContentComponent
   */

  name: string[] = [
    'application-name',
    'author',
    'description',
    'generator',
    'keywords',
    'viewport',
  ];
  httpEquiv: string[] = [
    'content-security-policy',
    'content-type',
    'default-style',
    'refresh',
  ];
  property: string[] = [
    'og:url',
    'og:title',
    'og:description',
    'fb:app_id',
    'og:type',
    'og:video',
    'og:video:url',
    'og:video:secure_url',
    'og:video:type',
    'og:video:width',
    'og:video:height',
    'og:image',
    'og:image:url',
    'og:image:secure_url',
    'og:image:type',
    'og:image:width',
    'og:image:height',
    'og:audio',
    'og:audio:secure_url',
    'og:audio:type',
    'og:locale',
    'og:locale:alternate',
    'og:site_name',
    'og:determiner',
  ];

  urlImage: string;
  option: string;
  formId: string;
  image: any;
  path: string;
  downloadURL: string;
  uploadPercentage$: Observable<number>;
  // profileForm = this.fb.group({});
  loadingForm = false;
  version = 1;
  DataFlexMessage: Images;

  /**
   * เก็บข้อมูล input
   *
   * @type {Observable<string[]>[]}
   * @memberof CreateFormContentComponent
   */
  filteredOptions: Observable<string[]>[] = [];

  /**
   * เก็บ form group
   *
   * @type {FormGroup}
   * @memberof CreateFormContentComponent
   */
  myForm: FormGroup;

  /**
   * Creates an instance of CreateFormContentComponent.
   * @param {FormBuilder} fb
   * @memberof CreateFormContentComponent
   */
  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.formId = this.route.snapshot.paramMap.get('docID');
  }

  /**
   * สร้าง form array
   *
   * @memberof CreateFormContentComponent
   */
  ngOnInit() {
    if (this.formId) {
      const subIMGFlex = this.afs
        .collection('ImageFlexMessage')
        .doc(this.formId)
        .valueChanges()
        .subscribe(
          (item: Images) => {
            this.DataFlexMessage = item;
            this.option = 'edit';
            this.urlImage = item.url;
            this.version = item.version;
            this.myForm = this.fb.group({
              items: this.fb.array([]),
              Image: [''],
              Title: [item.Title, [Validators.required]],
              AltText: [item.AltText, [Validators.required]],
            });
            item.items.map((i, index) => {
              console.log('index => ', index);

              // tslint:disable-next-line: triple-equals
              if (i.attribute != 'charset' && i.attribute != 'prefix') {
                this.addNewItem(i.attribute, i.value, i.content);
              } else {
                this.addAttribute(i.attribute, i.content);
              }
            });
            this.loadingForm = true;
          },
          (err) => {
            console.error(err);
          },
          () => {
            subIMGFlex.unsubscribe();
          }
        );
    } else {
      this.option = 'create';
      this.myForm = this.fb.group({
        items: this.initItems(),
        Image: [''],
        Title: ['', [Validators.required]],
        AltText: ['', [Validators.required]],
      });
      this.ManageNameControl(0, 'name');
      this.loadingForm = true;
    }
  }

  /**
   * เพิ่ม form array ครั้งแรก
   *
   * @return {*}
   * @memberof CreateFormContentComponent
   */
  initItems() {
    const formArray = this.fb.array([]);
    formArray.push(
      this.fb.group({
        attribute: 'name',
        value: ['', [Validators.required]],
        content: ['', [Validators.required]],
      })
    );
    return formArray;
  }

  addAttribute(attribute: string, content = '') {
    const controls = this.myForm.controls['items'] as FormArray;
    if (attribute === 'charset') {
      if (content === '') {
        content = 'UTF-8';
      }
      const formGroup = this.fb.group({
        attribute,
        content: [content, [Validators.required]],
      });
      controls.push(formGroup);
    } else if (attribute === 'prefix') {
      const formGroup = this.fb.group({
        attribute,
        content: [content, [Validators.required]],
      });
      controls.push(formGroup);
    }
  }

  /**
   * เพิ่ม form array
   *
   * @memberof CreateFormContentComponent
   */
  addNewItem(attribute: string, value = '', content = '') {
    const controls = this.myForm.controls['items'] as FormArray;
    if (attribute === 'property') {
      if (value === '') {
        value = 'og:';
      }
      const formGroup = this.fb.group({
        attribute,
        value: [value, [Validators.required]],
        content: [content, [Validators.required]],
      });
      controls.push(formGroup);
    } else {
      const formGroup = this.fb.group({
        attribute,
        value: [value, [Validators.required]],
        content: [content, [Validators.required]],
      });
      controls.push(formGroup);
    }
    // Build the account Auto Complete values
    this.ManageNameControl(controls.length - 1, attribute);
  }

  /**
   * เพิ่มข้อมูลลงใน array form ตัวที่ i
   *
   * @param {number} index
   * @memberof CreateFormContentComponent
   */
  ManageNameControl(index: number, attribute: string) {
    const arrayControl = this.myForm.get('items') as FormArray;
    this.filteredOptions[index] = arrayControl
      .at(index)
      .get('value')
      .valueChanges.pipe(
        startWith<string>(''),
        map((name) =>
          name ? this._filter(name, attribute) : this[attribute].slice()
        )
      );
  }

  /**
   * ตรวจข้อความ input
   *
   * @private
   * @param {string} name
   * @return {*}  {string[]}
   * @memberof CreateFormContentComponent
   */
  private _filter(name: string, attribute: string): string[] {
    const filterValue = name.toLowerCase();

    return this[attribute].filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  /**
   * แสดงข้อความ
   *
   * @param {*} [user]
   * @return {*}  {(string | undefined)}
   * @memberof CreateFormContentComponent
   */
  displayFn(user?): string | undefined {
    return user ? user : undefined;
  }

  /**
   * ลบ form array ตัวที่ index
   *
   * @param {number} i index ของ form array
   * @memberof CreateFormContentComponent
   */
  removeItem(i: number) {
    const controls = this.myForm.controls['items'] as FormArray;
    controls.removeAt(i);
    // remove from filteredOptions too.
    this.filteredOptions.splice(i, 1);
  }

  onFileUpload(images: FileList) {
    // const image = this.profileForm.get('Images').value;
    try {
      this.image = images[0];
      this.path = `FlexMessage/${images[0].name}`;
    } catch {
      console.log('notUpload');
    }
  }

  UploadStorage() {
    if (this.option === 'edit') {
      console.log(this.myForm);
      this.afs
        .collection('ImageFlexMessage')
        .doc(this.formId)
        .collection('versions')
        .doc(`${this.version}`)
        .set(this.DataFlexMessage);

      try {
        this.storage.upload(this.path, this.image);
        this.uploadPercentage$ = this.storage
          .upload(this.path, this.image)
          .percentageChanges();
        const ref = this.storage.ref(this.path);
        const task = this.storage.upload(this.path, this.image);

        task
          .snapshotChanges()
          .pipe(
            finalize(async () => {
              this.downloadURL = await ref.getDownloadURL().toPromise();
              console.log('dowloadURL ', this.downloadURL);
              this.router.navigate(['/view/viewContent']);
              ref
                .getDownloadURL()
                .toPromise()
                .then((url) => {
                  const allFile = {
                    name: this.image.name,
                    url,
                    AltText: this.myForm.get('AltText').value,
                    Title: this.myForm.get('Title').value,
                    items: this.myForm.value['items'],
                    Date: firebase.firestore.FieldValue.serverTimestamp(),
                    version: this.version + 1,
                  };
                  this.afs
                    .collection('ImageFlexMessage')
                    .doc(this.formId)
                    .set(allFile, { merge: true });
                });
            })
          )
          .subscribe();
      } catch {
        const allFile = {
          url: this.urlImage,
          AltText: this.myForm.get('AltText').value,
          Title: this.myForm.get('Title').value,
          items: this.myForm.value['items'],
          Date: firebase.firestore.FieldValue.serverTimestamp(),
          version: this.version + 1,
        };
        this.afs
          .collection('ImageFlexMessage')
          .doc(this.formId)
          .set(allFile, { merge: true })
          .then(() => {
            this.router.navigate(['/view/viewContent']);
          })
          .catch((err) => {
            console.error(err);
            this.router.navigate(['/view/viewContent']);
          });
      }
    } else if (this.option === 'create') {
      this.storage.upload(this.path, this.image);
      this.uploadPercentage$ = this.storage
        .upload(this.path, this.image)
        .percentageChanges();
      const ref = this.storage.ref(this.path);
      const task = this.storage.upload(this.path, this.image);

      task
        .snapshotChanges()
        .pipe(
          finalize(async () => {
            this.downloadURL = await ref.getDownloadURL().toPromise();
            console.log('dowloadURL ', this.downloadURL);
            this.router.navigate(['/view/viewContent']);
            ref
              .getDownloadURL()
              .toPromise()
              .then((url) => {
                const allFile = {
                  name: this.image.name,
                  url,
                  AltText: this.myForm.get('AltText').value,
                  Title: this.myForm.get('Title').value,
                  items: this.myForm.value['items'],
                  Date: firebase.firestore.FieldValue.serverTimestamp(),
                  version: this.version,
                };
                this.afs.collection('ImageFlexMessage').add(allFile);
              });
          })
        )
        .subscribe();
    }
  }
}
