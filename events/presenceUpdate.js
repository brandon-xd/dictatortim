const { Collection, Events } = require("discord.js");
const { quarantineChannelId } = require("../config.json"); // replace with your channel ID
const {
  OverwatchStartMessages,
  OverwatchStopMessages,
  OverwatchHourMessages,
  OverwatchTwoHourMessages,
  OverwatchFiveHourMessages,
} = require("../assets/activityMessages");
const OverwatchStartTimes = new Collection();
const OverwatchMessagesSent = new Collection();

function startOverwatchTrackingInterval(client) {
  setInterval(() => {
    const now = Date.now();

    OverwatchStartTimes.forEach((startTime, memberId) => {
      const elapsedTime = now - startTime;
      const user = client.guilds.cache.map((guild) => guild.members.cache.get(memberId)).find((member) => member);
      const currentActivity = user?.presence?.activities.find((activity) =>
        activity.name.toLowerCase().includes("overwatch")
      );
      const channel = client.channels.cache.get(quarantineChannelId); // Set to the channel ID you want to send messages to

      console.log(`Checking user with ID ${memberId} with time ${elapsedTime} and activity ${currentActivity}`);

      if (!currentActivity) {
        return; // User is no longer playing Overwatch
      }

      const messagesSent = OverwatchMessagesSent.get(memberId) || { hour: false, twoHour: false, fiveHour: false };

      // 1 hour
      if (elapsedTime > 3600000 && !messagesSent.hour) {
        console.log(`User with ID ${memberId} has been playing Overwatch for an hour`);
        const randomMessage = OverwatchHourMessages[Math.floor(Math.random() * OverwatchHourMessages.length)];
        let message = randomMessage
          .replace("{user}", `<@${memberId}>`)
          .replace("{time}", `${Math.floor(elapsedTime / 60000)} minutes`);
        channel.send(message);
        messagesSent.hour = true;
      }

      // 2 hours
      if (elapsedTime > 7200000 && !messagesSent.twoHour) {
        console.log(`User with ID ${memberId} has been playing Overwatch for two hours`);
        const randomMessage = OverwatchTwoHourMessages[Math.floor(Math.random() * OverwatchTwoHourMessages.length)];
        let message = randomMessage
          .replace("{user}", `<@${memberId}>`)
          .replace("{time}", `${Math.floor(elapsedTime / 60000)} minutes`);
        channel.send(message);
        messagesSent.twoHour = true;
      }

      // 5 hours
      if (elapsedTime > 18000000 && !messagesSent.fiveHour) {
        console.log(`User with ID ${memberId} has been playing Overwatch for five hours`);
        const randomMessage = OverwatchFiveHourMessages[Math.floor(Math.random() * OverwatchFiveHourMessages.length)];
        let message = randomMessage
          .replace("{user}", `<@${memberId}>`)
          .replace("{time}", `${Math.floor(elapsedTime / 60000)} minutes`);
        channel.send(message);
        messagesSent.fiveHour = true;
      }

      OverwatchMessagesSent.set(memberId, messagesSent);
    });
  }, 60000); // Check every minute (60000 milliseconds)
}

module.exports = {
  name: Events.PresenceUpdate,
  OverwatchStartTimes,
  OverwatchMessagesSent,
  startOverwatchTrackingInterval,
  execute(oldPresence, newPresence) {
    const channel = newPresence.guild.channels.cache.get(quarantineChannelId);

    const oldActivity = oldPresence?.activities.find((activity) => activity.name.toLowerCase().includes("overwatch"));
    const newActivity = newPresence?.activities.find((activity) => activity.name.toLowerCase().includes("overwatch"));

    // If user starts playing Overwatch
    if (!oldActivity && newActivity) {
      console.log(`${newPresence.user.tag} started playing Overwatch`);
      OverwatchStartTimes.set(newPresence.member.id, Date.now());
      OverwatchMessagesSent.set(newPresence.member.id, { hour: false, twoHour: false, fiveHour: false });
      const randomMessage = OverwatchStartMessages[Math.floor(Math.random() * OverwatchStartMessages.length)];
      let message = randomMessage.replace("{user}", `<@${newPresence.member.user.id}>`);
      channel.send(message);
    }

    // If user stops playing Overwatch
    if (oldActivity && !newActivity) {
      console.log(`${newPresence.user.tag} stopped playing Overwatch`);
      const startTime = OverwatchStartTimes.get(newPresence.member.id);
      const time = Date.now() - startTime;
      const randomMessage = OverwatchStopMessages[Math.floor(Math.random() * OverwatchStopMessages.length)];

      let message = randomMessage
        .replace("{user}", `<@${newPresence.member.user.id}>`)
        .replace("{time}", `${Math.floor(time / 60000)} minutes`);
      channel.send(message);
      OverwatchStartTimes.delete(newPresence.member.id);
      OverwatchMessagesSent.delete(newPresence.member.id);
    }
  },
};
