
export type Discount = {
    id: number;
    code: string;
    limits: number;
    amount: string;
    userCreatedId: number;
    note: string;
    createdAt: string;
    expires: string;
    canBeCombined: boolean;
    active: boolean;
  }


export const discountCodes:Discount[] = [
    {
        id: 1,
        code: "SUMMER20",
        amount: "20%", // percentage
        limits: 100,
        expires: "2024-12-31",
        createdAt: "2024-11-08",
        userCreatedId: 101,
        note: "Seasonal discount for summer sales",
        canBeCombined: false,
        active: true
    },
    {
        id: 2,
        code: "WELCOME5",
        amount: "$5", // fixed price
        limits: 50,
        expires: "2025-01-15",
        createdAt: "2024-10-22",
        userCreatedId: 102,
        note: "New user welcome bonus",
        canBeCombined: true,
        active: true
    },
    {
        id: 3,
        code: "BLACKFRIDAY50",
        amount: "50%", // percentage
        limits: 500,
        expires: "2024-11-29",
        createdAt: "2024-11-01",
        userCreatedId: 103,
        note: "Black Friday special",
        canBeCombined: false,
        active: true
    },
    {
        id: 4,
        code: "WINTERSALE30",
        amount: "30%", // percentage
        limits: 200,
        expires: "2025-02-15",
        createdAt: "2024-11-05",
        userCreatedId: 104,
        note: "Winter sale offer",
        canBeCombined: false,
        active: true
    },
    {
        id: 5,
        code: "FREESHIP",
        amount: "$0", // fixed price (free shipping)
        limits: 100,
        expires: "2025-03-31",
        createdAt: "2024-10-28",
        userCreatedId: 105,
        note: "Free shipping for orders over $50",
        canBeCombined: true,
        active: false
    },
    {
        id: 6,
        code: "SPRING10",
        amount: "10%", // percentage
        limits: 150,
        expires: "2025-05-01",
        createdAt: "2024-11-03",
        userCreatedId: 106,
        note: "Spring sale discount",
        canBeCombined: true,
        active: true
    },
    {
        id: 7,
        code: "HOLIDAY25",
        amount: "25%", // percentage
        limits: 250,
        expires: "2024-12-25",
        createdAt: "2024-11-08",
        userCreatedId: 107,
        note: "Holiday discount for festive season",
        canBeCombined: false,
        active: false
    },
    {
        id: 8,
        code: "NEWYEAR100",
        amount: "$100", // fixed price
        limits: 20,
        expires: "2025-01-01",
        createdAt: "2024-11-02",
        userCreatedId: 108,
        note: "New Year special $100 off",
        canBeCombined: false,
        active: true
    },
    {
        id: 9,
        code: "FALL15",
        amount: "15%", // percentage
        limits: 75,
        expires: "2024-12-15",
        createdAt: "2024-09-15",
        userCreatedId: 109,
        note: "Autumn sale discount",
        canBeCombined: true,
        active: false
    },
    {
        id: 10,
        code: "CLEARANCE50",
        amount: "50%", // percentage
        limits: 300,
        expires: "2024-12-31",
        createdAt: "2024-11-04",
        userCreatedId: 110,
        note: "Clearance sale half-off deal",
        canBeCombined: false,
        active: true
    }
];
