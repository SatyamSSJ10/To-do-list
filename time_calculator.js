class Task{
    contructor(name){
        this.username=name
        this.task=[]
        this.counter = 0
        this.time = new Date();
    }
    add_task(task,time){
        this.counter++;
        this.task.push([Number(this.counter),String(task),String(time)]);
        console.log(`Appended: ${String(task)} for ${time}`);
    }
    calc_time(counter){
        var time = this.task[counter-1][2].split(":");
        let hour = this.time.getHours();
        let minutes = this.time.getMinutes();
        return `${Math.abs(Number(time[0])-hour)}:${Math.abs(Number(time[1])-minutes)} Left`
    }
    time_left(counter){
        console.log(add_time(this.task[counter-1][2]));
    }
    print_task(){
        
    }
}
