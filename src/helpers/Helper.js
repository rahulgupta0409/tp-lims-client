// import React, { useState, useEffect } from "react";
// import { useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import Chip from "@mui/material/Chip";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const names = [
//   "Oliver Hansen",
//   "Van Henry",
//   "April Tucker",
//   "Ralph Hubbard",
//   "Omar Alexander",
//   "Carlos Abbott",
//   "Miriam Wagner",
//   "Bradley Wilkerson",
//   "Virginia Andrews",
//   "Kelly Snyder",
// ];

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

// export default function MultipleSelectChip() {
//   const theme = useTheme();
//   const [personName, setPersonName] = React.useState([]);
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     fetchMinnorLabTests();
//   }, []);

//   const fetchMinnorLabTests = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:8091/v1/minortest/getAllMinorTests",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Network response was not ok.");
//       }
//       const data = await response.json();
//       setItems(data);
//     } catch (error) {}
//   };

//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setPersonName(
//       // On autofill we get a stringified value.
//       typeof value === "string" ? value.split(",") : value
//     );
//   };

//   return (
//     <div>
//       <FormControl sx={{ m: 1, width: 300 }}>
//         <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
//         <Select
//           labelId="demo-multiple-chip-label"
//           id="demo-multiple-chip"
//           multiple
//           value={personName}
//           onChange={handleChange}
//           input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
//           renderValue={(selected) => (
//             <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//               {selected.map((value) => (
//                 <Chip key={value} label={value} />
//               ))}
//             </Box>
//           )}
//           MenuProps={MenuProps}
//         >
//           {items.map((name) => (
//             <MenuItem
//               key={name.testId}
//               value={name.testName}
//               style={getStyles(name.testName, personName, theme)}
//             >
//               {name.testName}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// }
