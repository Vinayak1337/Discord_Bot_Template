const Discord = require('discord.js');

module.exports.run = (Bot, msg, args) => {

    msg.guild.channels.cache.forEach(ch => {

        if(ch.viewable && ch.manageable){

        if(ch.type == 'category'){
            category(ch);

        }else{
            text(ch);
        }
    }
    })

    function text(ch){
        if(!ch.name.startsWith('┃')){
            ch.edit({name:'┃'+ch.name})
            .catch(err => {
                if(err){
                    console.log(err);
                }
            })
        }
    }

    function category(ch){
        if(!ch.name.startsWith('❯❯')){
            if(ch.name.startsWith('❯')){

                ch.edit({name:'❯'+ch.name})
                .catch(err => {
                    if(err){
                        console.log(err);
                    }
                })

            }else{

                ch.edit({name:'❯❯'+ch.name})
                .catch(err => {
                    if(err){
                        console.log(err);
                    }
                })
            }
        }
    }

    msg.channel.send('Done!');
}

module.exports.help = {
    name: 'updatechannels',
    description: 'Command file template!',
    aliases: ['uch']
}

module.exports.requirements = {
    userPerms: [],
    BotPerms: [],
    ownerOnly: false,
    adminOnly: true
}

module.exports.limits ={
    rateLimit: 1,
    cooldown: 5e3
}

