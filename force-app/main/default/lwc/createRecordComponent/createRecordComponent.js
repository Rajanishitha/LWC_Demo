import { LightningElement,api,track } from 'lwc';
import accName from '@salesforce/schema/Account.Name';
import accPhone from '@salesforce/schema/Account.Phone';
import accRating from '@salesforce/schema/Account.Rating';
import accNumber from '@salesforce/schema/Account.AccountNumber';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateRecordComponent extends LightningElement {
    @api objectname;
    @track objName=this.objectname;
    fields = [accName, accPhone, accRating,accNumber];
    handleSuccess(event) {
        console.log(ObjectName);
        const evt = new ShowToastEvent({
            title: 'Account created',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }
}