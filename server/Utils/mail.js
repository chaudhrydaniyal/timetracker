const mailgen = require("mailgen")
let config = {
    service:"SMTP",
    host:"mail.sagacious.systems",
    port:587,
    auth:{
        user:"muhammad.noman@sagacious.systems",
        pass:"N0m@n#8080",
    },
    tls:{
        rejectedUnauthorized:false,
    }
}
function setrecients(from,to,subject,mail){
this.message ={
    from:from,
    to:to,
    subject:subject,
    html:mail
}
}
let mailGen = new mailgen({
    theme:"default",
    product:{
        name:"Sagacious Systems",
        link:"www.sagacious.pk"
    },
})

function responseconfig (name,intro,outro){
this.response ={
    body:{
        name:name,
        intro:intro,
        outro:outro
    }
}
}


module.exports = {
    config,
    responseconfig,
    mailGen,
    setrecients
    
}