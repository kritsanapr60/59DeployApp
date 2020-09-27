import { TreeFunctionService } from './service/tree-function.service';
import { TreeDataService } from './service/tree-data.service';
import { TreeData } from './service/tree-data.model';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { of as observableOf, BehaviorSubject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PaginationService } from 'src/app/form/pagination.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Field } from 'src/app/field';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from 'src/app/form/dialog-example/dialog-example.component';
interface Data {
  value: string;
  valueView: string;
}

interface FormImportData {
  attributes: Array<Field>;
}

@Component({
  selector: 'app-create-template-flex-message',
  templateUrl: './create-template-flex-message.component.html',
  styleUrls: ['./create-template-flex-message.component.less'],
})
export class CreateTemplateFlexMessageComponent implements OnInit {
  nestedTreeControl: NestedTreeControl<TreeData>;
  nestedDataSource: MatTreeNestedDataSource<TreeData>;
  activeNode: TreeData;
  data: BehaviorSubject<TreeData[]>;
  safeSrc: SafeResourceUrl;
  formImportDataID: string;
  modelFields: Array<Field> = [];
  selectedType: string;

  constructor(
    private dataService: TreeDataService,
    private service: TreeFunctionService,
    public page: PaginationService<Array<object>>,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private afs: AngularFirestore,
    public dialog: MatDialog,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.data = this.dataService._dataChange;
    this.formImportDataID = this.route.snapshot.paramMap.get('formID');
    this.page.init('FillOutForm', 'formID', { where: this.formImportDataID });
    const subFormImportData = this.afs
      .collection('FormImportData')
      .doc(this.formImportDataID)
      .valueChanges()
      .subscribe(
        (item: FormImportData) => {
          item.attributes.map((att) => {
            this.modelFields.push(att);
          });
        },
        (err) => {
          console.error(err);
        },
        () => {
          subFormImportData.unsubscribe();
        }
      );
    console.log('data ::', this.data);


  }

  boxForm = this.fb.group({
    type: 'box',
    layout: '',
    position: '',
    flex: '',
    spacing: '',
    margin: '',
    width: '',
    height: '',
    backgroundColor: '',
    borderWidth: '',
    borderColor: '',
    cornerRadius: '',
  });

  // Input in Buble card
  directionOption: Data[] = [
    { value: 'ltr', valueView: 'ltr' },
    { value: 'rtl', valueView: 'rtl' },
  ];

  sizeOption: Data[] = [
    { value: '', valueView: '' },
    { value: 'giga', valueView: 'giga' },
    { value: 'mega', valueView: 'mega' },
    { value: 'kilo', valueView: 'kilo' },
    { value: 'micro', valueView: 'micro' },
    { value: 'nano', valueView: 'nano' },
  ];

  // -> Action Card in -> Body -> vertical box
  typeOption: Data[] = [
    { value: '', valueView: '' },
    { value: 'postback', valueView: 'postback' },
    { value: 'uri', valueView: 'uri' },
    { value: 'message', valueView: 'message' },
    { value: 'datetimepicker', valueView: 'datetimepicker' },
  ];

  // Input selector in Body
  // -> Box Card
  layoutOptions: Data[] = [
    { value: 'column', valueView: 'vertical' },
    { value: 'row', valueView: 'horizontal' },
    { value: 'baseline box', valueView: 'baseline' }
  ];

  positionOptions: Data[] = [
    { value: '', valueView: '' },
    { value: 'relative', valueView: 'relative' },
    { value: 'absolute', valueView: 'absolute' }
  ];

  spacingOptions: Data[] = [
    { value: '', valueView: '' },
    { value: 'none', valueView: 'none' },
    { value: 'xs', valueView: 'xs' },
    { value: 'sm', valueView: 'sm' },
    { value: 'md', valueView: 'md' },
    { value: 'lg', valueView: 'lg' },
    { value: 'xl', valueView: 'xl' },
    { value: 'xxl', valueView: 'xxl' },
  ];
  marginOptions: Data[] = [
    { value: '', valueView: '' },
    { value: 'none', valueView: 'none' },
    { value: 'xs', valueView: 'xs' },
    { value: 'sm', valueView: 'sm' },
    { value: 'md', valueView: 'md' },
    { value: 'lg', valueView: 'lg' },
    { value: 'xl', valueView: 'xl' },
    { value: 'xxl', valueView: 'xxl' },
  ];

  // Input selector in Head -> Style Card
  // Input selector in Hero -> Style Card
  // Input selector in Body -> Style Card
  // ใช้ Selector Option ตัวเดียวกัน
  separatorOptions: Data[] = [
    { value: '', valueView: '' },
    { value: 'true', valueView: 'true' },
    { value: 'false', valueView: 'false' }
  ];

  wrapOptions: Data[] = [
    { value: '', valueView: '' },
    { value: 'true', valueView: 'true' },
    { value: 'false', valueView: 'false' }
  ];

  // Card Text
  weightOption: Data[] = [
    { value: '', valueView: '' },
    { value: 'regular', valueView: 'regular' },
    { value: 'bold', valueView: 'bold' },
  ];
  // Card Text
  styleOption: Data[] = [
    { value: '', valueView: '' },
    { value: 'normal', valueView: 'normal' },
    { value: 'italic', valueView: 'italic' },
  ];
  decorationOption: Data[] = [
    { value: '', valueView: '' },
    { value: 'none', valueView: 'none' },
    { value: 'underline', valueView: 'underline' },
    { value: 'line-through', valueView: 'line-through' },
  ];
  gravityOption: Data[] = [
    { value: '', valueView: '' },
    { value: 'flex-start', valueView: 'top' },
    { value: 'flex-end', valueView: 'bottom' },
    { value: 'center', valueView: 'center' },
  ];

  alignOption: Data[] = [
    { value: '', valueView: '' },
    { value: 'flex-start', valueView: 'start' },
    { value: 'flex-end', valueView: 'end' },
    { value: 'center', valueView: 'center' },
  ];
  // Button
  heightOption: Data[] = [
    { value: 'small', valueView: 'sm' },
    { value: 'medium', valueView: 'md' }
  ];
  styleButtonOption: Data[] = [
    { value: 'link', valueView: 'link' },
    { value: 'primary', valueView: 'primary ' },
    { value: 'secondary', valueView: 'secondary' }
  ];
  selected: string = '';
  optionText: any = [
    'enterText',
    'fireStore'
  ];


  ngOnInit() {
    this.nestedTreeControl = new NestedTreeControl<TreeData>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.dataService._dataChange.subscribe(
      (data) => (this.nestedDataSource.data = data)
    );
    this.selected = 'enterText';

    console.log(`Selected : ${this.selected}`);
  }
  radioChangeHandle(option) {
    this.selected = option;
    console.log('selected ' + this.selected);
  }

  private _getChildren = (node: TreeData) => observableOf(node.Children);
  hasNestedChild = (_: number, nodeData: TreeData) =>
    nodeData.Children.length > 0

  refreshTreeData() {
    const data = this.nestedDataSource.data;
    this.nestedDataSource.data = null;
    this.nestedDataSource.data = data;
  }

  addNode(node: TreeData) {
    node.Id = this.service.findNodeMaxId(this.nestedDataSource.data) + 1;
    this.nestedDataSource.data.push(node);
    this.refreshTreeData();
  }

  addChildNode(childrenNodeData) {
    childrenNodeData.node.Id =
      this.service.findNodeMaxId(this.nestedDataSource.data) + 1;
    childrenNodeData.currentNode.Children.push(childrenNodeData.node);
    this.refreshTreeData();
  }

  editNode(nodeToBeEdited) {
    const fatherElement: TreeData = this.service.findFatherNode(
      nodeToBeEdited.currentNode.Id,
      this.nestedDataSource.data
    );
    let elementPosition: number;
    nodeToBeEdited.node.Id =
      this.service.findNodeMaxId(this.nestedDataSource.data) + 1;
    if (fatherElement[0]) {
      fatherElement[0].Children[fatherElement[1]] = nodeToBeEdited.node;
    } else {
      elementPosition = this.service.findPosition(
        nodeToBeEdited.currentNode.Id,
        this.nestedDataSource.data
      );
      this.nestedDataSource.data[elementPosition] = nodeToBeEdited.node;
    }
    this.refreshTreeData();
  }

  deleteNode(nodeToBeDeleted: TreeData) {
    const deletedElement: TreeData = this.service.findFatherNode(
      nodeToBeDeleted.Id,
      this.nestedDataSource.data
    );
    let elementPosition: number;
    if (
      window.confirm(
        'Are you sure you want to delete ' + nodeToBeDeleted.Name + '?'
      )
    ) {
      if (deletedElement[0]) {
        deletedElement[0].Children.splice(deletedElement[1], 1);
      } else {
        elementPosition = this.service.findPosition(
          nodeToBeDeleted.Id,
          this.nestedDataSource.data
        );
        this.nestedDataSource.data.splice(elementPosition, 1);
      }
      this.refreshTreeData();
    }
  }

  selectNode(node) {
    console.log('nodeee', node);
    this.activeNode = node;
    console.log('dataService', this.dataService._dataChange);
  }

  safeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  openDialog(statusPushData: string) {
    this.dialog.open(DialogExampleComponent, { data: statusPushData });
  }

  saveData() {
    console.log('save data', this.data.value);
    const FlexData = this.data.value;
    
    this.afs
      .collection('FlexTemplete')
      .doc(this.formImportDataID)
      .set({
        FlexData
      })
      .then(() => {
        this.openDialog('เพิ่มข้อมูลสำเร็จ');
        this.router.navigate(['/view/showFormImportData']);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
