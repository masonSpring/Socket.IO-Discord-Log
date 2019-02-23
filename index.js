const Discord = require('discord.js');
const client = new Discord.Client();
const bot = client
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // changeImg()
  //setInterval(changeImg, 30*60*1000);
});

function sendMessage(msg, color) {
  io.emit('chat message', new Date().toLocaleString() + ': ' + msg, color);
}



bot.on('message', msg => {
  if (msg.content.length == 0) {
    return
  }
  sendMessage('New message from ' + msg.author.tag + " in #" + msg.channel.name + ": " + msg.content, 'black')
})

bot.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel


  if (oldUserChannel === undefined && newUserChannel !== undefined) {

    // User Joins a voice channel
    sendMessage(`${newMember.user.tag} has joined the voice channel ${newMember.voiceChannel.name}.`, 'green')



  } else if (newUserChannel === undefined) {

    // User leaves a voice channel
    sendMessage(`${newMember.user.tag} has left the voice channel ${oldMember.voiceChannel.name}.`, 'red')


  }
})

client.on('channelCreate', chn => {
  sendMessage("#" + chn.name + " has been created.", 'green')
});

client.on('channelDelete', chn => {
  sendMessage("#" + chn.name + " has been deleted.", 'red')
});

client.on('messageDelete', msg => {
  if (msg.author == bot.user) {
    return
  }
  sendMessage("Message deleted in #" + msg.channel.name + " from " + msg.author.tag + ": " + msg.content, 'red')
});

client.on('messageUpdate', (oldMessage, newMessage) => {
  sendMessage("Message from " + newMessage.author.tag + " in #" + newMessage.channel.name + " edited from: " + oldMessage.content + " to " + newMessage.content + ".", 'yellow')

});

client.on('channelPinsUpdate', (channel, time) => {
  sendMessage("Pins have been modified in #" + channel.name, 'yellow')

});


client.on('channelUpdate', (oldChannel, newChannel) => {
  if (oldChannel.name != newChannel.name) {
    sendMessage("#" + oldChannel.name + " has been renamed to #" + newChannel.name, 'yellow')
  }

});

client.on('typingStart', (channel, user) => {
  sendMessage(user.tag + " has begun typing in #" + channel.name, "grey")
})

client.on('emojiDelete', emoji => {
  sendMessage("Emoji " + emoji.name + " has been deleted", 'red')
})

client.on('messageReactionAdd', (reaction, user) => {
  sendMessage(user.tag + " has reacted to a message in #" + reaction.message.channel.name + " with " + reaction.emoji.name + ".", 'green')
})

client.on('messageReactionRemove', (reaction, user) => {
  sendMessage(user.tag + " has removed a reaction to a message in #" + reaction.message.channel.name + " with " + reaction.emoji.name + ".", 'red')
})




client.on('emojiCreate', emoji => {
  sendMessage("Emoji " + emoji.name + " has been created", 'green')
})


client.on('typingStop', (channel, user) => {
  sendMessage(user.tag + " has stopped typing in #" + channel.name, "grey")
})

let prefix = "-";

//bot setup




client.login('NTQ4NjYwMzE5NzU3NjY0MjU2.D1IjVA.Z70z3leMU_ZtA-5gkk1oWhEMTNg');

http.listen(3000, function () {
  console.log('listening on *:3000');
});