import React from 'react'
import SidebarComponent from './_components/SidebarComponent'

const DashboardLayout = ({ children }) => {
  return (
    <div className="">
      {/* Sidebar */}
      <SidebarComponent children={children} />
    </div>
  )
}

export default DashboardLayout
