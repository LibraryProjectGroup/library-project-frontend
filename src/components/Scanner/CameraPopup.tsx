import { useState, FC } from "react";
import { Modal, Box, Button } from "@mui/material";

import Book from "../../interfaces/book.interface";

import { editBookBox } from "../../sxStyles";
import { Html5QrcodeScanner } from "html5-qrcode";
import BookForm from "../pages/listBooksPage/BookForm";

interface IProps {
  visible: boolean;
  setVisible: Function;
  confirmation: Object;
  setConfirmation: Function;
  callApi: (isbn: string) => void;
}

const CameraPopup: FC<IProps> = ({
  visible,
  setVisible,
  confirmation,
  setConfirmation,
  callApi,
}: IProps): JSX.Element => {
  const [formVisible, setFormVisible] = useState(false);
  const [popUpConfirmation, setPopUpConfirmationOpen] = useState({
    ok: false,
    message: "",
  });

  const scanner = () => {
    function onScanSuccess(decodedText: string, decodedResult: any) {
      // handle the scanned code
      callApi(decodedText);
      console.log(decodedText);
      //setVisible(false);
    }

    // error handling (fix this)
    function onScanFailure(error: string) {}

    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 200, height: 200 } },
      /* verbose= */ false
    );

    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    // }
  };

  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
      <Box sx={editBookBox}>
        <Button onClick={scanner}>Open camera scanner</Button>
        <div id="reader"></div>
      </Box>
    </Modal>
  );
};

export default CameraPopup;
