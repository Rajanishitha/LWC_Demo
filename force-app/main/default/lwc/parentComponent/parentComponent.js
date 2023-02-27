import { LightningElement ,api,track} from 'lwc';

export default class ParentComponent extends LightningElement {
    @track objectName;
    @track blockvisible=false;
    changeHandler(event) {
        const field = event.target.name;
        if (field === 'optionSelect') {
            this.selectedOption = event.target.value;
               if( this.selectedOption=='Opportunity'){
                this.objectName='Opportunity';
                this.blockvisible=true;
               }
               else if(this.selectedOption=='Contact'){
                this.objectName='Contact';
                this.blockvisible=true;
               }
               else if(this.selectedOption=='Account'){
                this.objectName='Account';
                this.blockvisible=true;
               }
            } 
        }
}