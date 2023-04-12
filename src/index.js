require('dotenv').config();
const {Client, IntentsBitField} = require('discord.js')


/** define the client (bot)
 * don't forget to add intents on the discord dev portal
*/
const client = new Client({
     intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

/** when bot is running */
client.on('ready', (clnt) => {
    console.log(`✅ ${clnt.user.tag} is good to go!`)
});

/** when a new message is detected */
client.on('messageCreate', (message) => {
    
    /** do nothing if the message author is a bot */
    if (message.author.bot){
        return
    }

    if (message.content === ('hello bot js')){
        message.reply(`Hello ${message.author.username}!`)
    }


});

client.login(process.env.JS_BOT_TOKEN);
