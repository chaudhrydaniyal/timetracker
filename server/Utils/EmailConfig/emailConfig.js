const nodemailer = require("nodemailer");
const { setrecients, responseconfig, mailGen } = require("../mail");

async function emailsend(data) {
  try{
    console.log(data.map((email) => email.email))
    let config = {
      service: "SMTP",
      host: "mail.sagacious.systems",
      port: 587,
      auth: {
        user: "Hassan.Ali@sagacious.systems",
        pass: "brownB3am48",
      },
      tls: {
        rejectUnauthorized: false,
      },
      // {rejectUnauthorized:false}
    };
    const to = data.map((email) => email.email)
    const transport = nodemailer.createTransport(config);


    console.log("emailbody", data[0].body)

    let response = new responseconfig(
      "Sagacious Systems",
      data[0].body,
      "Pease open the portal and accept that task"
    );
    let mail = mailGen.generate(response.response);
    const resconfig = new setrecients(
      "Hassan.Ali@sagacious.systems",
      to,
      "New Task Assign to the recipent",
      mail
    );
    await transport
      .sendMail(
{
        from: 'Hassan.Ali@sagacious.systems', // TODO: email sender
        to: 'raheel@sagacious.systems', // TODO: email receiver
        subject: 'Employees Timesheet',
        text: 'Please find the attached file of Employees timesheet.',
        attachments: [
            { filename: 'Timesheet.xlsx', path: './Utils/EmailConfig/data.xlsx' } // TODO: replace it with your own image
        ]
      }
      )
      .then(() => {
        console.log(
          "message has been sent to ",
          data.map((email) => email.email)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }catch(error){
    console.log(error)
    return error
  }

}

module.exports = emailsend;
