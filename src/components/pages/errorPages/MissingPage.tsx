import { FC } from "react";
import { Button } from "@mui/material";
import { userPageReturnButton } from "../../../sxStyles";
import { useNavigate } from "react-router-dom";

const Missing: FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>404: NOT FOUND</h1>
            <h3 style={{ textAlign: "center" }}>
                Sorry, the page doesn't exist
            </h3>
            <Button
                sx={userPageReturnButton}
                variant="contained"
                onClick={() => {
                    navigate("/list-books");
                }}
            >
                Return
            </Button>
        </div>
    );
};

export default Missing;
