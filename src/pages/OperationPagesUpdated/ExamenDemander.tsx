import {
  Paper,
  Box,
  Typography,
  FormControl,
  Autocomplete,
  Chip,
  TextField,
  Button,
  SelectChangeEvent,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { BoneDoctorBloodTests } from "../../constants";
const printables = {
  Scanner: [
    "Scanner abdominale",
    "Scanner abdomino-pelve",
    "Scanner uro-scanner",
    "Scanner pelvienne",
  ],
  IRM: [
    "IRM abdominale",
    "IRM abdomino-pelve",
    "IRM uro-scanner",
    "IRM pelvienne",
  ],
  échographie: ["Échographie abdominale"],
  radio: ["AUCP"],
};
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
const ExamenDemander = ({ onNext }) => {
  const [printable, setPrintable] = useState<string[]>([]);
  const printableChange = (event: SelectChangeEvent<string[]>) => {
    setPrintable(event.target.value as string[]);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (printable.length) Print("#page", onNext());
  };

  const FormattedDate = new Date().toISOString().split("T")[0].split("-");
  return (
    <Paper className="!p-6 w-full flex flex-col gap-4">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={submit}
        className="flex gap-6 flex-col"
      >
        <Box className="flex justify-between">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Examen demandé
          </Typography>
        </Box>
        <Box className="w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center">
          <FormControl className="flex-1">
            <InputLabel id="demo-simple-printable-helper-label">
              Examens
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
        </Box>
        <Box className="flex justify-between flex-row mt-8 content-center">
          <Button
            className="w-full md:w-max !px-10 !py-3 rounded-lg "
            variant="outlined"
            onClick={() => {
              onNext();
            }}
          >
            <p className="text-sm ">Passer</p>
          </Button>
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

export default ExamenDemander;
