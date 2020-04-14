const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    })
  }
}

const feed = changeState("soil");
const hydrate = changeState("water");
const giveLight = changeState("light");
const blueFood = changeState("soil")(5)
const greenFood = changeState("soil")(10)
const yuckyFood = changeState("soil")(-5)

let plant = { soil: 0, light: 0, water: 0 };
console.log(feed(5)(plant));
console.log(greenFood(plant));

// None of this flexibility would've been possible without currying!

// We've now incorporated the following:
// - Our function is pure, does not mutate state, and has no side effects;
// - Our function is unary and takes only one argument;
// - Our function uses currying, which allows us to reuse it as a function factory;
// - Our function takes advantage of closures (because we wouldn't be able to curry without it);
// - Our function is sufficiently abstracted that it could be used with other types of objects that could be incremented or decremented as well.