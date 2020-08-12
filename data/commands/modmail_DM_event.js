const Discord = require('discord.js');

module.exports.run = (Bot, msg, args) => {
(async () => {

    if(msg.channel.type == 'dm'){
    const textt = msg.content;
    const tserver = Bot.guilds.cache.get('SERVER_ID');
    const tcategory = tserver.channels.cache.get('MODMAIL_CATEGORY_ID');
    if(!tserver.channels.cache.some(c => c.parent == tcategory && c.name.includes(msg.author.id))) {
    const tchannel = await tserver.channels.create(msg.author.id, {
    type: 'text',
    parent: tcategory            
    })
    .catch(err => {
        if(err){
            console.log(err);
        }
    })

    const emb = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription("Thank you for contacting the support team, support will Reply you shortly.");
            msg.author.send(msg.author,emb);
    const em = new Discord.MessageEmbed()
           .setTitle("New Ticket ")
           .setAuthor(msg.author.tag, msg.author.displayAvatarURL({dynamic:true}))
           .setColor("BLUE")
           .setDescription(textt)
           .setTimestamp();
           tchannel.send(msg.author,em); // tchannel.send('<@&roleID>',em) to Send Embed with mentioning role!
    }
    else{
    const tchannel = tserver.channels.cache.find(c => c.name.includes(msg.author.id))
    const em = new Discord.MessageEmbed()            
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL({dynamic:true}))            
    .setColor("BLUE")        
    .setDescription(textt)           
    .setTimestamp();           
    tchannel.send(em);
    }
  }
  return;
  
})();

}

module.exports.help = {
    name: 'dm',
    description: 'This is not a command, its an event which triggers whenever someone DMs the Bot',
    aliases: []
}

module.exports.requirements = {
    userPerms: [],
    BotPerms: ['MANAGE_CHANNELS','MANAGE_GUILD'],
    ownerOnly: false,
    adminOnly: false
}