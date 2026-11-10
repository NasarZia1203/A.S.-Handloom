import fs from 'fs'
import path from 'path'
import type { Product, ProductCategory, SiteSettings, HomepageSectionConfig } from '@/lib/types'
import { DEFAULT_CATEGORIES } from './categories'
import { DEFAULT_SITE_SETTINGS } from './site-settings'
import { ALL_FALLBACK_PRODUCTS } from './fallback-products'

interface StoreState {
  settings: SiteSettings
  categories: ProductCategory[]
  products: Product[]
}

const STATE_FILE = path.join(process.cwd(), 'lib', 'data', 'store-state.json')

function getInitialState(): StoreState {
  return {
    settings: DEFAULT_SITE_SETTINGS,
    categories: DEFAULT_CATEGORIES,
    products: [],
  }
}

export function readStoreState(): StoreState {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const raw = fs.readFileSync(STATE_FILE, 'utf-8')
      const parsed = JSON.parse(raw)

      // Reconcile homepage sections so new sections like 'sale' and 'ndd' are always present
      const existingSections = parsed.settings?.homepage_sections || []
      const mergedSections = [...existingSections]
      for (const defSec of DEFAULT_SITE_SETTINGS.homepage_sections) {
        if (!mergedSections.some((s) => s.id === defSec.id)) {
          mergedSections.push(defSec)
        }
      }

      return {
        settings: {
          ...DEFAULT_SITE_SETTINGS,
          ...(parsed.settings || {}),
          homepage_sections: mergedSections.sort((a, b) => a.sort_order - b.sort_order),
          policies: {
            ...(DEFAULT_SITE_SETTINGS.policies || {}),
            ...(parsed.settings?.policies || {}),
          },
        },
        categories: parsed.categories && parsed.categories.length > 0 ? parsed.categories : DEFAULT_CATEGORIES,
        products: Array.isArray(parsed.products) ? parsed.products : [],
      }
    }
  } catch (err) {
    console.warn('Error reading store-state.json, using defaults:', err)
  }

  const initial = getInitialState()
  writeStoreState(initial)
  return initial
}

export function writeStoreState(state: StoreState): void {
  try {
    const dir = path.dirname(STATE_FILE)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8')
  } catch (err) {
    console.error('Failed to write store-state.json:', err)
  }
}

// ──────────────────────────────────────────────
// SETTINGS OPERATIONS
// ──────────────────────────────────────────────
export function getSiteSettings(): SiteSettings {
  const state = readStoreState()
  return state.settings
}

export function updateSiteSettings(updates: Partial<SiteSettings>): SiteSettings {
  const state = readStoreState()
  state.settings = {
    ...state.settings,
    ...updates,
  }
  writeStoreState(state)
  return state.settings
}

export function updateHomepageSections(sections: HomepageSectionConfig[]): HomepageSectionConfig[] {
  const state = readStoreState()
  state.settings.homepage_sections = sections.sort((a, b) => a.sort_order - b.sort_order)
  writeStoreState(state)
  return state.settings.homepage_sections
}

// ──────────────────────────────────────────────
// CATEGORY OPERATIONS
// ──────────────────────────────────────────────
export function getCategories(): ProductCategory[] {
  const state = readStoreState()
  return state.categories.sort((a, b) => a.sort_order - b.sort_order)
}

export function addCategory(category: Omit<ProductCategory, 'id'>): ProductCategory {
  const state = readStoreState()
  const newCat: ProductCategory = {
    ...category,
    id: `cat-${Date.now()}`,
    sort_order: category.sort_order || state.categories.length + 1,
    is_active: category.is_active ?? true,
    types: category.types || [],
  }
  state.categories.push(newCat)
  writeStoreState(state)
  return newCat
}

export function updateCategory(id: string, updates: Partial<ProductCategory>): ProductCategory | null {
  const state = readStoreState()
  const idx = state.categories.findIndex((c) => c.id === id || c.slug === id)
  if (idx === -1) return null

  state.categories[idx] = {
    ...state.categories[idx],
    ...updates,
  }
  writeStoreState(state)
  return state.categories[idx]
}

export function deleteCategory(id: string): boolean {
  const state = readStoreState()
  const initialLen = state.categories.length
  state.categories = state.categories.filter((c) => c.id !== id && c.slug !== id)
  if (state.categories.length !== initialLen) {
    writeStoreState(state)
    return true
  }
  return false
}

export function addTypeToCategory(categoryId: string, newType: string): ProductCategory | null {
  const state = readStoreState()
  const cat = state.categories.find((c) => c.id === categoryId || c.slug === categoryId)
  if (!cat) return null

  const trimmed = newType.trim()
  if (trimmed && !cat.types.includes(trimmed)) {
    cat.types.push(trimmed)
    writeStoreState(state)
  }
  return cat
}

export function removeTypeFromCategory(categoryId: string, typeToRemove: string): ProductCategory | null {
  const state = readStoreState()
  const cat = state.categories.find((c) => c.id === categoryId || c.slug === categoryId)
  if (!cat) return null

  cat.types = cat.types.filter((t) => t.toLowerCase() !== typeToRemove.toLowerCase().trim())
  writeStoreState(state)
  return cat
}

// ──────────────────────────────────────────────
// PRODUCT OPERATIONS
// ──────────────────────────────────────────────
export function getStoredProducts(): Product[] {
  const state = readStoreState()
  return state.products
}

export function getProductById(id: string): Product | undefined {
  const state = readStoreState()
  const lowerId = id.toLowerCase().trim()
  return state.products.find(
    (p) => p.id === id || p.code.toLowerCase() === lowerId || p.id.toLowerCase() === lowerId
  )
}

export function upsertStoredProduct(product: Product): Product {
  const state = readStoreState()
  const idx = state.products.findIndex((p) => p.id === product.id)
  if (idx >= 0) {
    state.products[idx] = { ...state.products[idx], ...product, updated_at: new Date().toISOString() }
  } else {
    state.products.push({
      ...product,
      created_at: product.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
  }
  writeStoreState(state)
  return idx >= 0 ? state.products[idx] : product
}

export function deleteStoredProduct(id: string): boolean {
  const state = readStoreState()
  const initialLen = state.products.length
  const lowerId = id.toLowerCase().trim()
  state.products = state.products.filter(
    (p) => p.id !== id && p.code.toLowerCase() !== lowerId && p.id.toLowerCase() !== lowerId
  )
  if (state.products.length !== initialLen) {
    writeStoreState(state)
    return true
  }
  return false
}
