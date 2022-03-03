const App = require("./App.vue");

test("adds 1 + 2 to equal 3", () => {
    expect(App.sum(1, 2)).toBe(3);
});