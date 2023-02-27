import { LightningElement, api, wire, track} from 'lwc';
import {ShowToastEvent} from "lightning/platformShowToastEvent";
const columns = [
    { label: 'Label', fieldName: 'Label' },
    { label: 'Status', fieldName: 'Status'}
];
export default class ToDoList extends LightningElement {
    //@track outputText;
    newTask='';
    columns = columns;
    @track newList=[];
    listitem=[];
    id=0;
    updateTaskvalues(event){
        this.newTask=event.target.value;
    }
    updateValues(event) {
        if(event.keyCode === 13) {
            /*let outputText = event.target.value;
            console.log(outputText);
            this.listitem=[...this.listitem,outputText];
            console.log('listitem');
            console.log(this.listitem);*/
            this.newList =[...this.newList,{id:++this.id,Label:this.newTask,Status:"Incomplete"}]
            //this.dataArray.push(obj1);
            //this.dataArray=[...this.dataArray];
            
            console.log('newList',this.newList);
            /*this.template.querySelectorAll('lightning-input').forEach(element => {
                element.value = null;
                     
              });*/
            this.newTask='';
           // alert(event.target.value);        
        }
        
       
    }
    selectedrowsupdate(event){
        const selectedRows = event.detail.selectedRows;
        if(selectedRows.length>0){
            this.newList=this.newList.filter(task=>task.id !==selectedRows[0].id);
        }
        this.showToastMessage('error', 'Item Deleted', 'Error!');


    }
    showToastMessage(variant, message, title) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            })
        );
    }
    /*UpdateStaus(event){
        let list = this.dataArray;
	    //let index = event.currentTarget.dataset.index;
        this.list[event.currentTarget.dataset.index].Status='Complete';
        this.dataArray=null;
        this.dataArray=list;
    }*/
    //console.log(listitem);
}