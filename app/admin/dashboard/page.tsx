import Link from 'next/link'
import { createServerClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types'
import ProductTable from '@/components/admin/ProductTable'

export default async function DashboardPage() {
  const supabase = await createServerClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('category', { ascending: true })
    .order('sort_order', { ascending: true })

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
          Products
        </h1>
        <Link
          href="/admin/dashboard/products/new"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#800020',
            color: '#fff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px',
          }}
        >
          + Add Product
        </Link>
      </div>
      <ProductTable initialProducts={(products as Product[]) || []} />
    </div>
  )
}
