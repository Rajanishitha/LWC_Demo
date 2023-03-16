public class AccountRecords {
        @AuraEnabled(cacheable=true)
        public static List<Account> getAccountRecord(){
            return [Select id,Name,Phone,Rating,AccountNumber from Account order By CreatedDate DESC Limit 20];
        }
         @AuraEnabled(cacheable=true)
        public static List<Account> getAccountRecordList(List<Id> Accountids){
            return [Select id,Name,Phone,Rating,AccountNumber from Account where id in:Accountids order By CreatedDate DESC Limit 20];
        }
       /*  @AuraEnabled(cacheable=true)
        public static List<Sobject> getRecords(String objectName){
            return [Select id,Name,Phone,Rating,AccountNumber from objectName order By CreatedDate DESC Limit 20];
        }*/
        @AuraEnabled
        public static Account     getInsertAccount(Account accountObj){
            try {
                insert accountObj;
                return accountObj;
            } catch (Exception exp) {
                throw new AuraHandledException(exp.getMessage());
            }
        }    
    }