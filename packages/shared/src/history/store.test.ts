import { beforeEach, describe, expect, it } from 'vitest'
import { selectPendingToast, selectTotalVisits, useHistoryStore } from './store'

const pikachu = { id: 25, name: 'pikachu', image: 'pikachu.svg' }
const charmander = { id: 4, name: 'charmander', image: 'charmander.svg' }

describe('history store', () => {
  beforeEach(() => {
    localStorage.clear()
    useHistoryStore.getState().clear()
  })

  it('records a visit and starts the counter at one', () => {
    useHistoryStore.getState().recordVisit(pikachu)

    const [entry] = useHistoryStore.getState().entries
    expect(entry).toMatchObject({ name: 'pikachu', visits: 1 })
  })

  it('increments the counter instead of duplicating the entry', () => {
    const { recordVisit } = useHistoryStore.getState()
    recordVisit(pikachu)
    recordVisit(charmander)
    recordVisit(pikachu)

    const { entries } = useHistoryStore.getState()
    expect(entries).toHaveLength(2)
    expect(entries[0]).toMatchObject({ name: 'pikachu', visits: 2 })
    expect(selectTotalVisits(useHistoryStore.getState())).toBe(3)
  })

  it('moves the most recent visit to the top of the list', () => {
    const { recordVisit } = useHistoryStore.getState()
    recordVisit(pikachu)
    recordVisit(charmander)

    const names = useHistoryStore.getState().entries.map((entry) => entry.name)
    expect(names).toEqual(['charmander', 'pikachu'])
  })

  it('exposes a pending toast until it is dismissed', () => {
    useHistoryStore.getState().recordVisit(pikachu)
    expect(selectPendingToast(useHistoryStore.getState())?.name).toBe('pikachu')

    useHistoryStore.getState().dismissToast()
    expect(selectPendingToast(useHistoryStore.getState())).toBeNull()
  })

  it('shows the toast again after a new visit', () => {
    const store = useHistoryStore.getState()
    store.recordVisit(pikachu)
    store.dismissToast()
    store.recordVisit(charmander)

    expect(selectPendingToast(useHistoryStore.getState())?.name).toBe('charmander')
  })

  it('persists the state in localStorage', () => {
    useHistoryStore.getState().recordVisit(pikachu)

    const raw = localStorage.getItem('pokedex.history')
    expect(raw).not.toBeNull()
    expect(JSON.parse(raw as string).state.entries[0].name).toBe('pikachu')
  })
})
