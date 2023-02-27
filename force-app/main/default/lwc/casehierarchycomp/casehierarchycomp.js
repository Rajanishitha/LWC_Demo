import { LightningElement ,track} from 'lwc';
import getCaseRecord from '@salesforce/apex/getCaseRecords.getCaseRecord';


export default class Casehierarchycomp extends LightningElement {
    @track gridData;
    @track gridcolumns=[
        {
            type:'text',
            fieldName:'Name',
            label:'Name'
        },
        {
            type:'text',
            fieldName:'caseNumber',
            label:'Case Number'
        },
        {
            type:'text',
            fieldName:'Status',
            label:'Status'
        }
    ];
    connectedCallback(){
        console.log('Inside Connected Call Back');
        getCaseRecord()
        .then(result => {
            console.log('Inside Function');
            //console.log("R:"+JSON.stringify(result));
        })
        .catch(error => {
            console.log('Inside Error');
            console.log(JSON.stringify(error));
        });
}

        
    
    
}