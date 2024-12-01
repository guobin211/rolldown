import { defineTest } from '@tests'
import { expect, vi } from 'vitest'

const fn = vi.fn()

export default defineTest({
  config: {
    output: {
      banner(chunk) {
        fn('config.banner', chunk.modules['\0module'].code)
        return ''
      },
    },
    plugins: [
      {
        resolveId(id) {
          if (id === '\0module') {
            return id
          }
        },
        load(id) {
          if (id === '\0module') {
            return `export default '[ok]'`
          }
        },
        renderChunk(_, chunk) {
          fn('plugin.renderChunk', chunk.modules['\0module'].code)
        },
        banner(chunk) {
          fn('plugin.banner', chunk.modules['\0module'].code)
          return ''
        },
      },
    ],
  },
  afterTest(output) {
    expect(fn.mock.calls).toEqual(
      expect.arrayContaining([
        ['config.banner', expect.stringContaining('[ok]')],
        ['plugin.banner', expect.stringContaining('[ok]')],
        ['plugin.renderChunk', expect.stringContaining('[ok]')],
      ]),
    )
    expect(output.output[0].modules['\0module'].code).toContain('[ok]')
  },
})
