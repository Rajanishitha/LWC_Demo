import { LightningElement,track,api,wire } from 'lwc';
import getAccountRecord from '@salesforce/apex/AccountRecords.getAccountRecord';
import getInsertAccount from '@salesforce/apex/AccountRecords.getInsertAccount';
import accName from '@salesforce/schema/Account.Name';
import accPhone from '@salesforce/schema/Account.Phone';
import accRating from '@salesforce/schema/Account.Rating';
import accNumber from '@salesforce/schema/Account.AccountNumber';
const columns = [
    { label: 'Name', fieldName: 'Name'},
    { label: 'Account Number', fieldName: 'AccountNumber' },
   
    { label: 'Phone', fieldName: 'Phone' },
    { label: 'Rating', fieldName: 'Rating' }
];
export default class CreateAccont extends LightningElement {
    columns=columns;
    newName='';
    newRating='';
    newPhoneNumber='';
    newAccountNumber='';
    @track data=[];
    @track getAccountRecord={
        Name:accName,
        Phone:accPhone,
        Rating:accRating,
        AccountNumber:accNumber
        
        };
    @track isModalOpen = false;
    openModal() {
        this.isModalOpen = true;
    }
    closeModal() {
        this.isModalOpen = false;
    }
    updateNamevalues(event){
        this.getAccountRecord.Name=event.target.value;
    }
    updatePhonevalues(event){
        this.getAccountRecord.Phone=event.target.value;
    }
    updateRating(event){
        this.getAccountRecord.Rating=event.target.value;
    }
    updateAccountNumber(event){
        this.getAccountRecord.AccountNumber=event.target.value;
    }
    @wire(getAccountRecord)
    accountData({ error, data }){
        if (error) {
            console.error("error loading Account", error);
        } else if (data) {
            this.data = data;
        }
    }
    submitDetails(){
        console.log('Inside Button Click');
        getInsertAccount({ Name: this.newName,Phone:this.newPhoneNumber,Rating:this.newRating,AccountNumber:this.newAccountNumber })
        .then((result) => {
            console.log('Inside Apex ');
            this.data = result;
            this.error = undefined;
            console.log(this.data);
        })
        .catch((error) => {
            console.log('Inside Error ');
            this.error = error;
        });
        this.isModalOpen = false;
}



}