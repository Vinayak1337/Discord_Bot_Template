const Discord = require('discord.js');

module.exports.run = (Bot, msg, args) => {
    const tcategory = msg.guild.channels.cache.get('MODMAIL_CATEGORY_ID'); 
    if (msg.channel.parent == tcategory) {
        const tuser = Bot.users.cache.get(msg.channel.name);
        const em = new Discord.MessageEmbed()
        .setTitle("Ticket Closed")   
        .setColor("BLUE")    
        .setDescription('The ticket has been closed by  the support team, for any help in future feel free to message here.') 
        .setTimestamp();  
        msg.channel.send(em);  
        tuser.send(em);
        msg.channel.send("Deleting channel in 10 seconds..")
        setTimeout(function(){        
            msg.channel.delete()
            .then(console.log)
            .catch(console.log);
        }, 10000);
    } else {
        const em = new Discord.MessageEmbed()    
        .setColor("#FF0000")  
        .setDescription("This is not a ticket!");
        msg.channel.send(em);
    }
}

module.exports.help = {
    name: 'close',
    description: 'Ticket channel delete/close command!',
    aliases: []
}

module.exports.requirements = {
    userPerms: [],
    BotPerms: ['MANAGE_CHANNEL','MANAGE_SERVER'],
    ownerOnly: false,
    adminOnly: false
}