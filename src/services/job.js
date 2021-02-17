const nodeCron = require('node-cron')
const Telegraf = require('telegraf')

module.exports = app => {

    const init = async () => {

        // search queues in the database
        const crons = await app.db('dispatcher.crons')
            .join('dispatcher.queues', 'crons.id_queue', 'queues.id')
            .select('crons.id', 'crons.description', 'crons.url', 'crons.period', 'queues.system')

        for (let cron of crons) {
            const newJob = nodeCron.schedule(`${cron.period}`, () => {
                try {
                    app.src.data.queue[cron.system].createJob({
                        ...cron
                    }).save()

                } catch (error) {
                    const bot = new Telegraf(process.env.TELEGRAM_KEY)
                    bot.telegram.sendMessage(process.env.CHAT_ID, `queue: ${cron.system} . Impossible register Job. Error: ${error}`)
                        .catch(console.log(err));
                }
            });
            newJob.start()
        }
    }

    return { init }
}