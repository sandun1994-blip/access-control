import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import Sidebar from './sidebar'
import { DropdownMenuIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'

const MobileSidebar = () => {
  return (
   <Sheet>
    <SheetTrigger>
        <HamburgerMenuIcon className='text-white w-6 h-6 '/>
    </SheetTrigger>
    <SheetContent className='p-0 z-[100]' side={'left'}>
        <Sidebar/>
    </SheetContent>
   </Sheet>
  )
}

export default MobileSidebar