export interface TreeData {
  Id: number;
  Name: string;
  Children: TreeData[];
  Type: string;
  Value: string;
  layout?: 'column';
  position?: string;
  flex?: number;
  spacing?: string;
  margin?: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  borderWidth?: string;
  borderColor?: string;
  cornerRadius?: number;
  // Text form
  text?: string;
  size?: string;
  color?: string;
  style?: string;
  decoration?: string;
  align?: string;
  gravity?: string;
  wrap?: string;
  maxLines?: string;
  label?: string;

  // Bubble
  type?: string;
  // Action Card
  direction?: string;
  // Text
  directive?: string;

  // Style hero
  separator?: string;
  separatorColor?: string;

  // Offset Card
  offsetTop?: string;
  offsetBottom?: string;
  offsetStart?: string;
  offsetEnd?: string;
  // Padding Card
  paddingAll?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingStart?: number;
  paddingEnd?: number;
  uri?: string;
}

export interface DialogData {
  Name: string;
  Description: string;
  position: boolean;
  Cur: TreeData;
  Component: string;
}
