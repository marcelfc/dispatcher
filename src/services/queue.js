const Queue = require('bee-queue');
const optionsRedis = require('../config/redis')
const axios = require('axios')
const Telegraf = require('telegraf')


module.exports = app => {

    const init = async () => {

        // search queues in the database
        const queues = await app.db('dispatcher.queues')

        for (let queue of queues) {

            app.src.data.queue[queue.system] = new Queue(queue.system, optionsRedis());

            app.src.data.queue[queue.system].process((job, done) => {
                axios.get(`${job.data.url}/sistema:${job.data.system}`)
                .then(res => {
                    app.db('dispatcher.logs')
                    .insert({
                        url: job.data.url,
                        system: job.data.system,
                    })
                    .then(_ => done())
                    .catch(error => done(new Error(error)))
                    
                })
                .catch(error => {
                    app.db('dispatcher.error')
                    .insert({
                        url: job.data.url,
                        system: job.data.system,
                        error: error,
                    })
                    .then(_ => done(new Error(error)))
                    .catch(error => done(new Error(error)))
                })
                
            })

            app.src.data.queue[queue.system].on('job failed', (jobID, err) => {
                const bot = new Telegraf(process.env.TELEGRAM_KEY)
                bot.telegram.sendMessage(process.env.CHAT_ID, `queue: ${queue.system} . Job ${jobID} failed with error ${err.message}`)
                .catch(console.log(err)); 
            });
        }

    }

    return { init }
}