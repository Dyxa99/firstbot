const { Telegraf } = require("telegraf");
require("dotenv").config();
const { apiUrl } = require("../data/urls.json");

const bot = new Telegraf(process.env.token);

bot.start((msg) => msg.reply("Привіт. Я можу надати актуальний курс валют. Для цього натисніть /exch."));


bot.help((msg) => msg.reply("/exch sum from to - отримати курс валют."));

bot.command("/exch", async (msg) => {
    const { text } = msg.message
    const [sum, from, to] = text.split(" ");
    const response = await fetch(`${apiUrl}v6/${process.env. apikey}/latest/${from}`)

    console.log(await response.json())

    msg.reply(sum * conversion_rates[to])
})




bot.launch(() => console.log("Start"))
