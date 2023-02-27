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
    @track objName=this.objectname;
    handleNameChange(event) {
        this.accountId = undefined;
        this.name = event.target.value;
    }
    handlelastNameChange(event){
        this.contactId = undefined;
        this.LastName = event.target.value;
    }
    createAccount() {
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.name;
        const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(account => {
                this.accountId = account.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account created',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }
    createContact() {
        const fields = {};
        fields[LastName.fieldApiName] = this.LastName;
        const recordInput = { apiName: Contact_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(contact => {
                this.contactId = contact.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact created',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }
}