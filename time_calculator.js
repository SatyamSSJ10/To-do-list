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
        if (Number(time[1]) > minutes){
            hour--;
            var real_min = 60 - Number(time[1]) + Number(minutes);
        }
        else{
            var real_min = Math.abs(Number(time[1])-minutes);
        }
        return `${Math.abs(Number(time[0])-hour)}:${real_min}`;
    }
    print_task(){
        for (const x of this.task){
            console.log(x);
        }
    }
    alarm_user(){ //Notify User
        for(x=1;x<=this.counter;x++){
            if ("0:0"==this.calc_time(x)){
                console.log("time for Task :");
                console.log(this.task[x-1][1]);
            }    
        }
    }
    delete_task(){ //Remove Task

    }
    shift_task(){ //Change Task Time

    }
    change_priority(){ //change priority of task

    }
}
