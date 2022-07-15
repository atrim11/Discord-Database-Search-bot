// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let question = context.params.event.content.replace('!add', '').split('answer:')[0].trim()
let answer = context.params.event.content.split('answer:')[1].trim()

await lib.googlesheets.query['@0.3.0'].insert({
  range: `A:C`,
  fieldsets: [
    {
      'Question': question,
      'Answer': answer
    }
  ]
});

await lib.discord.channels['@0.3.0'].messages.create({
  channel_id: context.params.event.channel_id,
  content: `your response has been recorded! Thank you`
});
