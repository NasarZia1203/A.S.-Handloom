import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types'
import ProductForm from '@/components/admin/ProductForm'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createServerClient()
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !product) {
    notFound()
  }

  return (
    <div>
      <h1
        style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}
      >
        Edit Product
      </h1>
      <ProductForm
        initialValues={product as Product}
        productId={id}
      />
    </div>
  )
}
