'use client';

import { useCallback, useEffect, useState } from "react";
import DiscountTable from "./table/discount-table";

export default function AdminDashboard(){

    return (
        <div>
            <DiscountTable/>
        </div>
    )
}