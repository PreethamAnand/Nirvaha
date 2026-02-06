import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AdminTable } from "@/admin/components/AdminTable";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { ActionMenu } from "@/admin/components/ActionMenu";
import { ConfirmModal } from "@/admin/components/ConfirmModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Search, Plus, Upload } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "inactive" | "out-of-stock";
  description: string;
  image?: string;
  inventoryEnabled: boolean;
}

export function ProductsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    status: "active",
    description: "",
    inventoryEnabled: true,
  });
  const [imageName, setImageName] = useState("");
  const [products, setProducts] = useState<Product[]>([
    {
      id: "P-001",
      name: "Spiritual Journey Kit",
      category: "Wellness Kits",
      price: 2499,
      stock: 15,
      status: "active",
      description: "Complete wellness kit with meditation accessories...",
      image: "",
      inventoryEnabled: true,
    },
    {
      id: "P-002",
      name: "Ayurvedic Herbal Tea Set",
      category: "Beverages",
      price: 599,
      stock: 0,
      status: "out-of-stock",
      description: "Organic herbal tea blends for wellness...",
      image: "",
      inventoryEnabled: true,
    },
    {
      id: "P-003",
      name: "Yoga Mat Premium",
      category: "Accessories",
      price: 1299,
      stock: 30,
      status: "active",
      description: "High-quality eco-friendly yoga mat...",
      image: "",
      inventoryEnabled: true,
    },
  ]);

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [products, searchQuery]
  );

  const handleAdd = () => {
    setSelectedProduct(null);
    setFormData({
      name: "",
      category: "",
      price: 0,
      stock: 0,
      status: "active",
      description: "",
      inventoryEnabled: true,
    });
    setImageName("");
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormData(product);
    setImageName(product.image || "");
    setIsModalOpen(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name) return;
    if (selectedProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === selectedProduct.id ? { ...p, ...formData, image: imageName } : p
        )
      );
    } else {
      const newProduct: Product = {
        id: `P-${Math.floor(Math.random() * 9000 + 1000)}`,
        name: formData.name || "",
        category: formData.category || "",
        price: formData.price || 0,
        stock: formData.stock || 0,
        status: (formData.status as Product["status"]) || "active",
        description: formData.description || "",
        image: imageName,
        inventoryEnabled: formData.inventoryEnabled ?? true,
      };
      setProducts((prev) => [...prev, newProduct]);
    }
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedProduct) {
      setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    }
  };

  const columns = [
    {
      key: "name",
      header: "Product Name",
    },
    {
      key: "category",
      header: "Category",
    },
    {
      key: "price",
      header: "Price",
      render: (item: Product) => (
        <span className="font-semibold text-black">₹{item.price}</span>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      render: (item: Product) => (
        <span className={item.stock === 0 ? "text-red-500 font-semibold" : "text-gray-700"}>
          {item.stock} units
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: Product) => (
        <StatusBadge
          status={item.status === "out-of-stock" ? "out-of-stock" : item.status}
          variant="default"
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: Product) => (
        <ActionMenu
          variant="content"
          onEdit={() => handleEdit(item)}
          onDelete={() => handleDelete(item)}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white border-emerald-200 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-emerald-200 text-black placeholder:text-gray-400"
            />
          </div>
          <Button
            onClick={handleAdd}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
          >
            <Plus className="mr-2 w-4 h-4" />
            Add Product
          </Button>
        </div>
      </Card>

      <Card className="bg-white border-emerald-200">
        <AdminTable
          data={filteredProducts}
          columns={columns}
          emptyMessage="No products found"
        />
      </Card>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-sm max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedProduct ? "Edit Product" : "Add Product"}</DialogTitle>
            <DialogDescription>
              {selectedProduct ? "Update product details" : "Create a new marketplace product"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Wellness Kits">Wellness Kits</SelectItem>
                    <SelectItem value="Beverages">Beverages</SelectItem>
                    <SelectItem value="Accessories">Accessories</SelectItem>
                    <SelectItem value="Books">Books</SelectItem>
                    <SelectItem value="Herbs & Supplements">Herbs & Supplements</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  className="mt-1"
                  disabled={!formData.inventoryEnabled}
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <Label htmlFor="inventory">Inventory Management</Label>
                <p className="text-sm text-gray-500 mt-1">
                  Track stock levels for this product
                </p>
              </div>
              <Switch
                id="inventory"
                checked={formData.inventoryEnabled}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, inventoryEnabled: checked })
                }
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1"
                rows={4}
              />
            </div>
            <div>
              <Label>Product Image</Label>
              <div className="mt-2">
                <label className="w-full">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setImageName(e.target.files?.[0]?.name || "")}
                  />
                  <Button variant="outline" className="w-full" type="button">
                    <Upload className="mr-2 w-4 h-4" />
                    {imageName || "Upload Image"}
                  </Button>
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
              onClick={handleSave}
            >
              {selectedProduct ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Modal */}
      <ConfirmModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="Delete Product"
        description={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={handleDeleteConfirm}
        variant="destructive"
      />
    </div>
  );
}


