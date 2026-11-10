import { getStoredProducts } from '@/lib/data/store-manager'
import AdminDashboardClient from '@/components/admin/AdminDashboardClient'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const productList = getStoredProducts()

  const counts = {
    total: productList.length,
    active: productList.filter((p) => p.is_active).length,
    sarees: productList.filter((p) => p.category === 'saree').length,
    fabrics: productList.filter((p) => p.category === 'fabric').length,
    chadars: productList.filter((p) => ['chadar', 'gamcha', 'lungi'].includes(p.category)).length,
    suits: productList.filter((p) => ['suit-salwar', 'dupatta-stole'].includes(p.category)).length,
  }

  return <AdminDashboardClient initialCounts={counts} />
}
