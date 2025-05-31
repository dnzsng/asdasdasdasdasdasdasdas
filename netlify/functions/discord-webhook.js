const fetch = require("node-fetch");

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1378225395308036166/kGex7ehA5SeYvzveKBUmA8MUzCRxLmquDpXyKceXQTy_M_9dbNMkm7ZJIUNfAe75TTls"; // Buraya kendi Discord webhook URL'nı koy

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);

    const embed = {
      embeds: [
        {
          title: `**${data.title}**`,
          description: data.description,
          color: 0x800080,
          fields: [
            {
              name: "**Game Info**",
              value:
                `**Name**: ${data.title}\n` +
                `**Game Link:** [Link](${data.gameLink})\n` +
                `**Join Link:** [Join](${data.joinLink})\n` +
                `**Active Players**: \`${data.activePlayers}\`\n` +
                `**Server Players**: \`${data.serverPlayers}/${data.maxPlayers}\`\n` +
                `**Total Visits**: \`${data.totalVisits}\``,
              inline: true
            },
            {
              name: "**Creator Info**",
              value:
                `> [Profile](https://roblox.com/users/${data.creatorId}/profile)\n` +
                `> **Universe ID**: \`${data.universeId}\``,
              inline: true
            },
            {
              name: "**Settings**",
              value:
                `> **Rig Type**: ${data.rigType}\n` +
                `> **API Access**: ${data.apiAccess}\n` +
                `> **Copying**: ${data.copying}`,
              inline: true
            }
          ],
          timestamp: data.timestamp
        }
      ]
    };

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(embed)
    });

    if (!response.ok) {
      return { statusCode: 500, body: "Failed to send webhook" };
    }

    return { statusCode: 200, body: "Webhook sent successfully" };
  } catch (err) {
    return { statusCode: 500, body: "Error: " + err.message };
  }
};
