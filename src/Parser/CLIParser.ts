export interface Request {
    function: string;
    param: string;
  }
export class CLIParser implements Parser{

    parse( args : string[]){
        let main_function = args[0];
        let functions = [];
        for (let element of args) {
            let request : Request;
            if (element[0] == '-') {
                if(element[1]=='-'){
                    element = element.slice(2)
                }else{
                    element = element.slice(1)
                }
            }
            else{
                break;
            }
            request['function']= element.split('=')[0];
            request['param']= element.split('=')[1];
            functions.push(request);
        }
        let general_request = {
            main_function: main_function,
            functions: functions
        };
        return general_request;
    }
}