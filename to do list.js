const input = require('prompt-sync')();
const fs = require('fs');

class Task{
    constructor(name){
        this.username=name;
        this.task=[];
        this.counter = 0;
        this.time = new Date();
        this.file = "data.txt";
        this.content = '';
        this.fileHandle();
        //Using JSON to store userdata
    }
    fileHandle(){ //W.I.P. This function will update the Class attributes with the values stored in the data.txt file if present.
        if (!fs.existsSync(`${this.file}`)){
            fs.writeFile(this.file,'{}', (error, res)=> {
                if(error){ 
                    console.log('Error: ',error);
                        }
                    }
                )}
        else{
            this.content = fs.readFileSync(String(this.file), 'utf-8');
            }  
        }
    saveFile(){
        fs.writeFile(this.file,this.content,(err,res)=>{
            if(err){
                console.log("Error at Saving File : ", err);
            }
        })
    }
    makeJSON(){
        this.content = {nameUser: this.username,tasks: this.task, taskcounter: this.counter};
    }
    add_task(task,time){
        this.counter++;
        this.task.push([Number(this.counter),String(task),String(time)]);
        console.log(`Appended: ${task} for time = ${time}`);
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
        if (this.counter == 0){
            console.log("No task")
        }
        for (const x of this.task){
            console.log(x[0] + " . " + x[1] + " at " + x[2]);
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
    shift_task(){ //Change Task Time
        for(const x of this.task){
                x[0] = Number(this.task.indexOf(x)) + 1;
            }    
        }
    delete_task(pos){ //Remove Task
        this.task.splice(pos-1,1);
        console.log("Updated task list: ");
        this.counter--;
        this.shift_task();
        this.print_task();
    }
    change_priority(pos,newone){ //change priority of task
        let temp = this.task.splice(pos-1,1);
        this.task.splice(newone-1,0,temp);
        console.log("Updated task list: ");
        this.print_task();
    }
}
var flag = true;
var val=0;
while (flag){
    console.log("Select one Option\n");
    console.log("1. Add User\n2. Print Task\n3. Add Task \n4. Delete Task\n5. Exit");
    val = Number(input(""))
    switch (val-1) {
        case 0:
            var user = new Task(String(input("Name is: ")));
            console.log("Declared User: " + user.username);
            break;
        case 1:
            console.log("Printing Task: \n")
            user.print_task();
            break;
        case 2:
            console.log("Enter:")
            user.add_task(String(input("Task: ")),String(input("Time: ")));
            break;
        case 3:
            user.print_task();
            user.delete_task(Number(input("Delete Task Number? ")))
            user.shift_task();
            break;
        case 4:
            saveFile();
            flag = false;
            break;
        }
}
