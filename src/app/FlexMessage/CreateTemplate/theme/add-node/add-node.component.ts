import { TreeData, DialogData } from './../../service/tree-data.model';
import { Component, Inject, Output, EventEmitter, Input } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NodeDialogComponent } from '../node-dialog/node-dialog.component';
import { TreeDataService } from '../../service/tree-data.service';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.less'],
})
export class AddNodeComponent {
  @Input() isTop: boolean;
  @Input() currentNode: TreeData;
  @Output() addedNode = new EventEmitter();
  name: string;
  description: string;

  constructor(public dialog: MatDialog, private dataService: TreeDataService) {}

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(NodeDialogComponent, {
  //     width: '250px',
  //     data: {
  //       nodeName: this.name,
  //       nodeDescription: this.description,
  //       Component: 'Add',
  //       position: this.isTop,
  //       Cur: this.currentNode,
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       const node: TreeData = {
  //         Id: null,
  //         Name: result.nodeName,
  //         Children: [],
  //       };
  //       if (this.isTop) {
  //         this.addedNode.emit(node);
  //       } else {
  //         this.addedNode.emit({ currentNode: this.currentNode, node: node });
  //       }
  //     }
  //   });
  // }

  addNode(nameNode: string) {
    const node = this.dataService.addNode(nameNode);
    if (this.isTop) {
      this.addedNode.emit(node);
    } else {
      this.addedNode.emit({ currentNode: this.currentNode, node: node });
    }
  }
}
