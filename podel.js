const Discord = require("discord.js");
const config = require("./config.json"),
  colour = config.colour,
  prefix = config.prefix;
const secret = require("../secret.json"),
  token = secret.token;
const bot = new Discord.Client({ disableMentions: "everyone" });
const fs = require("fs");
const db = require("quick.db"),
  ms = require("ms"),
  mparse = require("parse-ms");
const cooldown = new Set();
bot.commands = new Discord.Collection();

//bot.on("debug", console.log);

bot.on("error", async error => {
  try {
    app.webserver.close();
    app.logger("Webserver was halted", "success");
  } catch (e) {
    app.logger("Can't stop webserver:", "error");
    app.logger(e, "error");
  }

  var cmd = "node " + app.config.settings.ROOT_DIR + "podel.js";

  if (app.killed === undefined) {
    app.killed = true;

    var exec = require("child_process").exec;
    exec(cmd, function () {
      app.logger("APPLICATION RESTARTED", "success");
      process.kill();
    });
  }
});

const { Player } = require("discord-music-player");
const player = new Player(bot);
bot.player = player;

fs.readdir("./commands/", (err, files) => {
  if (err) throw err;
  let jsfile = files.filter(f => f.split(".").pop() === "js");

  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.login(token);

bot.on("ready", async () => {
  bot.user.setActivity(
    "HOW TO WATCH FAMILY GUY ALL EPISODE FOR FREE!!! | 2021 NEW GLITCH",
    { url: "https://www.youtube.com/watch?v=amRow1pdZs4", type: "STREAMING" }
  );

  console.log(bot.user.username + " is online.");
});


bot.on("guildBanRemove", function (guild, user) {
  let embed2 = new Discord.MessageEmbed()
    .setTitle(`${user.tag} | Unban`)
    .setDescription(`${user.tag} was unbanned`)
    .setThumbnail(user.displayAvatarURL())
    .setColor("#3bb930")
    .setTimestamp()
    .setFooter(
      "Podel, coded by the government of georgia",
      bot.user.avatarURL()
    );
  if (guild.id !== config.guildID) return;
  bot.guilds.cache
    .get(config.guildID)
    .channels.cache.get(config.logsID)
    .send(embed2);
});

bot.on("guildBanAdd", function (guild, user) {
  let embed2 = new Discord.MessageEmbed()
    .setTitle(`${user.tag} | Ban`)
    .setDescription(`${user.tag} was banned`)
    .setThumbnail(user.displayAvatarURL())
    .setColor("#f60100")
    .setTimestamp()
    .setFooter(
      "Podel, coded by the government of georgia",
      bot.user.avatarURL()
    );
  if (guild.id !== config.guildID) return;
  bot.guilds.cache
    .get(config.guildID)
    .channels.cache.get(config.logsID)
    .send(embed2);
});

bot.on("guildMemberUpdate", function (oldMember, newMember) {
  if (oldMember.displayName === newMember.displayName) return;

  let embed = new Discord.MessageEmbed()
    .setTitle(`Edited Nickname`)
    .setAuthor(oldMember.user.tag, oldMember.user.avatarURL())
    .addField("Old Nickname", `\`\`\`${oldMember.displayName}\`\`\``, true)
    .addField("New Nickname", `\`\`\`${newMember.displayName}\`\`\``, true)
    .setColor("#ff6105")
    .setTimestamp()
    .setFooter("Podel, coded by the government of georgia", bot.user.avatarURL());
  if (oldMember.guild.id !== config.guildID) return;
  bot.guilds.cache
    .get(config.guildID)
    .channels.cache.get(config.logsID)
    .send(embed);
});

bot.on("messageUpdate", function (oldMessage, newMessage) {

  if (oldMessage.content === newMessage.content) return;
  if (oldMessage.author.bot) return;
  if (newMessage.author.bot) return;

  let embed = new Discord.MessageEmbed()
    .setTitle(`#${oldMessage.channel.name} | ID: ${oldMessage.id}`)
    .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL())
    .addField("Old Message", `\`\`\`${oldMessage.content}\`\`\``, true)
    .addField("New Message", `\`\`\`${newMessage.content}\`\`\``, true)
    .setColor(colour)
    .setTimestamp()
    .setFooter("Podel, coded by the government of georgia", bot.user.avatarURL());
  if (oldMessage.guild.id !== config.guildID) return;
  bot.guilds.cache
    .get(config.guildID)
    .channels.cache.get(config.logsID)
    .send(embed);
});

bot.on("messageDelete", async message => {

  var Attachment = (message.attachments).array();

  if (message.attachments.size > 0) {

    //let attachment = new Discord.Attachment(Attachment[0].proxyURL(), "saved.png");

    if (message.author.bot) return;

    let embed = new Discord.MessageEmbed()
      .setTitle(`#${message.channel.name} | ID: ${message.id}`)
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setImage(Attachment[0].proxyURL)
      .setColor(colour)
      .setTimestamp()
      .setFooter("Podel, coded by the government of georgia", bot.user.avatarURL());

    if (message.guild.id !== config.guildID) return;

    if (message.content.length >= 1) {
      embed.addField("Deleted Message", `\`\`\`${message.content}\`\`\``, true)
      await bot.guilds.cache
        .get(config.guildID)
        .channels.cache.get(config.logsID)
        .send(embed);
      return;
    } else {
      await bot.guilds.cache
        .get(config.guildID)
        .channels.cache.get(config.logsID)
        .send(embed);
      return;
    }

  } else {

    if (message.content.toLowerCase().includes("NIGGER".toLowerCase())) return;

    if (message.content.length > 1024) return;

    if (message.author.bot) return;

    let embed = new Discord.MessageEmbed()
      .setTitle(`#${message.channel.name} | ID: ${message.id}`)
      .setAuthor(message.author.tag, message.author.avatarURL())
      .addField("Deleted Message", `\`\`\`${message.content}\`\`\``, true)
      .setColor(colour)
      .setTimestamp()
      .setFooter("Podel, coded by the government of georgia", bot.user.avatarURL());
    if (message.guild.id !== config.guildID) return;
    bot.guilds.cache
      .get(config.guildID)
      .channels.cache.get(config.logsID)
      .send(embed);
  }
});

bot.on("guildMemberAdd", async member => {
  if (member.guild.id === "696515024746709003") {
    if (config.autoBan.includes(member.id)) {
      return member.send(`you've been banned from Podel Server (Reason: autoban)`),
        member.ban({ reason: "autoban (check banlist)" });
    } else if (member.id === "456161212103786496") {
      let role = member.guild.roles.cache.find((role) => role.id === "708436278302998600");
      member.roles.add(role);
    }

    const Canvas = require("canvas");
    const canvas = Canvas.createCanvas(875, 210);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage(
      "https://media.discordapp.net/attachments/697548272192979074/759193785795608616/man3.png"
    );

    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    const avatar = await Canvas.loadImage(member.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }));
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.font = '29px courier';
    ctx.fillStyle = '#000000';
    ctx.fillText(member.user.username, canvas.width / 22.5, canvas.height / 1.15);
    ctx.beginPath();
    ctx.arc(800, 50, 60, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 735, 0, 128, 128);

    let channel = bot.guilds.cache
      .find(channel => channel.id === config.guildID)
      .channels.cache.get(config.welcomeChannel);
    channel
      .send(
        `**${member.user.tag}**` +
        " joined the crap server",
        { files: [canvas.toBuffer()] }
      );
  } else return;
});

bot.on("message", async message => {

  if (message.author.bot) return;

  if (message.guild === null) return;

  const curxp = db.fetch(`${message.author.id}_xp`);
  const curlvl = db.fetch(`${message.author.id}_level`);

  if (curxp === null) {
    db.set(`${message.author.id}_xp`, 0);
    db.set(`${message.author.id}_level`, 1);
  }

  let content = message.content.split(" ");
  let args = content.slice(1);

  let nxtLvl =
    5 * (curlvl ** 2) +
    50 * curlvl +
    100;

  if (!config.noXP.includes(message.channel.id)) {

    if (message.guild.id === config.guildID) {

      if (message.content.toLowerCase().includes("NIGGER".toLowerCase())) {
        if (message.content.toLowerCase().includes("HTTP".toLowerCase())) return;
        let embed = new Discord.MessageEmbed()
          .setTitle(`${message.author.tag} | Warn`)
          .addField("Reason", "Bad word usage", true)
          .addField("User", message.author.tag, true)
          .addField("Channel", message.channel.name, true)
          .setThumbnail(message.author.displayAvatarURL())
          .setColor(colour)
          .setTimestamp()
          .setFooter("Podel, coded by the government of georgia", bot.user.avatarURL())
        await db.add(`badwordCount_${message.author.id}`, 1);
        message.delete().then(() => bot.guilds.cache.get(config.guildID).channels.cache.get(config.logsID).send(embed));
      }

      let badword = db.fetch(`badwordCount_${message.author.id}`);

      if (badword >= 3) {
        var muterole = message.guild.roles.cache.find((role) => role.id === config.mutedRole);
        let mutetime = "10m";
        let ms = require("ms");
        await message.member.roles.add(muterole);
        await db.delete(`badwordCount_${message.author.id}`);

        let embed = new Discord.MessageEmbed()
          .setTitle(`${message.author.tag} | Mute`)
          .addField("Reason", "Bad word usage", true)
          .addField("User", message.author.tag, true)
          .addField("Time", mutetime, true)
          .addField("Channel", message.channel.name, true)
          .setThumbnail(message.author.displayAvatarURL())
          .setColor(config.colour)
          .setTimestamp()
          .setFooter("Podel, coded by the government of georgia", bot.user.avatarURL())

        await bot.guilds.cache
          .get(config.guildID)
          .channels.cache.get(config.warningsID)
          .send(embed);

        setTimeout(function () {
          if (!message.author.roles.cache.some((role) => role.id === config.mutedRole)) return;
          let embed2 = new Discord.MessageEmbed()
            .setTitle(`${message.author.tag} | Unmute`)
            .addField("Time", mutetime, true)
            .addField("User", message.author.tag, true)
            .addField("Channel", message.channel.name, true)
            .setThumbnail(message.author.displayAvatarURL())
            .setColor(config.colour)
            .setTimestamp()
            .setFooter("Podel, coded by the government of georgia", bot.user.avatarURL())
          message.member.roles.remove(muterole);
          bot.guilds.cache.get(config.guildID).channels.cache.get(config.warningsID).send(embed2);
        }, ms(mutetime));
      }

      db.add(`${message.author.id}_xp`, 1);

      if (nxtLvl <= curxp) {

        let lvlupmsgs = db.fetch(`lvmsgs_${message.author.id}`);
        db.add(`${message.author.id}_level`, 1);

        let lvlup = new Discord.MessageEmbed()
          .setTitle(message.author.tag)
          .setColor("#9e0e24")
          .addField("PODEL LVL UP", curlvl + 1);

        if (curlvl >= 9 && curlvl < 19) {
          if (!message.member.roles.cache.some((role) => role.id === config.lvlrole1)) {
            var rolelads = message.guild.roles.cache.find((role) => role.id === config.lvlrole1);
            message.member.roles.add(rolelads);
          }
        } else if (curlvl >= 19 && curlvl < 49) {
          if (!message.member.roles.cache.some((role) => role.id === config.lvlrole2)) {
            var roleunits = message.guild.roles.cache.find((role) => role.id === config.lvlrole2);
            message.member.roles.add(roleunits);
          }
        } else if (curlvl >= 49 && curlvl < 99) {
          if (!message.member.roles.cache.some((role) => role.id === config.lvlrole3)) {
            var roleg = message.guild.roles.cache.find((role) => role.id === config.lvlrole3);
            message.member.roles.add(roleg);
          }
        } else if (curlvl >= 99 && curlvl < 499) {
          if (!message.member.roles.cache.some(role => role.id === config.lvlrole4)) {
            var rolefused = message.guild.roles.cache.find(role => role.id === config.lvlrole4);
            var roleimg = message.guild.roles.cache.find(role => role.id === config.imgperms);
            message.member.roles.add(rolefused);
            message.member.roles.add(roleimg);
          }
        }

        if (lvlupmsgs === null) {
          await message.author.send(lvlup);
        }

        if (`${lvlupmsgs}` === `on`) {
          await message.author.send(lvlup);
        }
      }
    }
  }

  const args2 = message.content.slice(prefix.length).split(/ +/);
  const commandName = args2.shift().toLowerCase();

  if (message.content.startsWith(prefix)) {
    if (Date.now() - message.member.user.createdAt < 1000*60*60*24*30) return;
    if (config.noCMD.includes(message.channel.id) && !message.member.hasPermission('MANAGE_MESSAGES')) return;
    try {
      const command2 =
        bot.commands.get(commandName) ||
        bot.commands.find(
          cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName)
        );

      if (command2 === undefined) return message.channel.send("that command doesn\'t exist");

      command2.run(bot, message, args);
    } catch (err) {
      console.log(err);
    }
  }

});
