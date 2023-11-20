export default interface ResponseType {
  statusCode: number;
  message: string;
  data?: any;
  error?: any;
}
