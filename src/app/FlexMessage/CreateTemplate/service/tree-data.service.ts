import { TreeData } from './tree-data.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TreeDataService {
  // event.data.name = event.data.type + '-' + new Date().getTime();

  _dataChange = new BehaviorSubject<TreeData[]>([
    {
      Id: this.createIdTag(),
      Name: 'carousel',
      Type: 'carousel',
      Value: 'carousel',
      Children: [
        {
          Id: this.createIdTag(),
          Name: 'bubble',
          Type: 'bubble',
          Value: 'bubble',
          Children: [
            {
              Id: this.createIdTag(),
              Name: 'header',
              Type: 'header',
              Value: 'header',
              Children: [],
            },
            {
              Id: this.createIdTag(),
              Name: 'hero',
              Type: 'hero',
              Value: 'hero',
              Children: [],
            },
            {
              Id: this.createIdTag(),
              Name: 'body',
              Type: 'body',
              Value: 'body',
              Children: [
                {
                  Id: this.createIdTag(),
                  Name: 'vertical box',
                  Type: 'box',
                  Value: 'vertical box',
                  Children: [
                    {
                      Id: this.createIdTag(),
                      Name: 'text',
                      Type: 'text',
                      Value: 'Hello, world',
                      Children: [],
                    },
                  ],
                },
              ],
            },
            {
              Id: this.createIdTag(),
              Name: 'footer',
              Type: 'footer',
              Value: 'footer',
              Children: [],
            },
          ],
        },
      ],
    },
  ]);

  createIdTag() {
    return Math.floor(Math.random() * 100) + 1;
  }

  addNode(NameNode) {
    console.log('addNode');
    // return new Object(this.nodeData[NameNode]);
    switch (NameNode) {
      case 'carousel':
        return new Object({
          Id: this.createIdTag(),
          Name: 'carousel',
          Type: 'carousel',
          Value: 'carousel',
          Children: [
            {
              Id: this.createIdTag(),
              Name: 'bubble',
              Type: 'bubble',
              Value: 'bubble',
              Children: [
                {
                  Id: this.createIdTag(),
                  Name: 'header',
                  Type: 'header',
                  Value: 'header',
                  Children: [],
                },
                {
                  Id: this.createIdTag(),
                  Name: 'hero',
                  Type: 'hero',
                  Value: 'hero',
                  Children: [],
                },
                {
                  Id: this.createIdTag(),
                  Name: 'body',
                  Type: 'body',
                  Value: 'body',
                  Children: [
                    {
                      Id: this.createIdTag(),
                      Name: 'vertical box',
                      Type: 'box',
                      Value: 'vertical box',
                      Children: [
                        {
                          Id: this.createIdTag(),
                          Name: 'text',
                          Type: 'text',
                          Value: 'Hello, world',
                          Children: [],
                        },
                      ],
                    },
                  ],
                },
                {
                  Id: this.createIdTag(),
                  Name: 'footer',
                  Type: 'footer',
                  Value: 'footer',
                  Children: [],
                },
              ],
            },
          ],
        });
      case 'bubble':
        return new Object({
          Id: this.createIdTag(),
          Name: 'bubble',
          Type: 'bubble',
          Value: 'bubble',
          Children: [
            {
              Id: this.createIdTag(),
              Name: 'header',
              Type: 'header',
              Value: 'header',
              Children: [],
            },
            {
              Id: this.createIdTag(),
              Name: 'hero',
              Type: 'hero',
              Value: 'hero',
              Children: [],
            },
            {
              Id: this.createIdTag(),
              Name: 'body',
              Type: 'body',
              Value: 'body',
              Children: [
                {
                  Id: this.createIdTag(),
                  Name: 'vertical box',
                  Type: 'box',
                  Value: 'vertical box',
                  Children: [
                    {
                      Id: this.createIdTag(),
                      Name: 'text',
                      Type: 'text',
                      Value: 'Hello, world',
                      Children: [],
                    },
                  ],
                },
              ],
            },
            {
              Id: this.createIdTag(),
              Name: 'footer',
              Type: 'footer',
              Value: 'footer',
              Children: [],
            },
          ],
        });
      case 'box':
        return new Object({
          Id: this.createIdTag(),
          Name: 'vertical box',
          Type: 'box',
          Value: 'vertical box',
          Children: [
            {
              Id: this.createIdTag(),
              Name: 'text',
              Children: [],
            },
          ],
        });
      case 'text':
        return new Object({
          Id: this.createIdTag(),
          Name: 'text',
          Type: 'text',
          Value: 'Hello, world',
          Children: [],
        });
      case 'image':
        return new Object({
          Id: this.createIdTag(),
          Name: 'image',
          Type: 'image',
          Value:
            'https://img.pngio.com/png-file-svg-gallery-icon-png-transparent-png-download-for-free-gallery-icon-png-920_730.png',
          Children: [],
        });
      case 'button':
        return new Object({
          Id: this.createIdTag(),
          Name: 'button',
          Type: 'button',
          Value: 'button',
          Children: [],
        });
      case 'filler':
        return new Object({
          Id: this.createIdTag(),
          Name: 'filler',
          Type: 'filler',
          Value: 'filler',
          Children: [],
        });
      case 'spacer':
        return new Object({
          Id: this.createIdTag(),
          Name: 'spacer',
          Type: 'spacer',
          Value: 'spacer',
          Children: [],
        });
      case 'separator':
        return new Object({
          Id: this.createIdTag(),
          Name: 'separator',
          Type: 'separator',
          Value: 'separator',
          Children: [],
        });
      case 'video':
        return new Object ({
          Id: this.createIdTag(),
          Name: 'video',
          Type: 'video',
          Value: 'https://www.youtube.com/embed/Ata9cSC2WpM',
          Children: []
        });
    }
  }
}
