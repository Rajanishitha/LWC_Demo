import { LightningElement,api,track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import LastName from'@salesforce/schema/Contact.LastName';
import Contact_OBJECT from '@salesforce/schema/Contact';

export default class LdsCreateRecord extends LightningElement {
    @api objectname;
    accountId;
    contactId;
    LastName;
    name = '';
    accountblock=false;
    contactblock=false;
    //@track objName=this.objectname;
    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: 'Account created',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success',
        });
        this.AccountIds.push(event.detail.id);
        this.dispatchEvent(evt);
        console.log(this.AccountIds);
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
}