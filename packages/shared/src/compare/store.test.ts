import { beforeEach, describe, expect, it } from 'vitest'
import { selectCompareReady, selectIsCompared, useCompareStore } from './store'

const bulbasaur = { id: 1, name: 'bulbasaur', image: '' }
const charmander = { id: 4, name: 'charmander', image: '' }
const squirtle = { id: 7, name: 'squirtle', image: '' }

describe('compare store', () => {
  beforeEach(() => {
    localStorage.clear()
    useCompareStore.getState().clear()
  })

  it('selects and unselects the same pokemon', () => {
    const { toggle } = useCompareStore.getState()
    toggle(bulbasaur)
    expect(selectIsCompared('bulbasaur')(useCompareStore.getState())).toBe(true)

    toggle(bulbasaur)
    expect(useCompareStore.getState().selected).toEqual([])
  })

  it('keeps only the two most recent selections', () => {
    const { toggle } = useCompareStore.getState()
    toggle(bulbasaur)
    toggle(charmander)
    toggle(squirtle)

    const names = useCompareStore.getState().selected.map((entry) => entry.name)
    expect(names).toEqual(['charmander', 'squirtle'])
  })

  it('is ready to compare once both slots are filled', () => {
    const { toggle } = useCompareStore.getState()
    expect(selectCompareReady(useCompareStore.getState())).toBe(false)

    toggle(bulbasaur)
    toggle(charmander)
    expect(selectCompareReady(useCompareStore.getState())).toBe(true)
  })
})
