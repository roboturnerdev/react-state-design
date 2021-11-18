# Designing State

What needs to be a component, and which component manages which part of the state?

Trial and Error.

## Easy Best Practices

### Minimize Your State
Try to use as little data as possible in the state.

* does x change? if not, x should not be a part of the state.

* is x already captured by some other value y in state or props? get it from there instead.

### Bad Example of State Design

Person:

```bash
this.state = {
  firstName: 'Matt',
  lastName: 'Lane',
  birthday: '1955-01-08T07:37:59.711Z',
  age: 64,
  mood: 'irate'
};
```

* neither of matt's names are going to change

* birthday? won't change. unless they lie about their age.

* age does change, but if we had `this.props.birthday` we can "derive it" from that

* lastly, mood is really the only stateful candidate

### Fixed Example

Person:

```bash
console.log(this.props);
{
  firstName: 'Matt',
  lastName: 'Lane',
  birthday: '1955-01-08T07:37:59.711Z',
  age: 64
};

console.log(this.state);
{
  mood: 'insane';
}
```
State winds up only containing the least amount of data that can change or that we can't retrieve elsewhere: **mood**.


## State Should Live On The Parent

Support "downward data flow" philosophy of React.

In general, it makes more sense for a parent component to manage state and have "dumb" stateless children display components.

This makes debugging easier, state is centralized. Easier to predict where to find state:

### Is the current component stateless? Find out what is rendering it. There's the state. The parent.

## Example: Lottery

Functionality where you have 6 lottery balls with numbers, and a generate button to get new numbers.

`<Lottery />`

Should be reusable, extendable. Also have a mini one, daily lotto with 4 balls and smaller number range.

```bash
<div>
  <Lottery />
  <Lottery title="Mini Daily" numBalls={4} maxNum={10} />
</div>
```
Should be able to control the title, number of balls, and max value.

### Design

* What components will we need?

* What props will they need?

* What state will we need?

**Lottery Component**
* Props
  - title
  - numBalls
  - maxNum

Could store state, random numbers, in each Ball component. Better to use state centralized in the Lottery component parent.

* State
  - nums: array [num] for balls

* Events
  - onClick: regenerate nums in state


**LotteryBall Componsnt**
* Props
  - num: value on this ball
* State
  -none!
* Events
  -none!

Pass in the number and thats it. Display component, doesn't do anything else.

It is rerendered over and over as things change, but from the parent component.

