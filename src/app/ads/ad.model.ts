export interface Genre{
  id: number,
  name: string,
}

export interface adImage {
  id: number,
  url: string
  ad_id: number,
  main: boolean,
  created_at: string,
  updated_at: string,
  deleted_at: string,
} 

export class Ad {
  public type: string;
  public id: number;
  public title: string;
  public description: string;
  public year: number;
  public author: string;
  public quantity: number;
  public price: string;
  public isbn: string;
  public publisher: string;
  public user_id: number;
  public genre: Genre[];
  public images: adImage[];
  
  hidden: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;


  constructor(
    type: string,
    id: number,
    title: string,
    description: string,
    year: number,
    author: string,
    quantity: number,
    price: string,
    isbn: string,
    publisher: string,
    user_id: number,
    genre: Genre[],
    images: adImage[]
  ) 
  {
    if(quantity!==null){
      this.type= "SEARCH"
    } else {
      this.type= "SELL"
    }
    this.id = id
    this.title = title
    this.description = description
    this.year = year
    this.author = author
    this.quantity = quantity
    this.price = "19.99"
    this.isbn = isbn
    this.publisher = publisher
    this.user_id = user_id
    this.genre = genre
    this.images = images

  }
}