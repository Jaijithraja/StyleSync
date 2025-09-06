// Local storage fallback for when database is not available
const STORAGE_KEYS = {
  ITEMS: 'stylesync_items',
  OUTFITS: 'stylesync_outfits',
  EVENTS: 'stylesync_events'
}

export const localStorage = {
  // Items
  getItems: (): any[] => {
    try {
      const items = window.localStorage.getItem(STORAGE_KEYS.ITEMS)
      return items ? JSON.parse(items) : []
    } catch {
      return []
    }
  },

  setItems: (items: any[]) => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items))
    } catch (error) {
      console.error('Failed to save items to local storage:', error)
    }
  },

  addItem: (item: any) => {
    const items = localStorage.getItems()
    items.unshift(item)
    localStorage.setItems(items)
  },

  updateItem: (id: string, updates: any) => {
    const items = localStorage.getItems()
    const index = items.findIndex(item => item.id === id)
    if (index !== -1) {
      items[index] = { ...items[index], ...updates }
      localStorage.setItems(items)
    }
  },

  deleteItem: (id: string) => {
    const items = localStorage.getItems()
    const filtered = items.filter(item => item.id !== id)
    localStorage.setItems(filtered)
  },

  // Outfits
  getOutfits: (): any[] => {
    try {
      const outfits = window.localStorage.getItem(STORAGE_KEYS.OUTFITS)
      return outfits ? JSON.parse(outfits) : []
    } catch {
      return []
    }
  },

  setOutfits: (outfits: any[]) => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.OUTFITS, JSON.stringify(outfits))
    } catch (error) {
      console.error('Failed to save outfits to local storage:', error)
    }
  },

  addOutfit: (outfit: any) => {
    const outfits = localStorage.getOutfits()
    outfits.unshift(outfit)
    localStorage.setOutfits(outfits)
  },

  updateOutfit: (id: string, updates: any) => {
    const outfits = localStorage.getOutfits()
    const index = outfits.findIndex(outfit => outfit.id === id)
    if (index !== -1) {
      outfits[index] = { ...outfits[index], ...updates }
      localStorage.setOutfits(outfits)
    }
  },

  deleteOutfit: (id: string) => {
    const outfits = localStorage.getOutfits()
    const filtered = outfits.filter(outfit => outfit.id !== id)
    localStorage.setOutfits(filtered)
  },

  // Events
  getEvents: (): any[] => {
    try {
      const events = window.localStorage.getItem(STORAGE_KEYS.EVENTS)
      return events ? JSON.parse(events) : []
    } catch {
      return []
    }
  },

  setEvents: (events: any[]) => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events))
    } catch (error) {
      console.error('Failed to save events to local storage:', error)
    }
  }
}
