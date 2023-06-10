import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "sheetjs-style";
import FileDownloadTwoToneIcon from '@mui/icons-material/FileDownloadTwoTone';
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SvgIcon } from '@mui/material';
 const ExportToExcel = ({ apiData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
    <button onClick={(e) => exportToCSV(apiData, fileName)}  style={{
      backgroundColor: "#0096FF",
      color: "white",
      borderRadius: "4px",
      marginRight: "2%",
      border:'1px',
      height:'2rem'
    }}>
      
 
   <div style={{display:'flex',justifyContent:'space-between'}}>Export&nbsp;&nbsp;<i class="fa-solid fa-desktop-arrow-down fa-fade" ><i class="fa-sharp fa-solid fa-download"></i></i></div>
   
 </button>
    </>
  );
};
export default ExportToExcel