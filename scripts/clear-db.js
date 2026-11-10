const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

const envFile = path.join(__dirname, '..', '.env.local')
const envContent = fs.readFileSync(envFile, 'utf8')
const env = {}
envContent.split('\n').forEach(line => {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) return
  const eq = trimmed.indexOf('=')
  if (eq > 0) {
    const k = trimmed.substring(0, eq).trim()
    const v = trimmed.substring(eq + 1).trim().replace(/^['"]|['"]$/g, '')
    env[k] = v
  }
})

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function clearAll() {
  console.log('Connecting to Supabase at:', supabaseUrl)

  // 1. Clear products table
  const { data: beforeProducts, error: fetchErr } = await supabase.from('products').select('id, code')
  console.log('Existing products in Supabase:', beforeProducts?.length || 0, fetchErr ? `(Error: ${fetchErr.message})` : '')

  if (beforeProducts && beforeProducts.length > 0) {
    const ids = beforeProducts.map(p => p.id)
    const { error: delErr } = await supabase.from('products').delete().in('id', ids)
    if (delErr) {
      console.error('Error deleting products from Supabase:', delErr.message)
    } else {
      console.log(`Successfully deleted ${ids.length} products from Supabase.`)
    }
  } else {
    // Attempt delete all just in case
    const { error: delAllErr } = await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    if (delAllErr) {
      console.log('Delete all check:', delAllErr.message)
    } else {
      console.log('Supabase products table verified empty.')
    }
  }

  // 2. Clear Storage Buckets
  const { data: buckets, error: bError } = await supabase.storage.listBuckets()
  if (bError) {
    console.warn('Could not list storage buckets:', bError.message)
  } else if (buckets && buckets.length > 0) {
    console.log('Found storage buckets:', buckets.map(b => b.name))
    for (const b of buckets) {
      const { data: files, error: fError } = await supabase.storage.from(b.name).list('', { limit: 1000 })
      if (files && files.length > 0) {
        const fileNames = files.map(f => f.name).filter(n => n !== '.emptyFolderPlaceholder')
        if (fileNames.length > 0) {
          console.log(`Deleting ${fileNames.length} files from bucket "${b.name}"...`)
          const { error: rmError } = await supabase.storage.from(b.name).remove(fileNames)
          if (rmError) {
            console.error(`Error removing files from ${b.name}:`, rmError.message)
          } else {
            console.log(`Successfully emptied bucket "${b.name}".`)
          }
        } else {
          console.log(`Bucket "${b.name}" is already empty.`)
        }
      } else {
        console.log(`Bucket "${b.name}" is empty.`)
      }
    }
  }

  // 3. Clear store-state.json products
  const statePath = path.join(__dirname, '..', 'lib', 'data', 'store-state.json')
  if (fs.existsSync(statePath)) {
    try {
      const state = JSON.parse(fs.readFileSync(statePath, 'utf8'))
      const prevCount = state.products ? state.products.length : 0
      state.products = []
      fs.writeFileSync(statePath, JSON.stringify(state, null, 2), 'utf8')
      console.log(`Successfully cleared store-state.json products (was ${prevCount}, now 0).`)
    } catch (e) {
      console.error('Failed to update store-state.json:', e)
    }
  }

  console.log('--- ALL PRODUCTS AND IMAGES CLEARED FROM DB & STORE ---')
}

clearAll().catch(console.error)
