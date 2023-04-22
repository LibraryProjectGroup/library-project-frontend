import { useState, FC, useEffect } from "react";
import { Modal, Box, Button } from "@mui/material";

import Book from "../../interfaces/book.interface";
import BookForm from "../pages/listBooksPage/BookForm";

import { editBookBox } from "../../sxStyles";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
const qrcodeRegionId = "html5qr-code-full-region";

interface IProps {
  visible: boolean;
  setVisible: Function;
  confirmation: Object;
  setConfirmation: Function;
  callApi: (isbn: string) => void;
}

const AddScanner: FC<IProps> = ({
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

  //let html5QrCode = new Html5Qrcode(qrcodeRegionId);

  useEffect(() => {
    if (!visible) {
      return;
    }
    
    const timeoutId = setTimeout(() => {
      scanner();
    }, 1);
    return () => clearTimeout(timeoutId);
  }, [visible]);

  const scanner = () => {
    let html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      { fps: 10, qrbox: { width: 200, height: 200 } },
      /* verbose= */ false
    );

    function onScanSuccess(decodedText: string, decodedResult: any) {
      // handle the scanned code
      callApi(decodedText);
      setVisible(false);
      setConfirmation(true);
      html5QrcodeScanner.clear();
    }

    // error handling (fix this)
    function onScanFailure(error: string) {
      

    }

    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  };

  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
      <Box sx={editBookBox}>
        <div id={qrcodeRegionId}></div>
      </Box>
    </Modal>
  );
};

export default AddScanner;
