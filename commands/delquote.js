const config = require('../config.json');
const fs = require('fs');

module.exports = {
    name: 'delquote',
    description: 'Deletes a quote to the quote list',
    category: 'Other',

    run: async (client, message, args, channel, tags, isMod, isOwner, settingsDir, channelName, username, prefix, send) => {
        if (isMod || config.Owners.includes(tags.username)) {
            const quoteID = message.replace(`${prefix}delquote `, '')

            try {
                // Check if the quote exists
                if (fs.existsSync(`${settingsDir}/quotes/${quoteID}.quote`)) {
                    // Delete the quote
                    fs.unlinkSync(`${settingsDir}/quotes/${quoteID}.quote`)
                    send(`Deleted quote with the id ${quoteID}`)
                } else {
                    // If the quote doesn't exist, send a message saying so
                    send('That quote does not exist!')
                }
            } catch {
                // Error handling stuff
                send('Something went wrong!')
                console.log('So uhh we have a issue here')
            }
        } else {
            send('You need to be a mod or a bot owner to run this command')
        }
    }
}