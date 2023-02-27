import { LightningElement,wire,api,track } from 'lwc';
import getCaseRecord from '@salesforce/apex/getCaseRecords.getCaseRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CaseChildHandle extends LightningElement {
    gridColumns = [
        { fieldName: "Subject", label: "Subject" },
        { fieldName: "CaseNumber", label: "CaseNumber" },
        { fieldName: "Origin", label: "Origin" }
    ];
    @api recordId;                             
    gridData = [];
    gridExpandedRows;
    @track parentname;

    @wire(getCaseRecord, {recordid: '$recordId'})
    parentCases({ error, data }) {
        if (error) {
            console.error("error loading cases", error);
        } else if (data) {
            this.gridData = data.map((Case) => ({_children: [],...Case}));
        }
    }
     handleOnToggle(event) {
        const rowName = event.detail.name;
        if (!event.detail.hasChildrenContent && event.detail.isExpanded) {
            getCaseRecord({ recordid: rowName })
                .then((result) => {
                    console.log(result);
                    if (result && result.length > 0) {
                        const newChildren = result.map((child) => ({_children: [],...child}));
                        this.gridData = this.getChildren(rowName,this.gridData,newChildren );
                    } else {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: "No children",
                                message: "No children for this case",
                                variant: "warning"
                            })
                        );
                    }
                })
                
        }
    }

    getChildren(rowName, data, children) {
        return data.map((row) => {
            let hasChildrenContent = false;
            if (row._children.length > 0) {
                hasChildrenContent = true;
            }

            if (row.Id === rowName) {
                row._children = children;
            } else if (hasChildrenContent) {
                this.getChildren(rowName, row._children, children);
            }
            return row;
        });
    }
}