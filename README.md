# jupita-agent-web-typescript

## Table of contents

### Intantiating an agent

```ts
const agent = new Agent(<token>, <agent id>)
```

### Example of using the dump function

```ts
agent.dump(
  {
    clientId: 1,
    type: 0,
    text: 'hello',
    isCall: false,
  },
  {
    onSuccess(msg, utterance) {
      // code to run on success
    },
    onError(statusCode, response) {
      // code to run on error
    },
  }
);
```

### Example of using the feed function

```ts
agent.feed({
  onSuccess(week) {
    // code to run on success
  },
  onError(statusCode, response) {
    // code to run on error
  },
});
```

### Example of using the rating function

```ts
agent.rating('JupitaV1', {
  onSuccess(rating) {
    // code to run on success
  },
  onError(statusCode, response) {
    // code to run on error
  },
});
```
