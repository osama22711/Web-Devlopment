import { NbMenuItem } from '@nebular/theme';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class pagesMenu {
  constructor() {}

  public MENU_ITEMS: NbMenuItem[] = [
    // Here
    {
      title: 'My lessons',
      icon: 'book-outline',
      link: '',
      home: true,
    },
    // {
    //   title: "لوحة الأساتذة",
    //   icon: "menu-2-outline",
    //   link: "/pages/teachers",
    // },
    // {
    //   title: "الإستبيان",
    //   icon: "menu-2-outline",
    //   link: "/pages/question",
    // },
    // {
    //   title: "الأدوات",
    //   icon: "grid-outline",
    //   link: "/pages/tools",
    // },
    // {
    //   title: "لوحة الأدمن",
    //   icon: "keypad-outline",
    //   link: "/pages/admin-panel/",
    //   hidden: true,
    //   children: [
    //     {
    //       title: "جدول المستخدمين",
    //       icon: "layout-outline",
    //       link: "/pages/users-table",
    //     },
    //     {
    //       title: "المؤسسات",
    //       icon: "edit-2-outline",
    //       link: "/pages/orgs-panel",
    //       hidden: true,
    //     },
    //     {
    //       title: "المقالات",
    //       icon: "grid-outline",
    //       link: "/pages/articles-panel",
    //     },
    //     {
    //       title: "اختبار القراءة",
    //       icon: "browser-outline",
    //       link: "/pages/speedtest-panel",
    //     },
    //     {
    //       title: "التمارين",
    //       icon: "message-circle-outline",
    //       link: "/pages/nonReturn",
    //     },
    //     {
    //       title: "الدورة التدريبية",
    //       icon: "pie-chart-outline",
    //       link: "/pages/courses-panel",
    //     },
    //     {
    //       title: "الأكواد المفعلة",
    //       icon: "lock-outline",
    //       link: "/pages/special-codes",
    //     },
    //     {
    //       title: "لوحة الويبنار",
    //       icon: "menu-2-outline",
    //       link: "/pages/webinar-panel",
    //       hidden: true,
    //     },
    //     {
    //       title: "لوحة السينغولر",
    //       icon: "browser-outline",
    //       link: "/pages/singular-panel",
    //       hidden: true,
    //     }
    //   ],
    // },
  ];
}
