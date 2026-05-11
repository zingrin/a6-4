export const dynamic = "force-dynamic";

import Footer from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { menuItems } from "@/constants/menuItems";
import { categoryService } from "@/services/category.service";
import { userService } from "@/services/user.service";

export default async function CommonLayout({children} : {children : React.ReactNode}) {

  const {data : categoryData} = await categoryService.getAllCategories();

  const menu = [ {title : "Categories", url : "#", items : categoryData?.data}, ...menuItems];

  const {data : userData} = await userService.getSession();

  return (
    <div>
        <Navbar menu={menu} className="sticky left-0 top-0" user={userData?.user}/>
        <div>
          {children}
        </div>
        <Footer />
    </div>
  )
}
