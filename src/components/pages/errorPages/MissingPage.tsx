import { FC } from "react";
import { Button } from "@mui/material";
import { userPageReturnButton } from "../../../sxStyles";
import { Navigate } from "react-router-dom";

const Missing: FC = () => {
    return (
     <><h1 style="text-align:center">404: NOT FOUND</h1><h3 style="text-align:center">Sorry, the page doesn't exist</h3><Button
            sx={userPageReturnButton}
            variant="contained"
            onClick={() => {
                Navigate("/list-books");
            } }
        >
            Return
        </Button></>
        
    );

};

export default Missing;