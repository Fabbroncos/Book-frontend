import { Genre } from "./book.service";

export interface adImage {
  ad_id: number,
  created_at: string,
  deleted_at: string,
  id: number,
  main: boolean,
  updated_at: string,
  url: string
} 

export class Book {
  public id: number;
  // public userId: number;
  public title: string;
  public author: string;
  // public imgUrl: string;
  public year: number;
  public description: string;
  public genre: Genre[];
  public publisher: string;
  public price: string;

  created_at: string;
  deleted_at: string;
  hidden: boolean;
  images: adImage[];
  updated_at: string;
  user_id: number;


  constructor(
    id: number,
    user_id: number,
    title: string,
    author: string,
    // imgUrl: string,
    images: adImage[],
    year: number,
    description: string,
    genre: Genre[],
    publisher: string,
    created_at: string,
    deleted_at: string,
    hidden: boolean,
    updated_at: string,
  ) 
  {
    this.id = id,
    this.user_id = user_id,
    this.title = title,
    this.author = author,
    // this.imgUrl = imgUrl

    this.created_at = created_at,   
    this.deleted_at = deleted_at,
    this.hidden = hidden,
    this.updated_at = updated_at,

    this.images = images,
    this.year = year,
    this.description = description,
    this.genre = genre,
    this.publisher = publisher
    this.price = "19.99" + "€"
  }
}