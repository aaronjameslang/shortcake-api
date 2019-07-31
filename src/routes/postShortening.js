const ApiBuilder = require('claudia-api-builder')
const URL = require('url').URL
const idToSlug = require('../idToSlug')
const insertShortening = require('../db/insertShortening')

exports.handler = async event => {
  const body = JSON.parse(event.body)
  const { initialUrl } = body
  try {
    // eslint-disable-next-line no-new
    new URL(initialUrl)
  } catch (e) {
    console.log(e)
    return new ApiBuilder.ApiResponse(
      {
        cake: null,
        errorMessage: 'The URL provided may be invalid. Be sure to specify the protocol.'
      },
      {},
      400
    )
  }
  const id = await insertShortening(initialUrl)
  const slug = idToSlug(id)
  return new ApiBuilder.ApiResponse(
    {
      cake: '🍰',
      id,
      initialUrl,
      shorterUrl: 's.ajla.ng/' + slug
    },
    { Location: '//s.ajla.ng/shortening/' + slug },
    201
  )
}

exports.mount = api => {
  api.post('/shortening', exports.handler)
}
