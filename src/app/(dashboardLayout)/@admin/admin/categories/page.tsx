import DashPageHeader from '@/components/layout/DashPageHeader'
import ManageCategories from '@/components/modules/admin/ManageCategories';
import { categoryService } from '@/services/category.service'
import React from 'react'

export default async function Categories() {

  const {data} = await categoryService.getAllCategories();

  console.log(data)

  return (
    <div>
      <DashPageHeader title='Manage Categories & Subjects' description=''/>
      <ManageCategories data={data.data}/>
    </div>
  )
}

