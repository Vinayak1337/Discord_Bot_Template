module.exports = (Bot) => {
    console.log(`Logged in as ${Bot.user.tag}`);
    x = 0;
    setInterval(function(){
        switch(x){
            case 0:{
                Bot.user.setPresence({status: 'online', activity:{name: `やᴀɴᴅᴀ's stream`, type: 'WATCHING'}})
            }break;

            case 1:{
                Bot.user.setPresence({status: 'idle', activity: {name: 'Dm me for help!', type: 'PLAYING'}})
            }break;

            case 2:{
                Bot.user.setPresence({status: 'dnd', activity: {name: '#やᴀɴᴅᴀやack', type: 'LISTENING'}})
            }break;

            case 3:{
                Bot.user.setPresence({status: 'dnd', activity: {name: 'panda_bs on twitch', type: 'STREAMING',url: 'https://www.twitch.tv/panda_bs_'}})
            }break;

            default: {
                x = 0;
            }
            
        }
        x++
    },10000)
}