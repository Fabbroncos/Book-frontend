export class User {
  private _username: string;
  constructor(
    public id: number,
    public role: string,
    public email: string,
    // public password: string,
    public userInfos : {
      first_name: string,
      last_name: string,
    },
    public libraryInfos: {
      name: string,
      description: string,
      piva: string
    },
    public comune_id: number,
    public zipCode: number,
    public streetAddress1: string,
    public streetAddress2: string,
    private _token: string,
    private _tokenExpirationDate: Date,

    private address?: {city: string, province: string}
    ) {
      switch (this.role) {
        case "LIBRERIA":
          this.username = this.libraryInfos.name;
          break;
        case "ACQUIRENTE":
          this.username = this.userInfos.first_name;
          break;
      }
      
    }
    
  public set username(value: string) {
    this._username = value;
  }
  
  public get username(): string {
    return this._username;
  }
  
  
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}