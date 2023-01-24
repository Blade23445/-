const { Client, GatewayIntentBits } = require('discord.js')
require('dotenv/config')

const generateImage = require("./generateImage.js")

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
})

let bot = {
  client,
  prefix: "n.",
  owners: ["566907143278559232"]
}

client.commands = new Map()
client.events = new Map()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)

module.exports = bot

client.on('ready', () => {
    console.log('Bot Protocolls Engaged: Subset Directory Activated.')

    const discordServer = client.guilds.cache.get('846496223673581598');
    discordServer.channels.cache.forEach((channel) => {
        console.log('|', channel.name, '=>', channel.id, '|');
    });
})

const welcomeChannelId = "859197723604418570"

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
       content: `<@${member.id}> The Council Welcomes You`,
       files: [img]
    })
  })

client.on('messageCreate', message => {
  if (message.content === '/ping') {
      message.channel.send('pong!')
  } else if (message.content === '/Fuck') {
    message.channel.send('You <@460438904588468264>!')
  }
})

client.on('messageCreate', message => {
  if (message.content === '/yesm') {
      message.channel.send("I'll do it, but I don't have to like it.");
  } else if (message.content.startsWith('/no')) {
      message.channel.send("Invalid command.");
  }
});

client.login(process.env.TOKEN)