/** It is important to precise the path, otherwise dotenv will return 'undefined' */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const {REST, Routes, ApplicationCommandOptionType} = require('discord.js');


const commands_list = [
    {
        name: 'hello',
        description: 'Let me say hello to you!'
    },
    {
        name: 'play-yt-audio',
        description: 'Takes a youtube link and plays the audio in a VC ;)',
        options: [
            {
                name: 'yt-link',
                description: 'The URL of a youtube video',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    },
    {
        name: 'sum',
        description: 'Returns the sum of 2 numbers',
        options: [
            {
                name: 'first-number',
                description: 'The first number to add',
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                        name: 'one',
                        value: 1
                    },
                    {
                        name: 'two',
                        value: 2
                    }
                ],
                required: true
            },
            {
                name: 'second-number',
                description: 'The second number to add',
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                        name: 'one',
                        value: 1
                    },
                    {
                        name: 'two',
                        value: 2
                    }
                ],
                required: true
            }
        ]
    }
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

