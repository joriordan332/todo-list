import { showAll, isToday, isThisWeek } from 'date-fns'

const allTasks = () => {
    const tasks = document.querySelectorAll('.tasks .taskContainer .date');
    Array.from(tasks).forEach(task => task.parentElement.style.display = 'grid');
}


const todayTask = () => {
    const tasks = document.querySelectorAll('.tasks .taskContainer .date');
    Array.from(tasks).forEach(task => {
        task.parentElement.style.display = "grid"
        let result = isToday(new Date(task.textContent))
        if(!result) {
            task.parentElement.style.display = "none"
        }
    });
}

const weekTask = () => {
    const tasks = document.querySelectorAll('.tasks .taskContainer .date');
    Array.from(tasks).forEach(task => {
        task.parentElement.style.display = "grid"
        let result = isThisWeek(new Date(task.textContent))
        if(!result) {
            task.parentElement.style.display = "none"
        }
    });
}

const showProject = (target) => {
    const tasks = document.querySelectorAll('.tasks .taskContainer .projectSelect');
    
    Array.from(tasks).forEach(task => {
        task.parentElement.parentElement.style.display = "grid"  
        if(!target.textContent.includes(task.firstElementChild.textContent)) {
            task.parentElement.parentElement.style.display = 'none';
        }
        
    });
}

export { allTasks, todayTask, weekTask, showProject } 



