import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'proyectmail856@gmail.com',
      pass: 'gjhx ojbs wvoy pmwp'
    }
  });

export function date(data,res){
    const mailOptions = {
        from: 'proyectmail856@gmail.com',
        to: data.to,
        subject: data.subject,
        text: '',
        html: `<h1>Capibara Team</h1>
              <h1>Gracias por agendar tu cita, estos son los datos de tu cita.</h1>
              <p>${data.body}</p>
              <div><img src="cid:footer" style="width:700px;height:200px;"/></div>`,
        attachments: [
            {
                filename: 'Capibara Team.jpg',
                path: 'img/Capibara Team.jpg',
                cid: 'footer'
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

export function contact(data,res){
  const mailOptions = {
    from: 'proyectmail856@gmail.com',
    to: 'humbertomanuel_cabrera@outlook.es',
    subject: data.subject,
    text: '',
    html: `<h1>Capibara Team</h1>
          <h1>Correo de: ${data.to}</h1>
          <p>${data.body}</p>
          <div><img src="cid:footer" style="width:700px;height:200px;"/></div>`,
    attachments: [
        {
            filename: 'Capibara Team.jpg',
            path: 'img/Capibara Team.jpg',
            cid: 'footer'
        }
    ]
  }
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