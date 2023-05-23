import {makeAutoObservable} from "mobx";

export default class MessageStore{
    constructor() {
        this._messages = [];
        makeAutoObservable(this);
    }

    setMessages(messages){
        this._messages = [...this._messages, messages];
    }

    get isMessages(){
        return this._messages;
    }
}