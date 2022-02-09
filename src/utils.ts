/**
 * Helper method to determine if URL is a valid discord.com webhook URL
 * @param url Webhook URL
 * @returns boolean if URL is a valid webhook URL
 */
export function isValidWebhookURL(url: string): boolean {
    var pattern = new RegExp('^(https:\/\/discordapp.com\/api\/webhooks\/[0-9]{17,20}\/[a-z,A-Z,0-9,_]{60,75})');
    return pattern.test(url);
}