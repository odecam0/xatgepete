import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';

const { Configuration, OpenAIApi } = require("openai");

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
const Keys     = new Mongo.Collection('Keys');

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
  async insertGPTMessageInContext(currentContext, prompt_data) {
    if (Keys.find({ userId: this.userId }).count() == 0) {
      Messages.insert({ from: 'gpt', text: "Você não adicionou uma chave para acessar o GPT", contextID: currentContext })
    } else {
      const APIKEY = Keys.find({userId: this.userId}).fetch()[0].apiKey;

      const configuration = new Configuration({
        apiKey: APIKEY,
        basePath: "https://api.openai.com/v1/chat/"
      });
      const openai = new OpenAIApi(configuration);

      await openai.createCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", content: prompt_data }],
        max_tokens: 4000
      }).then((thing) => {
        const gptMessage = thing.data.choices[0].message.content;
        Messages.insert({ from: 'gpt', text: gptMessage, contextID: currentContext })
      }).catch((e) => {
        Messages.insert({ from: 'gpt', text: e.response.status + ' ' + e.response.statusText, contextID: currentContext })
      });
    }
  },
  updateContextName(currentContext, newName) {
    Contexts.update({_id:currentContext} , {$set: {title: newName}});
  },
  setUserApiKey(apiKey) {
    if (this.userId){
      if (Keys.find({userId: this.userId}).count() == 0) {
        Keys.insert({userId: this.userId, apiKey: apiKey});
      } else {
        Keys.update({userId: this.userId}, {$set: {apiKey: apiKey}});
      }
    }
  }
});

Meteor.startup(async () => {
  Meteor.publish('contexts', function () {
    return Contexts.find({userID: this.userId})
  });
  Meteor.publish('messages', function (currentContext) {
    return Messages.find({contextID: currentContext})
  });
  Meteor.publish('key', function () {
    return Keys.find({userId: this.userId})
  })

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
