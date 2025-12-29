'use client'
import React from 'react'
import Overview from './_components/overview'
import { useGetUserActivity } from '@/network/service/user-activity-dashboard'
import { Spinner } from '@/components/ui/spinner'

const DashboardPage = () => {
  const { data, isLoading } = useGetUserActivity()

  if(!data) return <div>error page</div>
  if(isLoading) return <Spinner />
  return (
    <div><Overview overview={data} /></div>
  )
}

export default DashboardPage