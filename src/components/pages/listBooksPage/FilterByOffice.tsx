import React, { useState, useEffect } from 'react';
import { Select, MenuItem, Box, SelectChangeEvent } from '@mui/material';
import { HomeOffice } from '../../../interfaces/HomeOffice'
import { fetchAllHomeOffices } from '../../../fetchFunctions'

interface FilterByOfficeProps {
    onOfficeChange: (office: string) => void;
}


export const FilterByOffice: React.FC<FilterByOfficeProps> = ({ onOfficeChange }) => {
    const [offices, setOffices] = useState<HomeOffice[]>([]);
    const [selectedOffice, setSelectedOffice] = useState<string>('');
    const [fetchError, setFetchError] = useState<string | null>(null);

    const fetchOffices = async () => {
        try {
            const fetchedOffices = await fetchAllHomeOffices();
            setOffices(fetchedOffices);
        } catch (error) {
            setFetchError('An error occurred while fetching offices.');
        }
    };

    useEffect(() => {
        fetchOffices();
    }, []);

    const handleOfficeChange = (event: SelectChangeEvent<string>) => {
        const officeName = event.target.value;
        console.log(officeName);

        setSelectedOffice(officeName);
        onOfficeChange(officeName);
    };

    return (
        <Box sx={{ marginLeft: '2px' }}>
            <Select
                value={selectedOffice}
                onChange={handleOfficeChange}
                displayEmpty
            >
                <MenuItem value=''>
                    <em>All Offices</em>
                </MenuItem>
                {offices.map((office) => (
                    <MenuItem value={office.name} key={office.id}>
                        {office.name}
                    </MenuItem>
                ))}
            </Select>
            {fetchError && <p>Error: {fetchError}</p>}
        </Box>
    );

}