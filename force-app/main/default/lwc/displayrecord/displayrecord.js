import { LightningElement ,api,wire,track} from 'lwc';
import getAccountRecord from '@salesforce/apex/AccountRecords.getAccountRecord';
const accColumns = [
    { label: 'Name', fieldName: 'Name'},
    { label: 'Account Number', fieldName: 'AccountNumber' },
   
    { label: 'Phone', fieldName: 'Phone' },
    { label: 'Rating', fieldName: 'Rating' }
];
export default class Displayrecord extends LightningElement {
    @api objectname;
    data=[];
    columns=accColumns;
    @wire(getAccountRecord)
    accountData({ error, data }){
        if (error) {
            console.error("error loading Account", error);
        } else if (data) {
            this.data = data;
        }
    }
}