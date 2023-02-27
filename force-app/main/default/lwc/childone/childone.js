import { LightningElement,wire,api,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Childone extends LightningElement {
    @api objectname;
    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: ' Record created',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success',
        });
        this.dispatchEvent(evt);
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