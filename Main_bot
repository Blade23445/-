const { Client, GatewayIntentBits } = require('discord.js')
require('dotenv/config')

const generateImage = require("./generateImage")

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
})

client.on('ready', () => {
    console.log('Bot Protocolls Engaged: Subset Directory Activated.')
})

const welcomeChannelId = "821610313299525650"

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
    message.channel.send('You <@729374175822610562>!')
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