const Discord = require('discord.js');

module.exports.run = (Bot, msg, args) => {
    const role = msg.guild.roles.cache.get(args[0]) || msg.guild.members.cache.get(args[0]);
    if(!role){
        msg.channel.send(msg.author,Bot.errEm.setDescription(`Role or User with id ${args[0]} not found!`));
    }
    msg.guild.channels.cache.forEach(ch => {
        ch.updateOverwrite(role,{
            VIEW_CHANNEL: false
        })
        .catch(err => {
            if(err){
                console.log(err);
            }
        });
    })
}

module.exports.help = {
    name: 'deny',
    description: 'Deny a role to be able to view every channel & deny send messages',
    aliases: []
    //command name identifier
}

module.exports.requirements = {
    userPerms: [],
    BotPerms: ['MANAGE_ROLES','MANAGE_SERVER'],
    ownerOnly: false,
    adminOnly: true
    //Requirements
}

module.exports.limits ={
    rateLimit: 1,
    cooldown: 10e3
}