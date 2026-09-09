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
          <h1 className="text-2xl font-bold text-gray-100">Store & Products</h1>
          <p className="text-gray-400 mt-1">Manage your digital and physical product offerings.</p>
        </div>
        <button className="bg-emerald-500 text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-400 transition-colors text-sm font-medium w-full sm:w-auto justify-center">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Total Sales</p>
            <h3 className="text-2xl font-bold text-gray-100">177</h3>
          </div>
        </div>
        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Revenue</p>
            <h3 className="text-2xl font-bold text-gray-100">$15,137</h3>
          </div>
        </div>
        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Active Products</p>
            <h3 className="text-2xl font-bold text-gray-100">3</h3>
          </div>
        </div>
      </div>

      <div className="glass-panel overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-100">Product Catalog</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="pl-9 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-emerald-500 w-64"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-gray-900/50 text-gray-300 uppercase font-semibold border-b border-gray-800">
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
                <tr key={product.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-200">{product.name}</td>
                  <td className="px-6 py-4 text-emerald-400 font-medium">{product.price}</td>
                  <td className="px-6 py-4">{product.sales}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${
                      product.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-emerald-400 hover:text-emerald-300 font-medium mr-4">Edit</button>
                    <button className="text-red-400 hover:text-red-300 font-medium">Archive</button>
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
