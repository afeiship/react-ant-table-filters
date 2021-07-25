export interface Options {
  icon: string;
  onSubmit: (event: any) => void;
  onChange?: (event: any) => void;
  ctrlProps?: any;
  formProps?: any;
}

export interface GroupOptions extends Options {
  items?: any[];
}
