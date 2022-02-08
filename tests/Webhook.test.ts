export {};
const Backup = require('../src/index');

const validURL_1 = 'https://discordapp.com/api/webhooks/00000000000000000/00000000000000000000000000000000000000000000000000000000000000000000';
const validURL_2 = 'https://discordapp.com/api/webhooks/00000000000000001/00000000000000000000000000000000000000000000000000000000000000000001';
let b = new Backup({ host: "test", user: "test", password: "test", database: "test" });

test("Webhook test", () => {
    expect(b.getWebhook()).toBe(undefined);
    b.setWebhook(validURL_1);
    expect(b.getWebhook()).toBe(validURL_1);
    b.setWebhook(validURL_2);
    expect(b.getWebhook()).toBe(validURL_2);
})

test("Webhook test, invalid link", () => {
    b.setWebhook("");
    expect(b.getWebhook()).toBe(validURL_2);
    b.setWebhook("hi there");
    expect(b.getWebhook()).toBe(validURL_2);
    b.setWebhook("https://google.com");
    expect(b.getWebhook()).toBe(validURL_2);
    b.setWebhook("https://discordapp.com/api/webhooks/00000000000000001/");
    expect(b.getWebhook()).toBe(validURL_2);
    b.setWebhook("https://discordapp.com/api/webhooks/00000000000000001/34987539845");
    expect(b.getWebhook()).toBe(validURL_2);
})