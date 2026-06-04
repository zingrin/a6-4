import DashPageHeader from '@/components/layout/DashPageHeader';
import { InstituteProfileForm } from '@/components/modules/institute/profile/InstituteProfileForm';
import { UserProfileForm } from '@/components/modules/user/profile/UserProfileForm';
import { userService } from '@/services/user.service';
import { User } from '@/types';

export default async function InstituteProfile() {
  const { data } = await userService.getProfile();
  const user = data.data as Partial<User>;
  const institute = data.data.instituteProfile;

  return (
    <div>
      <DashPageHeader title='Institute Settings' description='Manage your institute profile and account preferences.'/>

      <div className="flex flex-col gap-10 mt-8">
        <UserProfileForm user={user} />
        <InstituteProfileForm institute={institute} />
      </div>
    </div>
  )
}
