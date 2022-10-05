const onSubmit = () => {
  fetch(`${process.env.REACT.APP.URI}/buildings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzMzYxMTExYzcwMDExNDQxN2QzMDg0OSIsInVzZXJuYW1lIjoibWFydGluIiwicGFzc3dvcmQiOiIkMmIkMTAkQ25xaFFVNEVkZHlHeFEwc0hzMUp3T0xoWDY4OHA1OC9pUXpkV0RXem43cTBYWk1nc0hua2kiLCJjcmVhdGVkQXQiOjE2NjQ0ODc2OTc2NzMsInVwZGF0ZWRBdCI6MTY2NDQ4NzY5NzY3MywiX192IjowfSwiaWF0IjoxNjY0ODA5MzEzfQ.JrrL9-imwp2QxqdTXtLSAlZThvb9pC8LMywSeFvIDSE',
    },
    body: JSON.stringify({
      name: values.name,
      buildingIdentifier: uuidv4(),
      spaces: spaces,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};
