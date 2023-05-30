import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';

const Contexts = new Mongo.Collection('Contexts');
const Messages = new Mongo.Collection('Messages');

Meteor.methods({
  registerAccount(username, password) {
    if (!Accounts.findUserByUsername(username)) {
      Accounts.createUser({
        username: username,
        password: password,
      })
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
  // Por algum motivo não está atualizando o nome do contexto
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
