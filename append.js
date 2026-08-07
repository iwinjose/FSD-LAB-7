const fs=require('fs');

fs.appendFile('index.txt','\nAdding this line\n one more line',(err)=>{
    if(err){
        console.log(err);
    }
    console.log('Line added successfully');
});