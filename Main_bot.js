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

  const { Collection } = require('discord.js');
  client.slashcommands = new Collection();

client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload)
client.loadSlashCommands(bot, false)

client.on("interactionCreate", (interaction) => {
    if (!interaction.isCommand()) return
    if (!interaction.inGuild()) return interaction.reply("This command can only be used in a server")

  const slashcmd = client.slashcommands.get(interaction.commandName)

  if (!slashcmd) return interaction.reply("Invalid slash command")

  if (slashcmd.perms && !interaction.member.permissions.has(slashcmd.perm))
      return interaction.reply("Permission access denied")

  slashcmd.run(client, interaction)

})

client.login(process.env.TOKEN)