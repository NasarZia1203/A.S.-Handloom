import { NextResponse } from 'next/server'
import { getCategories, addCategory, addTypeToCategory, removeTypeFromCategory } from '@/lib/data/store-manager'

export async function GET() {
  try {
    const categories = getCategories()
    return NextResponse.json(categories)
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to get categories' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, categoryId, newType, typeToRemove, slug, name, description, icon, types } = body

    // Sub-type operations
    if (action === 'add-type' && categoryId && newType) {
      const updated = addTypeToCategory(categoryId, newType)
      if (!updated) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 })
      }
      return NextResponse.json(updated)
    }

    if (action === 'remove-type' && categoryId && typeToRemove) {
      const updated = removeTypeFromCategory(categoryId, typeToRemove)
      if (!updated) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 })
      }
      return NextResponse.json(updated)
    }

    // Create New Category
    if (!name || !slug) {
      return NextResponse.json({ error: 'name and slug are required' }, { status: 400 })
    }

    const created = addCategory({
      name: String(name).trim(),
      slug: String(slug).trim().toLowerCase().replace(/\s+/g, '-'),
      description: description ? String(description).trim() : '',
      icon: icon || 'fas fa-tag',
      types: Array.isArray(types) ? types : [],
      is_active: true,
      sort_order: 99,
    })

    return NextResponse.json(created, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to process category request' }, { status: 500 })
  }
}
