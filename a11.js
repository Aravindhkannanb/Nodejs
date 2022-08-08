var http = require('http');

var fs = require('fs');
var mail=require('nodemailer');
var f = require('formidable');
http.createServer(function(req,res){
    if (req.url =='/'){
        res.writeHead(200,{'content-type':'text/html'});
        res.write('<form action = "a" method = "post" enctype = "multiparts/form-data"><br>');
        res.write('From : <input type = "text" name ="a" style={border:2px solid green}><br>');
        res.write('To : <input type = "text" name ="b"><br>');
        res.write('Subject : <input type = "text" name ="c"><br>');
        res.write('Text : <input type = "text" name ="d"><br>');
        res.write('<input type = "Submit" name ="e">')
    }   
    else if(req.url=='/a'){
        var form = new f.IncomingForm();
        form.parse(req,function(err,fields,files){
           var b =  mail.createTransport({
            service:'gmail',
            auth:{
                user:"aravindhkannan26@gmail.com",
                pass:'acvwnbioewkfajzg'
            }
            
           }) 
           var c = {
            from:fields.a,
            to:fields.b,
            subject:fields.c,
            text:fields.d
           }
           b.sendMail(c,function(error,info){
            if (error) throw error;
            else{
                res.write('<h1>Mail sent succesfully</h1>')
                console.log('Email'+info.response)
            }

           })
        })
    }
}).listen(8080);