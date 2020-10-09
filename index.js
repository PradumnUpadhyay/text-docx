// Libraries
const docx=require('docx')
const express=require('express')
const app=express()

// Utilities
const doc=new docx.Document(); let fn=""
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
    console.log(req.body)
try {
   
    const list=req.body.data.slice(1)

    fn=req.body.data[0]
    // console.log(req.body,'\n',list)
    for(let i=0;i<list.length; i++) {
        doc.addSection({
            properties: {},
            children: [
                new docx.Paragraph({
                    children: [
                        // Writing to doc
                        new docx.TextRun(list[i]) 
                    ]
                })
            ]
        })
    }

   res.status(200).send('File ready for download!')
}
catch(err) {
    res.send("Error Occured!")
    console.log(err)
}
})// end of request

app.get('/download', async (req,res)=>{
    try {
        console.log('request from device for docx')
        console.log(req.query)
    
        const b64=await docx.Packer.toBase64String(doc)
        console.log(fn,"From download route")
        res.setHeader('Content-Disposition', "attachment; filename="+fn)
        res.send(Buffer.from(b64, 'base64'))
    } catch(err){
        console.log(err)
        res.send("some error occured!")
    }
})

app.listen(port, console.log('Listening on PORT: ',port));