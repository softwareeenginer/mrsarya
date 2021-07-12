'use strict';
const Discord = require('discord.js');
const client = new Discord.Client();
const { MessageAttachment } = require('discord.js');
const config = require("./config.json");
const package_json = require("./package.json");
const prefix = config.prefix;

// Ready Bot
client.on('ready', () => {
    console.log(`Mehmet Ali'nin kızı ${client.user.tag}! sunucuya geldi.`);
    console.log(package_json)
});

client.on('message', msg => {
    if(msg.content === 'rip'){
        const attachment = new MessageAttachment('https://i.imgur.com/w3duR07.png');
        // Send the attachment in the message channel
        msg.channel.send(attachment);
    }
});

// If new person comes to server.
client.on('guildMemberAdd', member => {
    //console.log("[" + Date.now() + "] Gelen kişi : " +{member} )
    const channel = member.guild.channels.cache.find(ch => ch.name === 'kıraathaneye-hosgeldin');
    if (!channel)
        return;
    channel.send(`Sunucuya hoşgeldiniz ${member}, ben Arya. Çayımız var içersen sohbetimiz var dinlersen. Kayıt olmak için yan taraftan herhangi bir yetkiliyi etiketleyebilirsiniz. ;) İyi eğlenceler şekerim.`);
});

client.on('message', msg => {
    if (msg.content === prefix+"mehmetin-kizi") {
        msg.reply('Babamın adını ağzına alma!');
    }

    //Swearing block!
    const swear = ["mal","salak","aw","sw","aptal","eşek","esek","ananı si","oruspu","orospo","sik","s1k","anneni si"];
    const lowerCase = msg.content.toLowerCase();
    if (swear.some(word => lowerCase.includes(word)) ) {
        msg.reply("Bak küfür etme ben de sana küfür ederim!. :face_with_symbols_over_mouth:")
        msg.delete()
    }

    if (
        msg.content === "Sa" ||
        msg.content === "Merhabalar" ||
        msg.content === "selaminaleykum" ||
        msg.content === "selamunaleykum" ||
        msg.content === "sa" ||
        msg.content === "Selam" ||
        msg.content === "selam"||
        msg.content === "Merhaba" ||
        msg.content === "merhaba" ||
        msg.content === "mrb"||
        msg.content === "selamun aleykum"||
        msg.content === "Selamun Aleykum"
    ){
        msg.reply(`Merhabalar şekerim.`)
    }

    if (msg.content === prefix+"avatar") {
        msg.reply(msg.author.displayAvatarURL());
    }
});

// Kick of Bot
client.on('message', message => {
    if (!message.guild) return;
    if (message.content.startsWith(config.prefix+'at')) {
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member
                    .kick('Sebep gördüm attım. :D')
                    .then(() => {
                        message.reply(`Başarıyla tekme tokat sunucudan atıldı! ${user.tag}`);
                    })
                    .catch(err => {
                        message.reply('Hayırdır tirrek kimi atıyorsun sen?! :face_with_symbols_over_mouth: ');
                        console.error(err);
                    });
            } else {
                message.reply("Herhangi bir kişi etiketlemedin canım. ;)");
            }
        } else {
            message.reply("Üzgünüm canım yardımcı olamıyorum. Kimseyi etiketlememişsin :disappointed:");
        }
    }
});

// Ban of Bot
client.on('message', message => {
    if (!message.guild) return;
    if (message.content.startsWith(config.prefix+'ban')) {
        console.log(message.member.roles)
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member
                    .ban({
                        reason: "Bu insan gibi olan yaratıklardan çok sıkıldım ya!",
                    })
                    .then(() => {
                        message.reply(`Sunucudan bir güzel banlandı. Terbiyesiz ${user.tag}.`);
                    })
                    .catch(err => {
                        message.reply('Hayırdır gardaş kimi banluyun sen??!');
                        console.error(err);
                    });
            } else {
                message.reply("Herhangi bir kişi etiketlemedin canım. ;)");
            }
        } else {
            message.reply("Üzgünüm canım yardımcı olamıyorum. Kimseyi etiketlememişsin :disappointed:");
        }
    }
});

client.login(config.token);