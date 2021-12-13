import fs from "fs";
import fs1 from "fs/promises";
class JsonFileStorage {
    file_name;
    constructor(file_name) {
        this.file_name = file_name;
    }
    // init db (json file)
    async createIfEmpty() {
        if (fs.existsSync(this.file_name)) {
            return 1;
        }
        let Todo = {
            last_id: 0,
            tasks: []
        };
        await fs1.writeFile(this.file_name, JSON.stringify(Todo));
    }
    // read file
    async myReadFile() {
        return JSON.parse((fs.readFileSync(this.file_name, 'utf-8')));
    }
    // write file
    async myWriteFile(contents) {
        this.createIfEmpty();
        await fs1.writeFile(this.file_name, JSON.stringify(contents, null, 4));
    }
    // add to file
    async addToFile(task) {
        let contents = await this.myReadFile();
        contents.push(task);
        await this.myWriteFile(contents);
    }
    // remove from file
    async removeCompletedFromFile(tasks) {
        tasks = [];
        tasks = tasks.concat(tasks);
        let contents = await this.myReadFile();
        contents = contents.filter((element) => element.done == false);
        await this.myWriteFile(contents);
    }
    async deleteFromFile(task_id) {
        let foundIndex = -1;
        let contents = await this.myReadFile();
        for (let i = 0; i < contents.length; i++) {
            if (contents[i].id == task_id) {
                contents.splice(i, 1);
                return contents;
            }
        }
        if (foundIndex == -1) {
            return contents;
        }
    }
}
export { JsonFileStorage };
