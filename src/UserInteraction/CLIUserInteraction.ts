class CLIUserInteraction implements userInteraction{
    
    storage : DB;
    parser : Parser;
    constructor(db : DB) {
        this.storage = db;
        this.parser = new CLIParser;
         
    }

    
    

}