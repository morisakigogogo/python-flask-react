declare interface UserProps {
  form: any;
  history: {
    push: (url: string) => void;
  };
}
