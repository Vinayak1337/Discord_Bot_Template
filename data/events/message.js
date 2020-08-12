const { owners } = require('../keys/settings');
const fs = require('fs');

module.exports = (Bot, message) => {
    const msg = message;
    let prefix, command, args;
    let prefixes = JSON.parse(fs.readFileSync('./data/database/servers.csv','utf8'));
    if(!prefixes[msg.guild.id]){
        prefixes[msg.guild.id] = {
            prefix: Bot.settings.tag
        }
        prefix = prefixes[msg.guild.id].prefix;
    }
    else if(!prefixes[msg.guild.id].prefix){
        prefixes[msg.guild.id].prefix = Bot.settings.tag;
        prefix = prefixes[msg.guild.id].prefix;
    }
    else{
        prefix = prefixes[msg.guild.id].prefix;
    }
    fs.writeFile('./data/database/servers.csv', JSON.stringify(prefixes), (err) => {
        if(err){
            console.log(err);
        }
    })

    if(!msg.content.startsWith(prefix)) return;
    if(msg.author.bot) return;

    if(msg.channel.type == 'dm'){
        command = 'dm';
        args = msg.content.split(' ');
    }

    let msgArray = msg.content.split(' ');
    command = msgArray[0].slice(prefix.length);
    args = msgArray.slice(1);

    const cmd = Bot.commands.get(command) || Bot.aliases.get(command);

    if(!cmd) return;
    if(!msg.guild.me.permissions.has(['SEND_MESSAGES'])) return msg.author.send(`Dear user ${msg.author}, i don't have permission to send message in ${msg.channel}`);

    if(cmd.requirements.ownerOnly && !owners.includes(msg.author.id)) return;
    if(cmd.requirements.adminOnly && !msg.member.permissions.has(['ADMINISTRATOR'])) return msg.channel.send('This command requires admin permission');

    if(cmd.requirements.userPerms && !msg.member.permissions.has(cmd.requirements.userPerms)){
        return msg.channel.send(`You must have the following permissions: ${missingPerms(msg.member, cmd.requirements.userPerms)}`)
    }

    if(cmd.requirements.BotPerms && !msg.guild.me.permissions.has(cmd.requirements.BotPerms)){
        return msg.channel.send(`I am missing the following permissions: ${missingPerms(msg.guild.me, cmd.requirements.BotPerms)}`)
    }
    
    if(cmd.limits){
        const current = Bot.limits.get(`${command}-${msg.author.id}`);

        if(!current){
            Bot.limits.set(`${command}-${msg.author.id}`, 1);

        }else{

         if(current >= cmd.limits.rateLimit){
            return msg.channel.send(`Please wait ${cmd.limits.cooldown/1000} seconds to use this command again!`);

         }else{
             Bot.limits.set(`${command}-${msg.author.id}`, current + 1);
         }
        }

        setTimeout(() => {
            Bot.limits.delete(`${command}-${msg.author.id}`);
        },cmd.limits.cooldown);
    }

    cmd.run(Bot, msg, args);
}

const missingPerms = (member, perms) => {
    const missingPerms = member.permissions.missing(perms)
    .map(str => `\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUppercase())}\``);

    return missingPerms.length > 1 ?
    `${missingPerms.slice(0, -1).join(', ')} and ${missingPerms.slice(-1[0])}`:
    missingPerms[0];
}