export class Task {
    constructor(task, description, date, prioritySelect, id, projectSelect) {
        this.task = task;
        this.description = description;
        this.date = date;
        this.prioritySelect = prioritySelect;
        this.id = this.id = `${task}_${Date.now()}`;
        this.projectSelect = projectSelect;
    }
}
