public class getCaseRecords {
    @AuraEnabled(cacheable=true)
    public static List<Case> getCaseRecord(){
        try {
            List<Case> caseList =new List<Case>([select id,CaseNumber,(select id ,CaseNumber,Status from Cases) FROM Case]);
            if(!caseList.isEmpty()){
                return caseList;
            }
            return null;
            

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
   
}