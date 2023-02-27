import { LightningElement , api,track,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import accName from '@salesforce/schema/Account.Name';
import accPhone from '@salesforce/schema/Account.Phone';
import accRating from '@salesforce/schema/Account.Rating';
import accNumber from '@salesforce/schema/Account.AccountNumber';
//import conName from '@salesforce/schema/Contact.AccountNumber';
//import conMobile from '@salesforce/schema/Contact.AccountNumber';

import getAccountRecord from '@salesforce/apex/AccountRecords.getAccountRecord';
const columns = [
    { label: 'Name', fieldName: 'Name'},
    { label: 'Account Number', fieldName: 'AccountNumber' },
   
    { label: 'Phone', fieldName: 'Phone' },
    { label: 'Rating', fieldName: 'Rating' }
];
export default class List extends LightningElement {
    columns=columns;
    @track Accountdata=[];
    @api objectApiName;
    @track objectName;
    AccountIds=[];
    fields = [accName, accPhone, accRating,accNumber];
    @track selectedOption;
    @track opportunityblock=false;
    @track accountblock=false;
    @track contactblock=false;
    changeHandler(event) {
    const field = event.target.name;
    if (field === 'optionSelect') {
        this.selectedOption = event.target.value;
           if( this.selectedOption=='Opportunity'){
            this.opportunityblock=true;
            this.contactblock=false;
            this.accountblock=false;
            this.objectName='Opportunity';
           }
           else if(this.selectedOption=='Select the object'){
            this.contactblock=false;
            this.opportunityblock=false;
            this.accountblock=false;
            
           }
           else if(this.selectedOption=='Contact'){
            this.contactblock=true;
            this.opportunityblock=false;
            this.accountblock=false;
            this.objectName='Contact';
           }
           else if(this.selectedOption=='Account'){
            this.accountblock=true;
            this.opportunityblock=false;
            this.contactblock=false;
            this.objectName='Account';
           }
        } 
    }
    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: 'Account created',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success',
        });
        this.AccountIds.push(event.detail.id);
        this.dispatchEvent(evt);
        console.log(this.AccountIds);
        setTimeout(() => {
            eval("$A.get('e.force:refreshView').fire();");
       }, 1000);
        /*getAccountRecord()
        .then((result) => {
            console.log('Inside Apex ');
            this.Accountdata = result;
            this.error = undefined;
            console.log(this.data);
        })
        .catch((error) => {
            console.log('Inside Error ');
            this.error = error;
        });*/

    }
    @wire(getAccountRecord)
    accountData({ error, data }){
        if (error) {
            console.error("error loading Account", error);
        } else if (data) {
            this.Accountdata = data;
        }
    }
    
}