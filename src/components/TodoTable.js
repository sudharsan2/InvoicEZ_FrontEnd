import React, { useMemo } from "react";
import {
  DataGrid,
  DataGridBody,
  DataGridRow,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  createTableColumn,
} from "@fluentui/react-components";

const items = [
  {
    file: { label: "10" },
    author: { label: "Rice" },
    lastUpdated: { label: "test" },
    lastUpdate: { label: "KG" },
    Quantity: { label: "1000" },
    NeedByDate: { label: "18 May 2023" },
  },
];

const columns = [
  createTableColumn({
    columnId: "file",
    compare: (a, b) => a.file.label.localeCompare(b.file.label),
    renderHeaderCell: () => "Line",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {item.file.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "author",
    compare: (a, b) => a.author.label.localeCompare(b.author.label),
    renderHeaderCell: () => "Item",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.author.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "lastUpdated",
    renderHeaderCell: () => "Description",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "200px" }}>
        {item.lastUpdated.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "lastUpdate",
    renderHeaderCell: () => "UOM",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {item.lastUpdate.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Quantity",
    renderHeaderCell: () => "Quantity",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {item.Quantity.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "NeedByDate",
    renderHeaderCell: () => "Need By Date",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.NeedByDate.label}
      </TableCellLayout>
    ),
  }),
];

const TodoTable = () => {
  const defaultSortState = useMemo(
    () => ({ sortColumn: "file", sortDirection: "ascending" }),
    []
  );

  const gridContainerStyle = {
    overflowX: "hidden", // Prevents horizontal scrolling
    width: "100%", // Ensures grid fits the container
  };

  return (
    <div style={gridContainerStyle}>
      <DataGrid items={items} columns={columns} defaultSortState={defaultSortState}>
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody>
          {({ item, rowId }) => (
            <DataGridRow key={rowId}>
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </div>
  );
};

export default TodoTable;



// import React, { useMemo } from "react";
// import {
//   FolderRegular,
//   EditRegular,
//   OpenRegular,
//   DocumentRegular,
//   PeopleRegular,
//   DocumentPdfRegular,
//   VideoRegular,
// } from "@fluentui/react-icons";
// import {
//   Avatar,
//   DataGridBody,
//   DataGridRow,
//   DataGrid,
//   DataGridHeader,
//   DataGridHeaderCell,
//   DataGridCell,
//   TableCellLayout,
//   createTableColumn,
//   Badge,
// } from "@fluentui/react-components";

// // Sample data
// const items = [
//   {
//     file: { label: "Meeting notes", icon: <DocumentRegular /> },
//     author: { label: "Max Mustermann", status: "available" },
//     lastUpdated: { label: "7h ago", timestamp: 1, color: "green" },
//     lastUpdate: { label: "You edited this", icon: <EditRegular /> },
//   },
//   {
//     file: { label: "Thursday presentation", icon: <FolderRegular /> },
//     author: { label: "Erika Mustermann", status: "busy" },
//     lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2, color: "yellow" },
//     lastUpdate: { label: "You recently opened this", icon: <OpenRegular /> },
//   },
//   {
//     file: { label: "Training recording", icon: <VideoRegular /> },
//     author: { label: "John Doe", status: "away" },
//     lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2, color: "orange" },
//     lastUpdate: { label: "You recently opened this", icon: <OpenRegular /> },
//   },
//   {
//     file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
//     author: { label: "Jane Doe", status: "offline" },
//     lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3, color: "red" },
//     lastUpdate: { label: "You shared this in a Teams chat", icon: <PeopleRegular /> },
//   },
// ];

// // Column definitions
// const columns = [
//   createTableColumn({
//     columnId: "file",
//     compare: (a, b) => a.file.label.localeCompare(b.file.label),
//     renderHeaderCell: () => "File",
//     renderCell: (item) => (
//       <TableCellLayout media={item.file.icon}>
//         {item.file.label}
//       </TableCellLayout>
//     ),
//   }),
//   createTableColumn({
//     columnId: "author",
//     compare: (a, b) => a.author.label.localeCompare(b.author.label),
//     renderHeaderCell: () => "Author",
//     renderCell: (item) => (
//       <TableCellLayout
//         media={<Avatar aria-label={item.author.label} name={item.author.label} />}
//       >
//         {item.author.label}
//       </TableCellLayout>
//     ),
//   }),
//   createTableColumn({
//     columnId: "lastUpdated",
//     compare: (a, b) => a.lastUpdated.timestamp - b.lastUpdated.timestamp,
//     renderHeaderCell: () => "Last updated",
//     renderCell: (item) => (
//       <TableCellLayout>
//         {/* Adding a colored bullet point as a prefix */}
//         <span style={{ color: item.lastUpdated.color }}>•</span> {item.lastUpdated.label}
//       </TableCellLayout>
//     ),
//   }),
//   createTableColumn({
//     columnId: "lastUpdate",
//     renderHeaderCell: () => "Not sortable",
//     renderCell: (item) => (
//       <TableCellLayout media={item.lastUpdate.icon}>
//         {item.lastUpdate.label}
//       </TableCellLayout>
//     ),
//   }),
//   createTableColumn({
//     columnId: "status",
//     renderHeaderCell: () => "Status",
//     renderCell: (item) => (
//       <TableCellLayout>
//         <Badge
//           color={
//             item.author.status === "available"
//               ? "green"
//               : item.author.status === "busy"
//               ? "yellow"
//               : item.author.status === "away"
//               ? "orange"
//               : "gray"
//           }
//           size="small"
//         />
//       </TableCellLayout>
//     ),
//   }),
// ];

// // TodoTable component
// const TodoTable = () => {
//   const defaultSortState = useMemo(() => ({ sortColumn: "file", sortDirection: "ascending" }), []);

//   return (
//     <DataGrid items={items} columns={columns} defaultSortState={defaultSortState} style={{ minWidth: "500px" }}>
//       <DataGridHeader>
//         <DataGridRow>
//           {({ renderHeaderCell }) => (
//             <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
//           )}
//         </DataGridRow>
//       </DataGridHeader>
//       <DataGridBody>
//         {({ item, rowId }) => (
//           <DataGridRow key={rowId}>
//             {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
//           </DataGridRow>
//         )}
//       </DataGridBody>
//     </DataGrid>
//   );
// };

// export default TodoTable;
