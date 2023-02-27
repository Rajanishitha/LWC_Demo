import { LightningElement ,api,wire,track} from 'lwc';
import getAccountRecord from '@salesforce/apex/AccountRecords.getAccountRecord';
import { refreshApex } from '@salesforce/apex';
const accColumns = [
    { label: 'Name', fieldName: 'Name'},
    { label: 'Account Number', fieldName: 'AccountNumber' },
   
    { label: 'Phone', fieldName: 'Phone' },
    { label: 'Rating', fieldName: 'Rating' }
];
export default class Displayrecord extends LightningElement {
    @api objectname;
    @track data=[];
    @track wiredAccountResults=[];
    columns=accColumns;
    
    @api blockFun(){

    }
    
    @wire(getAccountRecord)
    accountData(result){
        this.wiredAccountResults = result;

          if (result.data){
            this.data = result.data;
        }
        else if(result.error){
            console.log(result.error);
        }
    }
    /*({ error, data }){
        if (error) {
            console.error("error loading Account", error);
        } else if (data) {
            this.data = data;
        }
    }*/
    @api handlervalue(){
        refreshApex(this.wiredAccountResults);
        console.log(JSON.stringify(this.data));
    }
}