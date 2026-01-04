import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import "./FileItem.css";
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type FileItemProps = {
  id: string;
  caption: string;
  timestamp: any;
  fileUrl: string;
  size: number;
};

const FileItem = ({ caption, timestamp, fileUrl, size }: FileItemProps) => {
  const fileDate = `${timestamp?.toDate().getDate()}
${monthNames[timestamp?.toDate().getMonth() + 1]} ${timestamp
    ?.toDate()
    .getFullYear()}`;
  const readableFileSizeStr = (fileSizeInBytes) => {
    let i = -1;
    const byteUnits = [" kB", " MB", " GB", " TB", "PB", "EB", "ZB", "YB"];
    do {
      fileSizeInBytes = fileSizeInBytes / 1024;
      i++;
    } while (fileSizeInBytes > 1024);
    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
  };
  return (
    <div className="fileItem">
      <a href={fileUrl} target="_blank" rel="noreferrer" download>
        <div className="fileItem--left">
          <InsertDriveFileIcon />
          <p>{caption}</p>
        </div>
        <div className="fileItem--right">
          <p>{fileDate}</p>
          <p>{readableFileSizeStr(size)}</p>
        </div>
      </a>
    </div>
  );
};
export default FileItem;
