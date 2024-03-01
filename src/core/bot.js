const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.TOKEN);

bot.start(async (ctx) => {
  const member = await ctx.telegram.getChatMember(
    "@Konsta_quote",
    ctx.from.id
  );
  if (member.status == "creator" || member.status == "administrator") {
    ctx.reply(
      `Hi <b><a href="tg://user?id=${ctx.from.id}">${ctx.from.first_name}</a></b>\nWelcome to the bot`,
      { parse_mode: "HTML" }
    );
  } else if (member.status == "member") {
    ctx.reply(
      `Dear <a href="tg://user?id=${ctx.from.id}">${ctx.from.first_name}</a>, you aren't an admin  on @Konsta_quote`
    );
  } else {
    ctx.reply("You're nobody for me!");
  }
});

bot.on("channel_post", (ctx) => {
  const message = ctx.update.channel_post;
  const channelUsername = "@Konsta_iqtiboslar";
  ctx.editMessageText(`${message.text}\n\n${channelUsername}`);
  setTimeout(() => {
    ctx.react("🔥")
  }, 60000)
});

bot.launch(() => console.log("Bot started!"));

module.exports = bot;