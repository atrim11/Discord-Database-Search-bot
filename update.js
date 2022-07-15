// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let question = context.params.event.content.replace('!update', '').split('answer:')[0].trim()
let answer = context.params.event.content.split('answer:')[1].trim()

let result = await lib.googlesheets.query['@0.3.0'].update({
  range: `A:C`, // required
  bounds: 'FIRST_EMPTY_ROW',
  where: [
    {
      'Question__contains': question
    }
  ],
  limit: {
    'count': 0,
    'offset': 0
  },
  fields: {
    'Answer': answer
  }
});

await lib.discord.channels['@0.3.0'].messages.create({
  channel_id: context.params.event.channel_id,
  content: `The spreadsheet has been updated. Thank you!`
});
