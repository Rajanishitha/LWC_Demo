import { LightningElement } from 'lwc';

export default class Lifecyclehookups extends LightningElement {
    constructor(){
        super();
        console.log('The Constructor method is called')
    }
    connectedCallback(){
        console.log('The Connected Callback method is called')
    }
    renderedCallback(){
        console.log('The Rendered Callback method is called')
    }
    disconnectedCallback(){
        console.log('The DIsConnected Callback method is called')
    }
}