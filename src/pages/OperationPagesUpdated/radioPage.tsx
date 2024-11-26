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
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";

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

const RadioPage = () => {
  const [radiology, setRadiology] = useState("");

  const radiologyChange = (event: SelectChangeEvent) => {
    setRadiology(event.target.value);
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

  return (
    <Paper className="!p-6 w-full flex flex-col gap-4">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        /* onSubmit={handleSubmit(onSubmit)} */
        className="flex flex-col gap-4"
      >
        <Box className="lg:col-span-3 flex justify-between">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Radiographie demandée
          </Typography>
        </Box>
        <Box className="flex flex-col items-center gap-6 flex-wrap">
          <Box className="w-full md:w-2/3 flex flex-wrap gap-4">
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
          <Box className="w-full">
            <TableContainer
              component={Paper}
              elevation={0}
              className="border border-gray-300"
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead className="bg-gray-200">
                  <TableRow>
                    <TableCell>Operation</TableCell>
                    <TableCell width="300px">Prix</TableCell>
                    <TableCell align="center" width="120px">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fields.map((carry, index) => (
                    <TableRow key={index} className="border-t border-gray-300">
                      <TableCell>
                        <FormControl className="w-full md:flex-1" size="medium">
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
      </Box>
    </Paper>
  );
};

export default RadioPage;
