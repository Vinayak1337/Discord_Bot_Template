const Discord = require('discord.js');

module.exports.run = (Bot, msg, args) => {
    const text = args;
    text.shift();
    const tcategory = msg.guild.channels.cache.get('MODMAIL_CATEGORY_ID'); 
    if(msg.channel.parent == tcategory){
        const tuser = Bot.users.cache.get(msg.channel.name);
        const em = new Discord.MessageEmbed()
                .setTitle("Support Reply")    
                .setColor("BLUE")    
                .setDescription(text.join(' '))
                .setTimestamp();
        msg.channel.send(em);    
        tuser.send(em);
    }
    else{
        const em = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setDescription("This is not a ticket!");   
        msg.channel.send(em);
    }
}

module.exports.help = {
    name: 'reply',
    description: 'Modmail reply command, inside a ticket!',
    aliases: []
    
}

module.exports.requirements = {
    userPerms: [],
    BotPerms: ['SEND_MESSAGES','MANAGE_GUILD'], 
    ownerOnly: false,
    adminOnly: false
}
