// xlsx import
import * as XLSX from "xlsx";
// react library import
import toast from "react-hot-toast";
// utils import
import { TimeSleep } from "@/Utils/timeSleep";

export const DownloadEXCEL = async (data, title) => {
  try {
    if (data.length === 0) {
      // Show warning toast for empty data
      toast.error("No data to download");
      return;
    }

    const loadingPromise = toast.promise(
      new Promise(async (resolve) => {
        await TimeSleep();

        try {
          const workSheet = XLSX.utils.json_to_sheet(data);
          const workBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workBook, workSheet, title);

          const excelBuffer = XLSX.write(workBook, {
            bookType: 'xlsx',
            type: 'buffer'
          });
          const blob = new Blob([excelBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
          });

          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${title}.xlsx`;

          document.body.appendChild(a);
          a.click();

          URL.revokeObjectURL(url);

          resolve();
        } catch (error) {
          console.error('Error downloading Excel:', error);
          toast.error(`Error generating ${title}`);
        }
      }), {
        loading: `Generating ${title}...`,
        success: `Downloaded ${title}`,
        error: `Error generating ${title}`,
      }
    );

    await loadingPromise;
  } catch (error) {
    console.error('Error in Toast:', error);
  }
};

