import { FC } from "react";
import { Button } from "@mui/material";
import { userPageReturnButton } from "../../../sxStyles";
import { Navigate } from "react-router-dom";

const Unauthorized: FC = () => {
    return (
     <><h1 style="text-align:center">Unauthorized</h1><h3 style="text-align:center">Sorry, access denied</h3><Button
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

export default Unauthorized;