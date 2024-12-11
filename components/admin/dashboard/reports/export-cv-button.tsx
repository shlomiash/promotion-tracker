'use client'

import { Button } from "@/components/ui/button"
import { getDiscounts } from "@/server/actions/get-data";
import * as XLSX from "xlsx";


export default function ExportCVButton(){


    const exportDataToExcel = async (title?: string, worksheetname?: string) => {
       const data = await getDiscounts();
       // Create Excel workbook and worksheet
       const workbook = XLSX.utils.book_new();
       const worksheet = XLSX.utils?.json_to_sheet(data);
       XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
       // Save the workbook as an Excel file
       XLSX.writeFile(workbook, `${title}.xlsx`);
      };

    return (
        <Button onClick={ ()=> exportDataToExcel('discount' , 'ExportDiscount')}>
            Export CV
        </Button>
    )
}