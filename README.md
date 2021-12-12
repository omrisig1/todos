Todos-Application's usage instructions:
your options are:

    1. create task
      description: adding a new task with statusd Open , to task list
      params: -t | --title
      usage example:   todos create --title="buy milk"
    
    2. update task
      description: updating specific task status 
      filter options = open/completed , default is open
      params: --id --status
      usage example: 1.  todos update --id="32" --status="completed"
             2.  todos update --id="32"

    3. show tasks 
      description: shows the list of tasks
      filter options = all/open/comepleted , default is all
      params: --filter
      usage example: 1.  todos show --filter="completed"
             2.  todos show all
             3. todos show

    4. delete task
      description: delete specific task from task list 
      params: --id
      usage example: 1.  todos delete --id="32" 
    
    5. remove completed tasks
      description: delete completedtasks from tasks list
      usage example: 1.  todos remove-completed
    
    6. help
        description : show instruction for using the app
        params: --help -h
        usgae example: todos --help



