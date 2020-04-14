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
console.log(plant);

// None of this flexibility in the code above would've been possible without currying!

// We've now incorporated the following:
// - Our function is pure, does not mutate state, and has no side effects;
// - Our function is unary and takes only one argument;
// - Our function uses currying, which allows us to reuse it as a function factory;
// - Our function takes advantage of closures (because we wouldn't be able to curry without it);
// - Our function is sufficiently abstracted that it could be used with other types of objects that could be incremented or decremented as well.



let initialState = { soil: 10, light: 0, water: 0 };

// The only job of the outer function is to store the currentState of an object.
const storeState = (initialState) => {
  let currentState = initialState; // The currentState of an object will be initialized as a {}. Note that we use let because the currentState will be mutated each time the inner function is called.
  return (stateChangeFunction) => { // Our outer function returns an anonymous inner function that takes one parameter called stateChangeFunction. This inner function will take a function as an argument. We can do this because functions are first-class citizens in JavaScript. The function that we pass in will specify the exact change that should be made to currentState.
    const newState = stateChangeFunction(currentState); // will take the function we pass in as an argument and then call it on currentState. Instead of mutating currentState, we will save the new state in a constant called newState.
    currentState = {...newState}; // Now it's time to break the rules. We are going to need to update the currentState. We will make a copy of newState and assign it to currentState.
    return newState;
  }
}

const stateChanger = storeState(initialState);
const fedPlant = stateChanger(blueFood);
console.log(fedPlant);

// Here's what just happened:
// - We passed in the variable blueFood into stateChanger. This invokes the inner function inside storeState(). (Be careful here - we don't want to pass in blueFood() because we don't want the function to be invoked yet!)
// blueFood is passed in as an argument for the stateChangeFunction parameter. Now const newState = blueFood(currentState);.

const plantFedAgain = stateChanger(greenFood);
console.log(plantFedAgain);