const Discord = require("discord.js");
const {JsonDatabase} = require("wio.db");
module.exports = {
  name: "Davet",
  aliases: ["i"],
  description: "Ana Komut",
  run: async(client, message, args) => {
    const db = new JsonDatabase({
      databasePath: "Database/inviteDB"
    })
    const basarisizEmbed = new Discord.MessageEmbed()
        .setTitle("Davet")
        .setColor("RED")
        .setFooter("Savaşçı TEAM ©")
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    
    if(user != null) {
      let invites = db.fetch(`${message.guild.id}.invites.${user.id}`) ? Object.keys(db.fetch(`${message.guild.id}.invites.${user.id}`)).length : 0;
      let fakeInvites = db.fetch(`${message.guild.id}.fakeInvites.${user.id}`) || 0;
      const embed = new Discord.MessageEmbed()
        .setTitle("Davet")
        .setAuthor(`${user.user.tag}`)
        .setColor("RED")
        .setFooter("Savaşçı TEAM ©")
        .setDescription(`

> Davet: ${invites + fakeInvites}
> Gerçek Davet: ${invites}
> Sahte Davet: ${fakeInvites}

        `)
      
      message.reply({embeds: [embed]})
    } else {
      basarisizEmbed.setDescription("Invalid User")
      message.reply({embeds: [basarisizEmbed]});
    }
    
  }
}