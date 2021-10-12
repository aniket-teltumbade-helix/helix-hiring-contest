import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function BasicTags() {
    return (
        <Stack spacing={3} sx={{ width: 500 }}>
            <Autocomplete
                multiple
                id="tags-standard"
                options={programmingLanguages}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Multiple values"
                        placeholder="Favorites"
                    />
                )}
            />
            <Autocomplete
                multiple
                id="tags-outlined"
                options={programmingLanguages}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="filterSelectedOptions"
                        placeholder="Favorites"
                    />
                )}
            />
            <Autocomplete
                multiple
                id="tags-filled"
                options={programmingLanguages.map((option) => option.title)}
                freeSolo
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="filled"
                        label="freeSolo"
                        placeholder="Favorites"
                    />
                )}
            />
        </Stack>
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const programmingLanguages = [
    { title: '#C', year: 1994 },
    { title: '#CPP', year: 1972 },
    { title: '#Java', year: 1974 },
    { title: '#Php', year: 2008 },
    { title: '#Python', year: 1957 },
    { title: '#Node.js', year: 1993 },
];
