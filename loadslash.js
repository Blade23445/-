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
  prefix: "/",
  owners: ["566907143278559232"]
}

client.commands = new Map()
client.events = new Map()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)

module.exports = bot



const welcomeChannelId = "859197723604418570"

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
       content: `<@${member.id}> The Council Welcomes You`,
       files: [img]
    })

})

const guildId = "821219991973003274"

client.slashcommands = new Map()

client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload)
client.loadSlashCommands(bot, false)


client.on('ready', () => {
    const guild = client.guilds.cache.get(guildId)
    if(!guild)
        return console.error("Target guild not found")

        client.commands.set([client.slashcommands.values()])
        console.log(`Successfully loaded in ${client.slashcommands.size}`)

})
    console.log('Bot Protocolls Engaged: Subset Directory Activated.')

    client.on('ready', async () => {
        const guild = client.guilds.cache.get('846496223673581598');
        console.log(guildId.name);
      });

client.login(process.env.TOKEN)