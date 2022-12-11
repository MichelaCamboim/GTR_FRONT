import { NavLink } from "react-router-dom";
import { useState } from "react";

import {
  Bars3Icon,
  UserPlusIcon,
  ChatBubbleBottomCenterIcon,
  ArrowLeftOnRectangleIcon,
  Squares2X2Icon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  DocumentChartBarIcon,
  ArrowUpTrayIcon,
  CodeBracketIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import SubMenu from "./SubMenu";

function SideBar() {
  const [open, setOpen] = useState(true);

  const navigation = [
    { name: "Dashboard", icon: Squares2X2Icon, to: "/" },
    { name: "Add User", icon: UserPlusIcon, to: "/user" },
    {
      name: "Task",
      icon: ClipboardDocumentListIcon,
      to: "/task-up",
    },
    {
      name: "SubMenu",
      icon: Cog6ToothIcon,
      submenu: true,
      submenuItems: [
        {
          name: "Sub Menu 1",
          icon: Cog6ToothIcon,
          to: "/report1",
        },
        {
          name: "Sub Menu 2",
          icon: Cog6ToothIcon,
          to: "/report2",
        },
        {
          name: "Sub Menu 3",
          icon: Cog6ToothIcon,
          to: "/report3",
        },
      ],
    },

    {
      name: "Report",
      icon: DocumentChartBarIcon,
      to: "/report",
    },
    {
      name: "Chatbot",
      icon: ChatBubbleBottomCenterIcon,
      to: "/chatbot",
    },
    {
      name: "Log-out",
      icon: ArrowLeftOnRectangleIcon,
      to: "/log",
    },
    {
      name: "Upload",
      icon: ArrowUpTrayIcon,
      to: "/fileUpload",
    },
    {
      name: "Calendar",
      icon: CalendarDaysIcon,
      to: "/calendar",
    },
    {
      name: "Modelos - Form",
      icon: CodeBracketIcon,
      to: "/model-form",
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className="invisible w-0 md:visible md:w-auto bg-gray-100">
      <div
        className={`bg-blue rounded-br-lg  p-5 pt-10  relative duration-300 ${
          open ? "w-72" : "w-20"
        }`}>
        <Bars3Icon
          className={`bg-dark-blue  text-white text-2xl rounded-md absolute -right-3   h-6 w-6 p-1 cursor-pointer top-0.5 hover:bg-orange ${
            !open && "rotate-180"
          }`}
          aria-hidden="true"
          onClick={() => setOpen(!open)}
        />

        <div className="flex items-center rounded-md bg-white mb-4  border-none">
          <MagnifyingGlassIcon
            className={`h-6 w-6 ml-2 mr-2 duration-75 ${
              !open && "h-10 w-10 m-0"
            }`}
          />
          <input
            type={"search"}
            placeholder="Search"
            className={`bg-transparent w-full focus:outline-none  border-none text-sm font-medium ${
              !open && "hidden"
            }`}
          />
        </div>
        <div>
          {navigation.map((item) => (
            <div key={item.name} className="inline-flex flex-col w-full">
              {item.submenu ? (
                <SubMenu item={item} open={open} />
              ) : (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? "bg-dark-blue text-white hover:bg-dark-grey"
                        : "text-white hover:bg-orange",
                      ` text-sm font-medium flex justify-between
                ${
                  open
                    ? "px-3 py-2 items-center rounded-md mb-3 inline-flex"
                    : "mb-3 h-10 rounded-md "
                }`
                    )
                  }>
                  <div className="flex items-center">
                    <item.icon
                      className={`h-6 w-6 mr-2 ${!open && "h-10 w-10 m-0 p-2"}`}
                      aria-hidden="true"
                    />

                    <div className={`${!open && "hidden"}`}>{item.name}</div>
                  </div>
                </NavLink>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
