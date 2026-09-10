import { ShoppingBag, Package, Plus, TrendingUp, Search } from 'lucide-react';

export default function Store() {
  const products = [
    { id: 1, name: 'Premium Strategy Guide', price: '$49.99', sales: 120, stock: 'Unlimited', status: 'Active' },
    { id: 2, name: '1-on-1 Consultation Hour', price: '$150.00', sales: 45, stock: 'Available', status: 'Active' },
    { id: 3, name: 'Starter Kit Bundle', price: '$199.00', sales: 12, stock: '15 left', status: 'Low Stock' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-base">Store & Products</h1>
          <p className="text-text-muted mt-1">Manage your digital and physical product offerings.</p>
        </div>
        <button className="bg-blue-500 text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-400 transition-colors text-sm font-medium w-full sm:w-auto justify-center">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-lg text-primary border border-blue-200">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-text-muted font-medium">Total Sales</p>
            <h3 className="text-2xl font-bold text-text-base">177</h3>
          </div>
        </div>
        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-lg text-primary border border-blue-200">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-text-muted font-medium">Revenue</p>
            <h3 className="text-2xl font-bold text-text-base">$15,137</h3>
          </div>
        </div>
        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="p-3 bg-purple-50 rounded-lg text-purple-600 border border-purple-200">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-text-muted font-medium">Active Products</p>
            <h3 className="text-2xl font-bold text-text-base">3</h3>
          </div>
        </div>
      </div>

      <div className="glass-panel overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border-subtle flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-base">Product Catalog</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="pl-9 pr-4 py-2 bg-white shadow-card rounded-[17px] border border-border-subtle border border-border-subtle rounded-lg text-sm text-text-base focus:outline-none focus:border-blue-500 w-64"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-text-muted">
            <thead className="bg-white text-text-muted uppercase font-semibold border-b border-border-subtle">
              <tr>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Sales</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-bg-base hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-text-base">{product.name}</td>
                  <td className="px-6 py-4 text-primary font-medium">{product.price}</td>
                  <td className="px-6 py-4">{product.sales}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${
                      product.status === 'Active' ? 'bg-blue-50 text-primary border-blue-200' : 'bg-yellow-50 text-yellow-500 border-yellow-500/30'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:text-primary font-medium mr-4">Edit</button>
                    <button className="text-red-600 hover:text-red-600 font-medium">Archive</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
