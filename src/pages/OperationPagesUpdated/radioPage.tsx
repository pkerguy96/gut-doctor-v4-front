import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  ListSubheader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";

function $tempkate(opts: any) {
  const { lang, dir, size, margin, css, page } = opts;
  return `<!DOCTYPE html><html lang="${lang}"dir="${dir}"><head><meta charset="UTF-8"/><meta http-equiv="X-UA-Compatible"content="IE=edge"/><meta name="viewport"content="width=device-width, initial-scale=1.0"/><style>@page{size:${size.page};margin:${margin}}#page{width:100%}#head{height:${size.head}}#foot{height:${size.foot}}</style>${css}</head><body><table id="page"><thead><tr><td><div id="head"></div></td></tr></thead><tbody><tr><td><main id="main">${page}</main></td></tr></tbody><tfoot><tr><td><div id=foot></div></td></tr></tfoot></table></body></html>`;
}
function Print(target: any, callback: Function = () => {}) {
  const page = document.querySelector(target);

  var iframe = document.createElement("iframe");
  iframe.style.display = "none";
  document.body.appendChild(iframe);
  var iframeDoc = iframe.contentDocument || iframe?.contentWindow?.document;
  iframeDoc?.open();
  iframeDoc?.write(
    $tempkate({
      size: {
        page: "A5",
        head: "100px",
        foot: "80px",
      },
      page: page.innerHTML,
      margin: "10mm 10mm 10mm 10mm",
      css: [
        '<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">',
      ],
    })
  );
  iframeDoc?.close();
  iframe.onload = function () {
    iframe?.contentWindow?.print();
    callback();
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const data = {
  échographie: [
    { name: "Échographie abdominale", price: 200 },
    { name: "Échographie pelvienne", price: 250 },
    { name: "Échographie thyroïdienne", price: 180 },
  ],
  exploration: [
    { name: "Exploration fonctionnelle rénale", price: 300 },
    { name: "Exploration cardiaque", price: 400 },
    { name: "Exploration pulmonaire", price: 350 },
  ],
  endoscopie: [
    { name: "Endoscopie gastrique", price: 500 },
    { name: "Endoscopie colique", price: 600 },
    { name: "Endoscopie bronchique", price: 550 },
  ],
  débimetrie: [
    { name: "Débimetrie urinaire standard", price: 150 },
    { name: "Débimetrie avec rétention", price: 180 },
  ],
  Cystoscopie: [
    { name: "Cystoscopie diagnostique", price: 700 },
    { name: "Cystoscopie opératoire", price: 1200 },
  ],
  Gestes: [
    { name: "Pose de sonde urinaire", price: 300 },
    { name: "Injection intraveineuse", price: 200 },
    { name: "Ponction rénale", price: 1000 },
  ],
  Urgences: [
    { name: "Traumatologie urinaire", price: 800 },
    { name: "Hématurie aiguë", price: 600 },
    { name: "Colique néphrétique", price: 750 },
  ],
};

const printables = {
  irm: ["Brain MRI", "Spine MRI", "Knee MRI"],
  ausp: ["Abdominal Ultrasound", "Pelvic Ultrasound", "Chest Ultrasound"],
  ecographie: [
    "Cardiac Echography",
    "Thyroid Echography",
    "Vascular Echography",
  ],
};

const RadioPage = () => {
  const [radiology, setRadiology] = useState("");
  const [printable, setPrintable] = useState([]);

  const radiologyChange = (event: SelectChangeEvent) => {
    setRadiology(event.target.value);
  };

  const printableChange = (event: SelectChangeEvent) => {
    setPrintable(event.target.value);
  };

  const [fields, setFields] = useState([]);

  const handleAddRow = () => {
    if (!radiology) return;
    setFields((old) => [...old, { type: radiology, name: "", price: 0 }]);
    setRadiology("");
  };

  const handleRemoveRow = (index) => {
    setFields((old) => old.filter((current, _index) => _index !== index));
  };

  const changeRadiologyName = (value, type, index) => {
    const price = data[type].find((e) => e.name === value)?.price || 0;

    const newRows = [...fields].map((e, _index) => {
      if (index === _index) {
        e.price = price;
        e.name = value;
      }
      return e;
    });
    setFields(newRows);
  };

  const changeRadiologyPrice = (value, index) => {
    const newRows = [...fields].map((e, _index) => {
      if (index === _index) {
        e.price = value;
      }
      return e;
    });
    setFields(newRows);
  };

  const submit = (e) => {
    e.preventDefault();
    console.log("====================================");
    console.log(fields, printable);
    console.log("====================================");
    Print("#page", () => {});
  };

  const FormattedDate = new Date().toISOString().split("T")[0].split("-");

  return (
    <Paper className="!p-6 w-full flex flex-col gap-4">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        /* onSubmit={handleSubmit(onSubmit)} */
        onSubmit={submit}
        className="flex flex-col gap-4"
      >
        <Box className="flex justify-center mb-4">
          <Typography
            id="modal-modal-title"
            component="h2"
            className="text-center !text-2xl font-bold"
          >
            Radiographie demandée
          </Typography>
        </Box>
        <Box className="flex flex-col items-center gap-6 flex-wrap">
          <Box className="w-full flex flex-wrap items-center gap-4">
            <FormControl className="flex-1">
              <InputLabel id="demo-simple-printable-helper-label">
                Printable
              </InputLabel>
              <Select
                className="w-full"
                labelId="demo-simple-printable-helper-label"
                id="demo-simple-printable-helper"
                value={printable}
                multiple={true}
                label="Printable"
                onChange={printableChange}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {Object.keys(printables).reduce((acc, header) => {
                  // Push ListSubheader first
                  acc.push(
                    <ListSubheader key={`header_${header}`}>
                      {header}
                    </ListSubheader>
                  );
                  // Push MenuItems for the current header
                  acc.push(
                    ...printables[header].map((print, index) => (
                      <MenuItem key={`print_${header}_${index}`} value={print}>
                        {print}
                      </MenuItem>
                    ))
                  );
                  return acc;
                }, [])}
              </Select>
            </FormControl>
            <FormControl className="flex-1">
              <InputLabel id="demo-simple-select-helper-label">
                Radiologie
              </InputLabel>
              <Select
                className="w-full"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={radiology}
                label="Radiologie"
                onChange={radiologyChange}
              >
                {Object.keys(data).map((radio, index) => (
                  <MenuItem key={`radio_${index}`} value={radio}>
                    {radio}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              sx={{ borderRadius: 16 }}
              style={{
                minWidth: 100,
              }}
              variant="outlined"
              onClick={handleAddRow}
            >
              <AddIcon />
            </Button>
          </Box>
          <Box className="w-full flex flex-col gap-2">
            <TableContainer
              component={Paper}
              elevation={0}
              className="border border-gray-300"
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead className="bg-gray-200">
                  <TableRow>
                    <TableCell className="min-w-[400px]">Operation</TableCell>
                    <TableCell width="300px">Prix</TableCell>
                    <TableCell align="center" width="120px">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fields.map((carry, index) => (
                    <TableRow key={index} className="border-t border-gray-300">
                      <TableCell className="min-w-[400px]">
                        <FormControl className="w-full" size="medium">
                          <InputLabel id={`rows.${index}.name.label`}>
                            {carry.type}
                          </InputLabel>
                          <Select
                            labelId={`rows.${index}.name.label`}
                            label={carry.type}
                            id={`row.${index}.name`}
                            value={carry.name}
                            onChange={(e) =>
                              changeRadiologyName(
                                e.target.value,
                                carry.type,
                                index
                              )
                            }
                          >
                            {data[carry.type].map((radio, _index) => (
                              <MenuItem
                                key={`radio_${_index}`}
                                value={radio.name}
                              >
                                {radio.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell width="300px">
                        <FormControl className="w-full md:flex-1" size="medium">
                          <TextField
                            id={`price_${index}`}
                            type="number"
                            value={carry.price}
                            onChange={(e) =>
                              changeRadiologyPrice(e.target.value, index)
                            }
                          />
                        </FormControl>
                      </TableCell>
                      <TableCell align="center" width="120px">
                        <IconButton
                          /* variant="contained" */
                          color="error"
                          onClick={() => handleRemoveRow(index)}
                        >
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box className="flex justify-between items-center">
              <h2 className="font-semibold text-base text-start">
                Montant Total
              </h2>
              <span className="font-semibold text-sm text-end">
                {fields.reduce((carry, current) => carry + current.price, 0)}{" "}
                MAD
              </span>
            </Box>
          </Box>
        </Box>
        <Box className="flex">
          <Button
            type="submit"
            variant="contained"
            className="w-full md:w-max !px-10 !py-3 rounded-lg !ms-auto"
          >
            Enregistrer
          </Button>
        </Box>
      </Box>
      <div
        id="page"
        className="hidden w-full flex-col gap-4 bg-white rounded-sm"
      >
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex gap-4 items-center flex-col">
            <p className="font-semibold">
              Fait a beni mellal Le {FormattedDate[0]}/{FormattedDate[1]}/
              {FormattedDate[2]}
            </p>
            {/* <p className="font-semibold">
              Nom & Prenom: {row?.nom}
              {row?.prenom}
            </p> */}
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-2">
              {printable.map((details: any, index: number) => (
                <div key={index}>
                  <h3 className="font-bold">
                    {index + 1}- {details}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default RadioPage;
