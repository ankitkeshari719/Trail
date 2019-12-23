export class User {
  constructor(
    private accessToken: string,
    public bucketAccesskey: string,
    public bucketSecretkey: string,
    public country: string,
    public email: string,
    public firstName: string,
    public image: string,
    public lastName: string,
    public roleId: string
  ) {}

  get token() {
    //Check is token is exits or not
    return this.accessToken;
  }
}
