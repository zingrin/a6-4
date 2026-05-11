import DashPageHeader from '@/components/layout/DashPageHeader';
import { TutorProfileForm } from '@/components/modules/tutor/profile/TutorProfileForm';
import { UserProfileForm } from '@/components/modules/user/profile/UserProfileForm';
import { categoryService } from '@/services/category.service';
import { userService } from '@/services/user.service'
import { User } from '@/types';
import React from 'react'

export default async function StudentProfile() {

  const {data} = await userService.getProfile();
  const user = data.data as Partial<User>;
  const {data : categoriesData} = await categoryService.getAllCategories();

  return (
    <div>
      <DashPageHeader title='Account Settings' description='Manage your account and profile preferences.'/>

      <div className="flex flex-col gap-10">
        <UserProfileForm user={user} />
      </div>
    </div>
  )
}
