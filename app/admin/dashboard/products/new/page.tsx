import ProductForm from '@/components/admin/ProductForm'

export default function NewProductPage() {
  return (
    <div>
      <h1
        style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}
      >
        Add New Product
      </h1>
      <ProductForm />
    </div>
  )
}
