# any-code
## ResetComposition.js usage

```
const isSuccess = ref(false);

const messageInfo = reactive({
    content: '',
    fromUser: {
        id: '',
        name: '',
    }
});


const resetComposition = new ResetComposition(isSuccess, messageInfo);
// or
// const resetComposition = new ResetComposition({isSuccess, messageInfo});

// reset
resetComposition.reset();
```
