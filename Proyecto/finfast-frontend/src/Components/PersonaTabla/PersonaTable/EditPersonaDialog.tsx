import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Controller, useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import DialogCloseButton from '../../dialogs/DialogCloseButton';
import { FormHelperText, MenuItem, Select } from '@mui/material';
import type { PersonaType } from '../../../Types/PersonaType';
import { getRgiones, getCiudades, getComunas, getPersona } from '../../../Services/apiService';
import { CiudadType, ComunaType, RegionType } from '../../../Types/RegionesTypes';

type EditPersonaDialogDialogProps = {
  open: boolean;
  isNew: boolean;
  setOpen: (open: boolean) => void;
  id?: string;
  onSubmit: (values: PersonaType) => void;
};

const initialFormData : PersonaType = {
  
  id: '',
  nombre: '',
  run: '',
  runCuerpo: undefined,
  runDigito: '',
  nombres: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  email: '',
  sexoCodigo: undefined,
  fechaNacimiento: '',
  regionCodigo: undefined,
  ciudadCodigo: undefined,
  comunaCodigo: undefined,
  direccion: '',
  telefono: undefined,
  observaciones: '',
};

const EditPersonaDialog = ({
  open,
  setOpen,
  id,
  onSubmit,
  isNew = false,
}: EditPersonaDialogDialogProps) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues:  initialFormData,
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
  });

  const [regions, setRegions] = useState<RegionType[]>([]);
  const [cities, setCities] = useState<CiudadType[]>([]);
  const [comunas, setComunas] = useState<ComunaType[]>([]);
  const [persona, setPersona] = useState<PersonaType | null>(null);

  const selectedRegion = watch('regionCodigo');
  const selectedCity = watch('ciudadCodigo');

  useEffect(() => {
    if (id) {
      getPersona(id).then(fetchedPersona => {
        setPersona(fetchedPersona);
        reset(fetchedPersona); // Update form values with fetched persona
      });
    }
  }, [id, reset]);

  useEffect(() => {
    getRgiones().then(setRegions);
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      getCiudades(selectedRegion).then(setCities);
      setComunas([]); // Clear comuna when region changes
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedCity) {
      getComunas(selectedCity).then(setComunas);
    }
  }, [selectedCity]);

  const handleClose = () => {
    setOpen(false);
    reset(initialFormData);
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}>
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className="tabler-x" />
      </DialogCloseButton>
      <DialogTitle variant="h4" className="flex flex-col gap-2 text-center p-6 sm:pbs-16 sm:pbe-6 sm:pli-16">
        {isNew ? 'Crear Persona' : 'Editar Persona'}
      </DialogTitle>
      <form id="dialog" onSubmit={handleSubmit((values) => {
        onSubmit(values);
        setOpen(false);
      })}>
        <DialogContent className="overflow-visible pbs-0 p-6 sm:pli-16">
          <Grid container spacing={3}>
            {/* RUN Cuerpo Field */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="runCuerpo"
                control={control}
                rules={{
                  required: 'El RUT es requerido',
                  pattern: {
                    value: /^[0-9]{7,8}$/,
                    message: 'El RUT debe tener 7 u 8 dígitos y solo puede contener números',
                  },
                }}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="RUT Cuerpo"
                    fullWidth
                    type="text"
                    error={!!error}
                    helperText={error ? error.message : ''}
                  />
                )}
              />
            </Grid>

            {/* RUN Digito Field */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="runDigito"
                control={control}
                rules={{
                  required: 'El dígito RUT es requerido',
                  validate: (value) =>
                    value.length === 1 || 'El dígito RUT debe ser un solo carácter',
                }}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="RUT Dígito"
                    fullWidth
                    error={!!error}
                    helperText={error ? error.message : ''}
                  />
                )}
              />
            </Grid>

            {/* Nombres Field */}
            <Grid item xs={12} sm={12}>
              <Controller
                name="nombres"
                control={control}
                rules={{ required: 'Los nombres son requeridos' }}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="Nombres"
                    fullWidth
                    error={!!error}
                    helperText={error ? error.message : ''}
                  />
                )}
              />
            </Grid>

            {/* Apellido Paterno Field */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="apellidoPaterno"
                control={control}
                rules={{ required: 'El apellido paterno es requerido' }}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="Apellido Paterno"
                    fullWidth
                    error={!!error}
                    helperText={error ? error.message : ''}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="apellidoMaterno"
                control={control}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="Apellido Materno"
                    fullWidth
                    error={!!error}
                    helperText={error ? error.message : ''}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                control={control}
                rules={{
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Correo electrónico no válido',
                  },
                }}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="Correo Electrónico"
                    type="email"
                    fullWidth
                    error={!!error}
                    helperText={error ? error.message : ''}
                  />
                )}
              />
            </Grid>

            {/* Sexo Código Field */}
            <Grid item xs={12} sm={6}>
              <InputLabel variant="standard" htmlFor="sexoCodigo">
                Sexo
              </InputLabel>
              <Controller
                name="sexoCodigo"
                control={control}
                rules={{ required: 'El sexo es requerido' }}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <Select
                    value={value}
                    onChange={(e: any) => onChange(e.target.value)}
                    fullWidth
                    error={!!error}
                  >
                    <MenuItem value={1}>Masculino</MenuItem>
                    <MenuItem value={2}>Femenino</MenuItem>
                  </Select>
                )}
              />
            </Grid>

            {/* Fecha Nacimiento Field */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="fechaNacimiento"
                control={control}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="Fecha de Nacimiento"
                    type="date"
                    fullWidth
                    error={!!error}
                    helperText={error ? error.message : ''}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </Grid>

            {/* Dirección Field */}
            <Grid item xs={12} sm={12}>
              <Controller
                name="direccion"
                control={control}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="Dirección"
                    fullWidth
                    error={!!error}
                    helperText={error ? error.message : ''}
                  />
                )}
              />
            </Grid>

            {/* Teléfono Field */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="telefono"
                control={control}
                rules={{
                  validate: (value) =>
                    (value?.toString().length <= 9) || "El teléfono debe tener 9 caracteres o menos",
                }}
                render={({ field: { value, onChange }, fieldState: { error
                } }) => (
                  <TextField
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    label="Teléfono"
                    type="number"
                    
                    fullWidth
                    error={!!error}
                    helperText={error ? error.message : ''}
                  />
                )}
              />
            </Grid>

            {/* Observaciones Field */}
            <Grid item xs={12} sm={12}>
              <Controller
                name="observaciones"
                control={control}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="Observaciones"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!error}
                    helperText={error ? error.message : ''}
                  />
                )}
              />
            </Grid>

            {/* Región Código Field */}
            <Grid item xs={12} sm={6}>
              <InputLabel variant="standard" htmlFor="regionCodigo">
                Región
              </InputLabel>
              <Controller
                name="regionCodigo"
                control={control}
                rules={{ required: { value: true, message: 'La región es requerida' } }}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <Select
                    value={value}
                    onChange={(e: any) => onChange(e.target.value)}
                    fullWidth
                    error={!!error}
                  >
                    {regions.map((region) => (
                      <MenuItem key={region.codigo} value={region.codigo}>
                        {region.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Grid>

            {/* Ciudad Código Field */}
            <Grid item xs={12} sm={6}>
              <InputLabel variant="standard" htmlFor="ciudadCodigo">
                Ciudad
              </InputLabel>
              <Controller
                name="ciudadCodigo"
                control={control}
                rules={{ required: { value: true, message: 'La ciudad es requerida' } }}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <Select
                    value={value}
                    onChange={(e: any) => onChange(e.target.value)}
                    fullWidth
                    error={!!error}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city.codigo} value={city.codigo}>
                        {city.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Grid>

            {/* Comuna Código Field */}
            <Grid item xs={12} sm={6}>
              <InputLabel variant="standard" htmlFor="comunaCodigo">
                Comuna
              </InputLabel>
              <Controller
                name="comunaCodigo"
                control={control}
                rules={{ required: { value: true, message: 'La comuna es requerida' } }}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <Select
                    value={value}
                    onChange={(e: any) => onChange(e.target.value)}
                    fullWidth
                    error={!!error}
                  >
                    {comunas.map((comuna) => (
                      <MenuItem key={comuna.codigo} value={comuna.codigo}>
                        {comuna.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions className="justify-center pbs-0 p-6 sm:pbe-16 sm:pli-16">
          <Button variant="contained" type="submit">
            {isNew ? 'Crear' : 'Actualizar'}
          </Button>
          <Button variant="outlined" type="reset" color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditPersonaDialog;
