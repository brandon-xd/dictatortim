const { Collection, GuildChannel } = require("discord.js");
const { Events } = require("discord.js");
const OverwatchStartTimes = new Collection();

const OverwatchStartMessages = [
  "bro {user}, what are you doing?",
  "Look who's playing Overwatch! It's {user}, what a loser",
  "{user}, what the fudge bro?",
  "I'm so disappointed in you, {user}",
  "{user}... what a disappointment",
  "{user}... yikes bro. couldn't be me",
];

const OverwatchStopMessages = [
  "Thank God, {user} stopped playing Overwatch",
  "Haha, good prank {user}, I almost fell for it!",
  "{user} stopped playing Overwatch after {time}. Congratulations!",
  "Good job quitting your career of being cringe, {user}!",
  "{user} wasted {time} of their life playing Overwatch! LOL!",
  "Those {time} are gone forever, hope you're proud of yourself {user}!",
];

const OverwatchHourMessages = [
  "Okay {user}, you can stop trolling now.",
  "{user} could have just hit the gym for the last hour...",
  "haha okay kiddos, pranks over, you can turn it off now",
  "lmao okay {user}, you got me! lets stop being cringe now",
];

const OverwatchTwoHourMessages = [
  "Stop it, stop it, STOP ITTTTT. STOP PLAYING OVERWATCH!!",
  "son of  FJAIOFWESASD;THFCHASDH!!!!!! TURN OFF OVERWATCH NOWWWWW",
  "{user} is dead to me.",
  "This stopped being funny an two hours ago.",
];

const OverwatchFiveHourMessages = [
  "{user} has been playing overwatch for five hours! Congrats!",
  "okay everyone make sure to congratulate {user} on forever being a LOSER",
];

module.exports = {
  name: Events.PresenceUpdate,
  execute(oldPresence, newPresence) {
    const channel = newPresence.guild.channels.cache.get("1110247534498160820");

    const oldActivity = oldPresence?.activities.find((activity) => activity.name.toLowerCase().includes("overwatch"));
    const newActivity = newPresence?.activities.find((activity) => activity.name.toLowerCase().includes("overwatch"));

    // If user starts playing Overwatch
    if (!oldActivity && newActivity) {
      console.log(`${newPresence.user.tag} started playing Overwatch`);
      OverwatchStartTimes.set(newPresence.member.id, Date.now());
      const randomMessage = OverwatchStartMessages[Math.floor(Math.random() * OverwatchStartMessages.length)];
      const message = randomMessage.replace("{user}", `<@${newPresence.member.user.id}>`);
      channel.send(message);
    }

    // If user stops playing Overwatch
    if (oldActivity && !newActivity) {
      console.log(`${newPresence.user.tag} stopped playing Overwatch`);
      OverwatchStartTimes.delete(newPresence.member.id);
      const randomMessage = OverwatchStopMessages[Math.floor(Math.random() * OverwatchStopMessages.length)];
      const message = randomMessage.replace("{user}", `<@${newPresence.member.user.id}>`);
      channel.send(message);
    }

    // If user has been playing Overwatch for an hour
    if (newActivity && Date.now() - OverwatchStartTimes.get(newPresence.member.id) > 3600000) {
      console.log(`${newPresence.user.tag} has been playing Overwatch for an hour`);
      const randomMessage = OverwatchHourMessages[Math.floor(Math.random() * OverwatchHourMessages.length)];
      const message = randomMessage.replace("{user}", `<@${newPresence.member.user.id}>`);
      channel.send(message);
    }

    // If user has been playing Overwatch for two hours
    if (newActivity && Date.now() - OverwatchStartTimes.get(newPresence.member.id) > 7200000) {
      console.log(`${newPresence.user.tag} has been playing Overwatch for two hours`);
      const randomMessage = OverwatchTwoHourMessages[Math.floor(Math.random() * OverwatchTwoHourMessages.length)];
      const message = randomMessage.replace("{user}", `<@${newPresence.member.user.id}>`);
      channel.send(message);
    }

    // If user has been playing Overwatch for five hours
    if (newActivity && Date.now() - OverwatchStartTimes.get(newPresence.member.id) > 18000000) {
      console.log(`${newPresence.user.tag} has been playing Overwatch for five hours`);
      const randomMessage = OverwatchFiveHourMessages[Math.floor(Math.random() * OverwatchFiveHourMessages.length)];
      const message = randomMessage.replace("{user}", `<@${newPresence.member.user.id}>`);
      channel.send(message);
    }
  },
};
