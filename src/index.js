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
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates,
    ]
});

/** when bot is running */
client.on('ready', (clnt) => {
    console.log(`✅ ${clnt.user.tag} is good to go!`)
});

/** when a new message is detected */
client.on('messageCreate', (message) => {
    
    /** Guard clause: do nothing if the message author is a bot */
    if (message.author.bot) return;

    if (message.content === ('hello bot js')){
        message.reply(`Hello ${message.author.username}!`)
    }
});

client.on('interactionCreate', (interaction) => {
    /** Guard clause: Only process if the interaction is a chat input command */
    if (!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'hello'){
        interaction.reply(`Hello, ${interaction.member.displayName}!`)
    }

    if(interaction.commandName === 'sum'){
        const num_1 = interaction.options.get('first-number')?.value;
        const num_2 = interaction.options.get('second-number')?.value;

        /** Note to self: the char '?' above is called optional chaining. For optional operations */

        const result = num_1 + num_2;
        interaction.reply(`The sum of ${num_1} and ${num_2} is: ${result}`);
    }

    if(interaction.commandName === 'play-yt-audio'){
        console.log('Processing to play yt audio...')

        /** PICK UP HERE
         * The interaction does not work, idk why since it doesnt return an error or crash the app
         */

        const URL = interaction.options.get('yt-link').value;
        console.log(`URL: ${URL}`);

        const ytdl = require('ytdl-core');

        if(!ytdl.validateURL(URL)){
            console.log(`Unable to parse a valid video ID with: ${URL}`);
        } else{
            console.log(`URL parses a valid video ID`);
        }

        /** all good up to here i think */

        const Discord = require('@discordjs/voice');
        const stream = ytdl(URL, {filter: 'audioonly'});
        const stream_info = ytdl.getInfo(URL, {filter: 'audioonly'});
        console.log(`title: ${stream_info.videoDetails.title}`);
        
        const player = Discord.createAudioPlayer();
        const resource = Discord.createAudioResource(stream);

        const connection = Discord.joinVoiceChannel({
            channelId: interaction.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });

        player.play(resource);
        connection.subscribe(player);

        player.on(Discord.AudioPlayerStatus.Idle, () => {
            connection.destroy();
        })

    }

});

client.login(process.env.JS_BOT_TOKEN);

