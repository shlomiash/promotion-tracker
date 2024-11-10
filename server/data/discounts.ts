
export type Discount = {
    id: number;
    code: string;
    limits: number | undefined;
    amount: number;
    userCreatedId: number;
    note: string|undefined;
    createdAt: Date;
    expires: Date | undefined;
    canBeCombined: boolean;
    active: boolean;
    isFixed: boolean;
  }


  export const discountCodes: Discount[] = [
    {
        id: 11,
        code: "SPRINGFEST25",
        amount: 25, // Deduct $25 from total payment
        limits: 120,
        expires: new Date("2025-03-30"),
        createdAt: new Date("2024-11-10"),
        userCreatedId: 111,
        note: "Spring festival special offer",
        canBeCombined: true,
        active: true,
        isFixed: true
    },
    {
        id: 13,
        code: "FESTIVE30",
        amount: 30, // Deduct $30 from total payment
        limits: 200,
        expires: new Date("2024-12-31"),
        createdAt: new Date("2024-11-09"),
        userCreatedId: 113,
        note: "End-of-year festive discount",
        canBeCombined: false,
        active: true,
        isFixed: true
    },
    {
        id: 14,
        code: "WELCOMEBONUS20",
        amount: 20, // Deduct $20 from total payment
        limits: 100,
        expires: new Date("2025-07-15"),
        createdAt: new Date("2024-11-10"),
        userCreatedId: 114,
        note: "Welcome bonus for new customers",
        canBeCombined: true,
        active: true,
        isFixed: true
    },
    {
        id: 15,
        code: "BIRTHDAYGIFT50",
        amount: 50, // Deduct $50 from total payment
        limits: 10,
        expires: new Date("2025-05-20"),
        createdAt: new Date("2024-11-10"),
        userCreatedId: 115,
        note: "Special $50 off for birthday promotions",
        canBeCombined: false,
        active: true,
        isFixed: true
    },
    {
        id: 16,
        code: "FALLCLEAR25",
        amount: 25, // Deduct $25 from total payment
        limits: 150,
        expires: new Date("2024-11-30"),
        createdAt: new Date("2024-11-07"),
        userCreatedId: 116,
        note: "Autumn clearance sale",
        canBeCombined: false,
        active: true,
        isFixed: false
    },
    {
        id: 17,
        code: "NEWYEAR2025",
        amount: 100, // Deduct $100 from total payment
        limits: 30,
        expires: new Date("2025-01-02"),
        createdAt: new Date("2024-11-09"),
        userCreatedId: 117,
        note: "New Year $100 discount",
        canBeCombined: false,
        active: true,
        isFixed: false
    },
    {
        id: 18,
        code: "SUMMER50OFF",
        amount: 50, // Deduct $50 from total payment
        limits: 500,
        expires: new Date("2025-08-31"),
        createdAt: new Date("2024-11-10"),
        userCreatedId: 118,
        note: "Summer blowout sale $50 off",
        canBeCombined: false,
        active: true,
        isFixed: true
    },
    {
        id: 19,
        code: "HOLIDAYCHEER15",
        amount: 15, // Deduct $15 from total payment
        limits: 80,
        expires: new Date("2024-12-24"),
        createdAt: new Date("2024-11-10"),
        userCreatedId: 119,
        note: "Holiday cheer special discount",
        canBeCombined: true,
        active: false,
        isFixed: true
    },
    {
        id: 20,
        code: "EXCLUSIVE20",
        amount: 20, // Deduct $20 from total payment
        limits: 250,
        expires: new Date("2025-06-15"),
        createdAt: new Date("2024-11-10"),
        userCreatedId: 120,
        note: "Exclusive $20 off for premium members",
        canBeCombined: true,
        active: true,
        isFixed: true
    }
];