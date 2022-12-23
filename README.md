Reference to the unoptimized version: https://codesandbox.io/s/unoptimized-version-3rvk8z?file=/src/App.js

As one can see in the above version, whenever change is happening in any one of the attributes(city or education) of the inputFields object then one can notice that both the components City and Education are getting rerendered irrespective of the fact that only one attribute is changing.

On further analysis we found that it is happening due to 2 reasons:

1. One is because of the props which are being passed into the components i.e. city and education for both the components. If these props change then both of them get rerendered.

How to avoid this unnecessary contribution of props to the renders:

By using a higher order component from React which is called as `memo` that returns us a memoized version of the component ensuring that the component will only get rerendered whenever there is a change in the props for that particular component

```
/*This is for memoizing components City and Education*/
const MemoizedCity = memo(City);
const MemoizedEducation = memo(Education);

```

2. Now once we have memoized the components and still click on the button we notice that both the components are still getting rerendered even when only one has to be.It is happening because of the functions whose references are changing (`toggleCity` and `toggleEducation`) on the rerenders caused due to a change in state i.e `inputFields`:

How to avoid this unnecessary reference change of the functions?

It can be done by memoizing the reference of the function through useCallback Hook that takes the function to be memoized and a dependency array (which checks whether a new instance of the function should be created or not depending on whether any changes are there in the dependency array):

```js
const toggleCity = () => {
  setInputFields((inputFields) => ({
    ...inputFields,
    city: inputFields.city === "kolkata" ? "delhi" : "kolkata"
  }));
};
const toggleEducation = () => {
  setInputFields((inputFields) => ({
    ...inputFields,
    education: inputFields.education === "B.Tech" ? "MBA" : "B.Tech"
  }));
};
const memoizedToggleCity = useCallback(toggleCity, []);
const memoizedToggleEducation = useCallback(toggleEducation, []);
```

After doing these two changes and passing the same to our components and functions, we were able to get to the desired result i.e only one component should get rerendered whenever the props gets changed which you can see here (https://codesandbox.io/s/optimized-version-44dbe0).
