const ApiBuilder = require('claudia-api-builder')
const selectShortening = require('../db/selectShortening')
const slugToId = require('../slugToId')

exports.handler = async event => {
  const { slug } = event.pathParameters
  if (!slug) {
    throw new Error()
  }
  const id = slugToId(slug)
  const initialUrl = await selectShortening(id)
  return new ApiBuilder.ApiResponse(
    {
      cake: '🍰',
      id,
      initialUrl,
      shorterUrl: 's.ajla.ng/' + slug
    },
    { Location: initialUrl },
    301
  )
}

exports.mount = api => {
  api.get('/{slug}', exports.handler)
}
