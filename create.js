const fs=require('fs');
const data=fs.writeFile('index.txt','Hello',(err)=>{
    if(err){
        console.log(err);
    }
    console.log('File created successfully');
});

if(fs.existsSync('sample.txt')){
    console.log('File exists');
}
else{
    console.log('File dosent exist');
}

