import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';

// Login services configuration
import { ServiceConfiguration  } from 'meteor/service-configuration';
//
ServiceConfiguration.configurations.upsert(
  { service: 'google' },
  {
    $set: {
      loginStyle: "popup",
      clientId: "580136785210-b28q5mtpv68pfkov8ocjcaifoe7quas3.apps.googleusercontent.com",
      secret: "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"
    }
  }
);

console.log(process.env.ROOT_URL);

const Contexts = new Mongo.Collection('Contexts');
const Messages = new Mongo.Collection('Messages');

import nodemailer from "nodemailer";
const Emails = new Mongo.Collection('Emails');
transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'xatgepete.autenticator@gmail.com',
    pass: 'ndviqagjrundzfdp'
  }
});

Meteor.methods({
  registerAccount(username, email, password) {
    if (!Accounts.findUserByUsername(username)) {
      Accounts.createUser({
        username: username,
        password: password,
        email: email
      })
    }
  },
  checkIfEmailExists(email) {
    if (Accounts.findUserByEmail(email)) {
      return(true);
    }
    return(false);
  },
  sendEmail(email){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVXZabcdefghijklmnopqrstuvxz0123456789'
    let randomCode = ''
    for (let i=0; i<10; i++){
      randomCode+=characters.charAt(Math.floor(Math.random() * characters.length))
    }

    transporter.sendMail({
      from: 'xatgepete.autenticator@gmail.com',
      to: email,
      subject: "Verificação de email do Xatgepete",
      text: randomCode
    }, (error, info) => {
      if (error) {
        console.log(error, info);
      } else {
        console.log(info);
      }
    })

    Emails.insert({email: email, code: randomCode}, async (error, id) => {
      if (!error) {
        await new Promise(r => setTimeout(r, 1000 * 60 * 5));

        Emails.remove({_id: id})
      }
    })
  },
  checkEmailCode(email, emailCode){
    const emails = Emails.find({email: email}).fetch()

    if ( emails.length > 0 ) {
      if (emails[0].code == emailCode) {
        return("success");
      } else {
        return("failed");
      }
    } else {
      return("timedout");
    }
  },
  createNewContext() {
    if (this.userId) {
      Contexts.insert({userID: this.userId, title:'Nova conversa'})
    }
  },
  insertMessageInContext(messageObj, currentContext) {
    // currentContext will have the id of the currentContext document
    Messages.insert({contextID: currentContext, ...messageObj});
  },
  async insertGPTMessageInContext(currentContext) {
    const message_to_add = 'Ainda não tem o GPT respondendo';
    const message_to_add_list = message_to_add.split(' ');

    let message_to_send = '';
    const message_id = Messages.insert({from:'gpt', text:message_to_send, contextID:currentContext})

    for (const word in message_to_add_list) {
      message_to_send = message_to_send + ' ' + message_to_add_list[word];
      Messages.update({_id: message_id}, {$set : {text:message_to_send}})
      await new Promise(r => setTimeout(r, 200));
    }
  },
  updateContextName(currentContext, newName) {
    Contexts.update({_id:currentContext} , {$set: {title: newName}});
  }
});

Meteor.startup(async () => {
  Meteor.publish('contexts', function () {
    return Contexts.find({userID: this.userId})
  });
  Meteor.publish('messages', function (currentContext) {
    return Messages.find({contextID: currentContext})
  });

 if (!Accounts.findUserByUsername('teste')) {
    Accounts.createUser({
      username: 'teste',
      password: 'teste'
    });

    const userId = Meteor.users.find({username: 'teste'}).fetch()[0]._id;

    const testeContexts = [
      { title: 'Primeira conversa', userID: userId },
      { title: 'Segunda conversa', userID: userId },
      { title: 'Terceira conversa', userID: userId },
      { title: 'Quarta conversa', userID: userId },
      { title: 'Quinta conversa', userID: userId }
    ];

    for (const contexto in testeContexts) {
      Contexts.insert(testeContexts[contexto]);
    }

   const insertedContexts = Contexts.find({userID: userId}).fetch();

    const testeMensagens = [
      {from: 'user', text: 'Oi, eu sou o usuário'},
      {from: 'gpt', text: 'Oi, estou fingindo ser o chatGPT'},
      {from: 'user', text: 'Blah blah blah'},
      {from: 'gpt', text: 'Blah blah blah'}
    ]

    const contextos_a_serem_usados = [insertedContexts[0],insertedContexts[2],insertedContexts[4]];

    for (const mensagem in testeMensagens) {
      for (const context in contextos_a_serem_usados) {
        Messages.insert({contextID:contextos_a_serem_usados[context]._id, ...testeMensagens[mensagem]});
      }
    }
  }
});
