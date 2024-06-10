module.exports = {
  name: "messageCreate",
  execute(message) {
    if (message.author.bot) return;

    const responsesConfigs = [
      {
        keywords: ["overwatch", "ow2", "overwatch2", " ow "],
        responses: [
          "I hate Overwatch 2!",
          "Overwatch 2 is the worst game ever!",
          "Overwatch 2 is trash!",
          "What did you just say!?!?",
          "Overwatch is the WORST game I have ever played.",
          "Can overwatch even be considered a game?",
        ],
      },
      {
        keywords: ["dark souls", "elden ring", "from software", "fromsoft", "from soft", "soulsborne"],
        responses: [
          "Dark Souls is BASED!",
          "Dark Souls is the best game ever!",
          "I love Dark Souls!",
          "Praise the sun!",
          "From Software is the best!",
          "Elden Ring is the best game ever!",
        ],
      },
      {
        keywords: ["sekiro"],
        responses: ["Sekiro is the best game ever!", "I love Sekiro!"],
      },
      {
        keywords: [
          "where's timmy",
          "where is timmy",
          "where's tim?",
          "where's tommy",
          "where is tim?",
          "where is tommy",
          "wheres timmy",
          "wheres tim",
        ],
        responses: [
          "I'm watching youtube right now",
          "What's up?",
          "What do you want?",
          "I'm just enjoying my favorite pepsi beverage right!",
        ],
      },
      {
        keywords: ["timmy sucks at overwatch", "timmy sucks at ow", "timmy sucks at ow2"],
        responses: ["..."],
      },
      {
        keywords: [
          "bye timmy",
          "goodbye timmy",
          "bye tim",
          "goodbye tim",
          "bye tommy",
          "goodbye tommy",
          "cya tommy",
          "cya timmy",
          "goodnight tim",
        ],
        responses: ["Peace", "ttyl"],
      },
      {
        keywords: ["timmy", "tim", "tommy"],
        responses: ["What's up?", "What do you want?", "Yo did you call me?"],
      },
      {
        keywords: ["want to game", "want to play", "gamers", "gaymers", "wanna game", "wanna play"],
        responses: [
          "I'm watching youtube right now",
          "I'm tired",
          "I'm busy right now",
          "You guys can game but NO OVERWATCH ALLOWED!",
        ],
      },
      {
        keywords: ["grind"],
        responses: [
          "The only thing you need to grind is the fucking gym",
          "grind? I hope you losers are talking about the gym",
        ],
      },
      {
        keywords: ["dictator"],
        responses: ["💪😎🤳"],
      },
    ];

    for (const { keywords, responses } of responsesConfigs) {
      if (keywords.some((keyword) => message.content.toLowerCase().includes(keyword))) {
        // Select a random response from the array of possible responses
        const response = responses[Math.floor(Math.random() * responses.length)];
        // Send the selected response
        message.channel.send(response);
        break; // Stop checking after the first match
      }
    }
  },
};
