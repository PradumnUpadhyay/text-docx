// Libraries
const docx=require('docx')
const express=require('express')
const app=express()

// Utilities
let doc=null; let fn=""
const port= process.env.PORT
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// const user={}
// Routes
app.get('/',(req,res)=>{
    res.send("Are you lost baby girl?")
})

app.post('/download',(req,res)=>{
    // Extract string from req body
    console.log("recieved Request")
    let list=req.body.data.slice(1)
try {     
    doc=new docx.Document();
    console.log("Request Body: \n",req.body)
    fn=req.body.data[0]
    console.log('List is: \n',list)
    for(let i=0;i<list.length; i++) {
        console.log(list[i].split("\n"))
        doc.addSection({
            properties: {},
            children: [
                new doc.Paragraph({
                    text: "hello world\n This is yagami light..."
                })
            ]
        })
    }
console.log("List: \n",list)
    list=null
    console.log("List after null: \n",list)
   res.status(200).send('File ready for download!')
    
}
catch(err) {
    console.log("Error: \n",err)
    res.status(200).send("Error Occured!\n")
    
}
})// end of request

app.get('/download', async (req,res)=>{
    try {
        console.log('request from device for docx')
    
        const b64=await docx.Packer.toBase64String(doc)
        console.log(fn,"From download route\n Downloading file...")
        res.setHeader('Content-Disposition', "attachment; filename="+fn+".docx")
        res.send(Buffer.from(b64, 'base64'))
        console.log("File Downloaded")
        doc=null
    } catch(err){
        console.log("From GET: \n",err)
        res.send("some error occured!")
    }
})

app.listen(port, console.log('Listening on PORT: ',port));
