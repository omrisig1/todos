"use strict";
class TaskValidator {
    static CLI_Validations = [
        { 'create': ['-t', '--title'] },
        { 'update': ['--id', '--status'] },
        { 'delete': ['--id'] },
        { 'remove-comeleted': [] },
        { 'show': ['all', 'completed', 'open'] }
    ];
    static CLIValidation(activation_function, parameter) {
        if (!TaskValidator.CLI_Validations.some(obj => Object.keys(obj)[0] == activation_function)) {
            return false;
        }
        let validation_for = TaskValidator.CLI_Validations.find(obj => Object.keys(obj)[0] == activation_function) || {};
        if (!Object.values(validation_for).includes(parameter)) {
            return false;
        }
        return true;
    }
}
