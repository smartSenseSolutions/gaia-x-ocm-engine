export interface GenericBody {
  subMethod?: {
    name?: string;
    subMethodData?: any[] | any;
  };
  data?: any[] | any;
}

export default GenericBody;
