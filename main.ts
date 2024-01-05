const fs = require('fs')
async function jobArrived(s: Switch, flowElement: FlowElement, job: Job) {
let entries:any = await flowElement.getPropertyStringValue("entries")
let csvname:any = await flowElement.getPropertyStringValue("filename")
let foldername:any = await flowElement.getPropertyStringValue("OutputFolder")
let csv:any = foldername + "/" + csvname
let headersin:any = []
let datasin:any = []
for (let i = 0; i < entries; i++) {
    headersin[i] = await flowElement.getPropertyStringValue("h" + i);
    datasin[i] = await flowElement.getPropertyStringValue("d" + i)
}

try{
    let data = fs.readFileSync(csv,"utf-8")
    newdata(data)
} catch (err) {
    console.log("Creating new CSV")
    newfile()
}
async function newdata(a:any){
    let data1 = a + datasin
    fs.writeFileSync(csv, data1+'\n');
    await job.sendToSingle()
}
async function newfile(){
    let data1 = headersin+"\n"+datasin
    fs.writeFileSync(csv, data1+'\n')
    await job.sendToSingle()
}
}
