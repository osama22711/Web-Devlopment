export interface authData {
  id: any;
  name: string;
  isLoading: boolean;
  isTeacher: boolean;
  users?: Array<authData>;
}