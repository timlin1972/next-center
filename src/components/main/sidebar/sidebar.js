import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdBook,
  MdSupervisedUserCircle,
  MdOutlineSettings,
  MdOutlineEventNote,
  MdCloudQueue,
  MdLogout,
  MdAccountBalance,
  MdCallMade,
  MdCallReceived,
  MdCallMissedOutgoing,
  MdAttachMoney,
} from "react-icons/md";
import { handleGithubLogout } from "@/lib/action";
import { auth } from "@/lib/auth";
import { getUserByEmail } from "@/lib/data";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Main",
        path: "/main",
        icon: <MdDashboard />,
      },
      {
        title: "Blog",
        path: "/main/blog",
        icon: <MdBook />,
      },
      {
        title: "Users",
        path: "/main/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "System Information",
        path: "/main/system_information",
        icon: <MdOutlineEventNote />,
      },
      {
        title: "Weather",
        path: "/main/weather",
        icon: <MdCloudQueue />,
      },
    ],
  },
  {
    title: "Accounting",
    list: [
      {
        title: "Account",
        path: "/main/accounting/account",
        icon: <MdAccountBalance />,
      },
      {
        title: "Expanse",
        path: "/main/accounting/expanse",
        icon: <MdCallMade />,
      },
      {
        title: "Income",
        path: "/main/accounting/income",
        icon: <MdCallReceived />,
      },
      {
        title: "Transfer",
        path: "/main/accounting/transfer",
        icon: <MdCallMissedOutgoing />,
      },
      {
        title: "Record",
        path: "/main/accounting/record",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/main/settings",
        icon: <MdOutlineSettings />,
      },
    ],
  },
];

const Sidebar = async () => {
  const session = await auth();
  const user = await getUserByEmail(session.user.email);

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <div className={styles.userDetail}>
          <span className={styles.username}>{user.username}</span>
          <span className={styles.userTitle}>
            {user.isAdmin ? "Admin" : "User"}
          </span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <form action={handleGithubLogout}>
        <button className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
