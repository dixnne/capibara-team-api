import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'proyectmail856@gmail.com',
      pass: 'gjhx ojbs wvoy pmwp'
    }
  });

export function sendMail(data,res){
    const mailOptions = {
        from: 'proyectmail856@gmail.com',
        to: data.to,
        subject: data.subject,
        text: '',
        html: `<h1>Capibara Team</h1>
              <p>${data.body}</p>
              <div><img src="cid:footer" style="width:700px;height:200px;"/></div>`,
        attachments: [
            {
                filename: 'Capibara Team.jpg',
                path: 'img/Capibara Team.jpg',
                cid: 'footer'
            //  path: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
            }
        ]
    };
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.send({message:"Error al mandar el correo",success:false,error:error})
        console.log(error);
      } else {
        res.send({message:"Correo enviado",success:true,error:null})
        console.log('Email sent: ' + info.response);
      }
    });
}