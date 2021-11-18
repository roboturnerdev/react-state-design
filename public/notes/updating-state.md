# Updating State

React State Patterns.

* Learn how to update state based off of existing state values.

* Properly manage state updates for mutable data structures.

* Best practices for modeling state and designing the components.

Rules of thumb, things to keep in mind when working with state.

## Setting State Using State

```bash
	this.setState({score: this.state.score + 1}); // this will work but is a bad idea
```

You do not want to update the state to update *dependent* on the previous state.

To Illustrate Why:

```bash
	this.setState({score: this.state.score + 1});
	this.setState({score: this.state.score + 1}); 
	this.setState({score: this.state.score + 1});
```
* setState() is async, risky to presume previous call has finished when doing this. also, React sometimes batch calls of setState together into one for performance reasons.

* if a call to setState() depends on current state, the safest thing is to use the alternate "callback form"

**Alternate Callback Form** `this.setState(callback)`

> instead of passing an object, pass in a callback fn w current state as parameter. callback should return an object representing new state.

```bash
this.setState(curState => ({ count: curState.count + 1 }));
```
Doing this with the Callback it will not batch together and will increase by 3 successfully.

## Abstracting State Updates

Passing function to this.setState lends itself to more advanced pattern called **functional setState**.

Basically describe your state updates abstractly as separate functions, but . . .

### Why would you do this?

> because testing your state changes is as simple as testing a plain function:
```bash
expect(incrementCounter({ count: 0 })).toEqual({ count: 1 });
```
> This is a common pattern in **Redux**.

```bash
# elsewhere in the code
function incrementCounter(prevState) {
  return { count : prevState.count + 1 };
}

# in the component
this.setState(incrementCounter);
```
It's a good practice for cleaning up code, not always used or needed.

## Mutable Data Structures in State

When component state includes objects, arrays, and arrays of objects instead of just primitives.

You **must** be careful modifying array of objects.

> Mutating nested data structures in your state can cause problems with React. Lifecycle methods, reconciliation. Even if you get away with it, you do not want to do that as it may fail.
<br>

Example:

```bash
completeTodo(id) {
	const newTodos = this.state.todos.map(todo => {
  	  if (todo.id === id) {
	    // make a copy of the todo object with done -> true
    	    return { ...todo, done: true };
  	  }
  	  return todo; // old todos can pass through
	});

	this.setState({
	  todos: newTodos // setState to the new array
	});
}
 
```
* Use map to return the array of affected items

* If we find the right id, we are going to return a **new object**. It is spread from todo, and then done set true.

* Before, we were just changing existing value (THE BAD WAY)

* Finally setState with the newTodos array.

A much better way is to make a new copy of the data structure. We need to use a **pure function** to do this.

### Pure Function

* .map
* .filter
* .reduce
* ...spread

> BAD: reference to current array and update or add item

> GOOD: copy entire array into a new array and add item to the new array, then set state with new array.

One of the reasons why people hesitate to think this way is,

### Isn't that inefficient? Making all the copies?

**Yes.** Slightly, due to the O(N) space/time required to make a copy. However, its almost always worth it to ensure that the app doesn't have hard to detect bugs due to side effects of the bad logic.

# Recap

Old one, copy it, change it (remove it, add it, update), then use that new one to setState. 

This is a good habit for React because it's *required* for Redux.














