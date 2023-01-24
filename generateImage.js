const Canvas = require("canvas")
const Discord = require("discord.js")
const background = "https://i.imgur.com/cNjW9re.jpeg"

const dim = {
    height: 675,
    width: 1200,
    margin: 50
}
const av = {
    size: 256,
    x: 480,
    y: 170
}

const generateImage = async (member) => {
    let username = member.user.username
    let discrim = member.user.discriminator
    let avatarURL = member.user.displayAvatarURL();
    let avatarURLPNG = avatarURL.replace(/webp/g, "png")
    
    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")

    // draw in the background
    const backimg = await Canvas.loadImage(background)
    ctx.drawImage(backimg, 0, 0)

    // draw black tinted box
    ctx.fillStyle = "rgba(0,0,0,0.8)"
    ctx.fillRect(dim.margine, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin)

    const avimg = await Canvas.loadImage(avatarURLPNG)
    ctx.save()

    ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore()


    // write in text
    ctx.fillStyle = "white"
    ctx.textAlign = "center"

    // draw in wrlcomg
    ctx.front = "50px Roboto"
    ctx.fillText("Welcome", dim.width/2, dim.margin + 70)

    // draw in the username
    ctx.font = "60px Roboto"
    ctx.fillText(username + discrim, dim.width/2, dim.height - dim.margin - 125)

    // draw into the server
    ctx.font = "40px"

    console.log(canvas.toBuffer())
    return canvas.toBuffer()
}

module.exports = generateImage