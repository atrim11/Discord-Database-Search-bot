// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let question = context.params.event.content.split(' ').slice(1).join(' ')

await lib.googlesheets.query['@0.3.0'].delete({
  range: `A:C`,
  bounds: 'FIRST_EMPTY_ROW',
  where: [
    {
      'Question__is': question
    }
  ],
  limit: {
    'count': 0,
    'offset': 0
  }
});

await lib.discord.channels['@0.3.0'].messages.create({
  channel_id: context.params.event.channel_id,
  content: `The item has been deleted. Thank you!`
});
