import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pdf/update$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/pdf/update$id"!</div>
}
