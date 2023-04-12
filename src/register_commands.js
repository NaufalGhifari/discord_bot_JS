require('dotenv').config();
const {REST, Routes} = require('discord.js');

console.log(process.env.JS_BOT_TOKEN);
console.log(process.env.JS_BOT_ID);
console.log(process.env.FTB_GUILD_ID);

const commands_list = [
    {
        name: 'hello js bot',
        description: 'Replies with Hello'
    },
];

const rest = new REST({version:'10'}).setToken(process.env.JS_BOT_TOKEN);

(async () => {
    try{
        
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.JS_BOT_ID, 
                process.env.FTB_GUILD_ID),
            {body: commands_list}
        );

        console.log('Slash commands registered.');

    } catch (error){
        console.log(`❌ ERROR: ${error}`)
    }
})();

