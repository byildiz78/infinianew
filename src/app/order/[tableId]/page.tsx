'use client';

import OrderPage from '@/components/pages/OrderPage';

export default function Order({ params }: { params: { tableId: string } }) {
  return <OrderPage tableId={params.tableId} />;
}