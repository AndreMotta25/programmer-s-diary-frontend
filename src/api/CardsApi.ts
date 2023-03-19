
import { ICard } from "../@types/ICard";
import { HttpClient } from "./shared/HttpClient";

interface ICardRequest { 
    name:string;
    description:string;
    code:string;
    language:string
}
class CardApi extends HttpClient {
    
    static apiInstance: CardApi;

    private constructor() {
        super(`${process.env.REACT_APP_BASE_URL}/card`);
        
    }

    static getInstance() {
        if(CardApi.apiInstance)
            return CardApi.apiInstance;
        else 
            return new CardApi();    
    }

    async getCards() {
        const cards = await this.instance.get<ICard[]>('/')
        return cards;
    }
    async postCard({name,description,code,language}: ICardRequest) {
       return await this.instance.post<string>('/',{name,description,code,language});
    }
    async putCard(card:ICard){
        await this.instance.put(`/${card.id}`, {name:card.name, description:card.description, code:card.code, language:card.language});
    }
    async deleteCard(id:string) {
        await this.instance.delete(`/${id}`);
    }
}

export {CardApi}