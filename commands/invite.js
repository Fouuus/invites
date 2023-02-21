const Discord = require("discord.js");
const {JsonDatabase} = require("wio.db");
module.exports = {
  name: "invite",
  aliases: ["Savaşçı TEAM"],
  description: "Main Command",
  run: async(client, message, args) => {
    
    const db = new JsonDatabase({
      databasePath: "Database/inviteDB"
    })
    
    const error = new Discord.MessageEmbed()
      .setTitle("Savaşçı TEAM Davet")
      .setColor("RED")
      .setDescription(`

 -&- \`${client.config.prefix}invite log set [<channel>]\` → **Davet Log  kanalını ayarlar**
 -&- \`${client.config.prefix}invite log clear\` → **Davet Log kanalını Siler**
 -&- \`${client.config.prefix}invite add [<user/everyone>] [<integer>]\` → **Kullanıcıya veya herkese davet ekler**
 -&- \`${client.config.prefix}invite remove [<user/everyone>] [<integer>]\` → **Kullanıcıdan veya herkesten gelen davetleri kaldırır**
 -&- \`${client.config.prefix}invite clear [<user/everyone>]\` → **Kullanıcı veya herkesin davetlerini temizler**
      `)
      .setFooter("Savaşçı TEAM ©")
      const basariliEmbed = new Discord.MessageEmbed()
        .setTitle("Savaşçı TEAM Davet")
        .setColor("GREEN")
        .setFooter("Savaşçı TEAM ©")
      const basarisizEmbed = new Discord.MessageEmbed()
        .setTitle("Savaşçı TEAM Davet")
        .setColor("RED")
        .setFooter("Savaşçı TEAM ©")
    
    if(args.length <= 1) {
      message.reply({ embeds: [error] });
    } else {
      
      if(String(args[0]).toLowerCase() == "log") {
        if(String(args[1]).toLowerCase() == "set") {
          let channel = client.getChannel(args[2]);
          if(channel != null && channel.type == "GUILD_TEXT" && channel.guild.id == message.guild.id) {
            
            db.set(message.guild.id + ".logChannel", channel.id);
            
            basariliEmbed.setDescription(`
Log kanalı başarıyla düzenlendi.

**Bilgi:**
> Kanal: ${channel}
> Kanal Adı **${channel.name}**
            `)
            
            message.reply({ embeds: [basariliEmbed] })            
          } else {
            message.reply({ content: "**Error:** Geçersiz Kanal", embeds: [error] });
          }
        } else if(String(args[1]).toLowerCase() == "clear") {
          if(db.fetch(message.guild.id + ".logChannel") != null) {
            db.delete(message.guild.id + ".logChannel");

            basariliEmbed.setDescription(`
Log kanalı başarıyla silindi.
            `)
            message.reply({ embeds: [basariliEmbed] })
          } else {
            basarisizEmbed.setDescription(`
Log kanalı ayarlanmadı.
            `)
            
            message.reply({embeds: [basarisizEmbed]});
          }
        }
      } else if(String(args[0]).toLowerCase() == "add") {
        if(String(args[1]).toLowerCase() == "everyone") {
           
          let invites = parseInt(args[2]);
          if(invites) {
            client.addInvites(message.guild, invites, "everyone")
            basariliEmbed.setDescription(`
başarıyla verildi\`${invites}\` herkesi davet ediyor.
            `)
            message.reply({ embeds: [basariliEmbed] })
          } else {
            message.reply({ content: "Lütfen bir davet sayısı verin", embeds: [error]})
          }
        } else if(client.getUser(args[1]) != null) {
          let user = client.getUser(args[1]);
          let invites = parseInt(args[2]);
          if(invites) {
            client.addInvites(message.guild, invites, user)
            basariliEmbed.setDescription(`
başarıyla verildi \`${invites}\` herkesi davet ediyor ${user}.
            `)
            message.reply({ embeds: [basariliEmbed] })
          } else {
            message.reply({ content: "Lütfen bir davet sayısı verin", embeds: [error]})
          }
        } else {
          message.reply({ content: "Geçersiz kullanıcı", embeds: [error]})
        }
      } else if(String(args[0]).toLowerCase() == "remove") {
        if(String(args[1]).toLowerCase() == "everyone") {
           
          let invites = parseInt(args[2]);
          if(invites) {
            client.removeInvites(message.guild, invites, "everyone")
            basariliEmbed.setDescription(`
başarıyla kaldırıldı \`${invites}\` Herkesten davet.
            `)
            message.reply({ embeds: [basariliEmbed] })
          } else {
            message.reply({ content: "Lütfen bir davet sayısı verin", embeds: [error]})
          }
        } else if(client.getUser(args[1]) != null) {
          let user = client.getUser(args[1]);
          let invites = parseInt(args[2]);
          if(invites) {
            client.removeInvites(message.guild, invites, user)
            basariliEmbed.setDescription(`
başarıyla kaldırıldı \`${invites}\` Gelen davetler ${user}.
            `)
            message.reply({ embeds: [basariliEmbed] })
          } else {
            message.reply({ content: "Lütfen bir davet sayısı verin", embeds: [error]})
          }
        } else {
          message.reply({ content: "Geçersiz kullanıcı", embeds: [error]})
        }
      } else if(String(args[0]).toLowerCase() == "clear") {
        if(String(args[1]).toLowerCase() == "everyone") {
           
          client.clearInvites(message.guild, "everyone")
          basariliEmbed.setDescription(`
başarıyla kaldırıldı \`all\` Herkesten davet.
          `)
          message.reply({ embeds: [basariliEmbed] })
          
        } else if(client.getUser(args[1]) != null) {
          let user = client.getUser(args[1]);
         
          client.clearInvites(message.guild, user)
          basariliEmbed.setDescription(`
başarıyla kaldırıldı \`all\` Gelen davetler ${user}.
          `)
          message.reply({ embeds: [basariliEmbed] })
        } else {
          message.reply({ content: "**Geçersiz kullanıcı", embeds: [error]})
        }
      }
    }
  }
}