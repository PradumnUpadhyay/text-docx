// Libraries
const docx=require('docx')
const express=require('express')
const app=express()

// Utilities
let doc=null,pytessDocx=null; let fn="",filename="";
const port= process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// For writing paragraph
function paraWrite(para) {
    var li=para.split("\n")
    console.log(li)
    var para=[]

    for(let i=0;i<li.length;i++){
        para.push(new docx.Paragraph({ text: li[i] }))
    }

    return para;
}


// Routes
app.get('/',(req,res)=>{
    res.send("Are you lost baby girl?")
})

// OCR text docx
app.post('/download',(req,res)=>{
    // Extract string from req body
    console.log("recieved Request")
    let list=req.body.data.slice(1)
    console.log(list)
try {     
    doc=new docx.Document();
    console.log("Request Body: \n",req.body)
    
    fn=req.body.data[0]
    console.log('List is: \n',list)
  
    for(let i=0;i<list.length; i++) {
        // console.log(list[i].split("\n"))
      
        doc.addSection({            
            children: paraWrite(list[i])
        })
       }
       
console.log("List: \n",list)
    list=null
    console.log("List after null: \n",list)
   res.status(200).send('File ready for download!')
    
}
catch(err) {
    console.log("Error: \n",err)
    res.status(400).send("Error Occured!\n")
    
}
})// end of request

// OCR text docx
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

const Razorpay=require("razorpay")


app.post('/user/orders',async (req,res) => {
    const instance = new Razorpay({ key_id: 'rzp_test_S37YIf8khcCyPI', key_secret: 'a58F3Hx2L7xpLLUgFUHzVMD9' })
    console.log(req.body)
    let options = {
        amount: req.body.amount*100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "11906969696"
      };

      instance.orders.create(options, function(err, order) {
        console.log(order);
        err!=null ? res.send(order) : console.log(err)
      });
})


app.listen(port, console.log('Listening on PORT: ',port));
