interface ICard {
    language:string;
    description:string;
    name:string;
    id:string;
    code:string;
    save?:boolean;
    update_date: Date
  }

export type {ICard}