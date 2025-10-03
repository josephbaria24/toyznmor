"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockOrders, type Order } from "@/lib/mock-data"
import { Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
  processing: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  shipped: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
  delivered: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const { toast } = useToast()

  const filteredOrders = filterStatus === "all" ? orders : orders.filter((o) => o.status === filterStatus)

  const updateOrderStatus = (orderId: number, newStatus: Order["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    toast({
      title: "Order updated",
      description: `Order #${orderId} status changed to ${newStatus}`,
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="py-8 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Orders</h1>
            <p className="text-muted-foreground">Manage customer orders and fulfillment</p>
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {filteredOrders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">Order #{order.id}</h3>
                      <Badge className={statusColors[order.status]} variant="outline">
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{formatDate(order.created_at)}</p>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Order #{order.id} Details</DialogTitle>
                        <DialogDescription>Complete order information and customer details</DialogDescription>
                      </DialogHeader>

                      <div className="space-y-6 py-4">
                        <div>
                          <h4 className="font-semibold mb-3">Customer Information</h4>
                          <div className="grid gap-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Name:</span>
                              <span className="font-medium">{order.customer_name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Email:</span>
                              <span className="font-medium">{order.customer_email}</span>
                            </div>
                            {order.customer_phone && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Phone:</span>
                                <span className="font-medium">{order.customer_phone}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Address:</span>
                              <span className="font-medium text-right">{order.shipping_address}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Order Summary</h4>
                          <div className="grid gap-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Order Date:</span>
                              <span className="font-medium">{formatDate(order.created_at)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Status:</span>
                              <Badge className={statusColors[order.status]} variant="outline">
                                {order.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between pt-2 border-t">
                              <span className="font-semibold">Total Amount:</span>
                              <span className="font-bold text-lg">${order.total_amount.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Update Status</h4>
                          <Select
                            value={order.status}
                            onValueChange={(value) => updateOrderStatus(order.id, value as Order["status"])}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Customer</p>
                    <p className="font-medium">{order.customer_name}</p>
                    <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Shipping Address</p>
                    <p className="font-medium text-sm">{order.shipping_address}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                    <p className="text-2xl font-bold">${order.total_amount.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t">
                  <p className="text-sm text-muted-foreground mr-2">Update Status:</p>
                  <Select
                    value={order.status}
                    onValueChange={(value) => updateOrderStatus(order.id, value as Order["status"])}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredOrders.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No orders found with the selected filter.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
