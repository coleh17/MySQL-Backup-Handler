export {};
const Backup = require('../src/index');

test("MySQL Validation", () => {
    let b = new Backup({ host: "test", user: "test", password: "test", database: "test" });
    expect(b.mySqlConfig.host).toBe("test");
})

test("MySQL Invalid Validation, missing fields", () => {
    let b = new Backup({});
    expect(b.mySqlConfig).toBe(undefined);
    let c = new Backup({ host: "test", user: "test", database: "test" });
    expect(c.mySqlConfig).toBe(undefined);
})

test("MySQL Invalid Validation, invalid field", () => {
    let b = new Backup({ host: "test", user: "test", database: "test", test: "test" });
    expect(b.mySqlConfig).toBe(undefined);
    let c = new Backup({ host: "test", user: "test", password: "test", database: "test", test: "test" });
    expect(c.mySqlConfig).toBe(undefined);
    let d = new Backup({ test: "test" });
    expect(d.mySqlConfig).toBe(undefined);
})

test("MySQL Invalid Validation, missing field types", () => {
    let b = new Backup({ host: "test", user: false, password: "test", database: 543 })
    expect(b.mySqlConfig).toBe(undefined);
})